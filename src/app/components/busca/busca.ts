import { Component } from '@angular/core';
import Local from '../models/Local';
import Estado from '../models/Estado';
import Cidade from '../models/Cidade';
import { Home } from '../home/home';
import { Utils } from '../models/Utils';
import { BuscaLista } from '../busca-lista/busca-lista';
import { BuscaCidade } from '../busca-cidade/busca-cidade';
import { Historico } from '../historico/historico';
import { IHistorico } from '../models/IHistorico';
@Component({
  selector: 'app-busca',
  imports: [Home, BuscaLista, BuscaCidade, Historico],
  templateUrl: './busca.html',
  styleUrl: './busca.css',
})
export class Busca {
  estados!: Array<Estado>;
  cidades!: Array<Cidade>;
  dataAtual = new Date();
  public inputEstado = "";
  public inputCidade = "";

  toogleHistorico = false;
  historico!: IHistorico[];

  local = new Local(true); // true para testes
  noMatch: boolean = false;

  constructor() {
    this.carregarEstados();
  }

  public coletarEstado(id: number | string) {
    // Estado do Usuário

    let idParse!: number;
    if (typeof id === 'string') {
      idParse = Number(id);
    } else {
      idParse = id;
    }
    if (id != -1) {
      this.local.setEstado(
        JSON.parse(
          Utils.requisicao(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idParse}`)
        )
      );
      this.carregarCidades(idParse);
    } else {
      this.cidades = [];
      this.local.resetAll();
    }
    this.local.setStatus(false);
  }
  reOpenHome(event: boolean) {
    this.toogleHistorico = event;
  }
  public coletarCidade(id: number | string) {
    // Cidade do usuário
    let idParse!: number;
    if (typeof id === 'string') {
      idParse = Number(id);
    } else {
      idParse = id;
    }
    if (id != -1) {
      const dados: Cidade = JSON.parse(
        Utils.requisicao(
          `https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${idParse}`
        )
      );
      this.local.setCidade(dados);
    } else {
      this.local.resetCid();
    }
    this.local.setStatus(false);
  }
  public carregarCidades(id: number) {
    this.cidades = JSON.parse(
      Utils.requisicao(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`
      )
    );
  }
  public carregarEstados() {
    this.estados = JSON.parse(
      Utils.requisicao('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
    ); // Carrega a lista de Estados)
  }
  public buscarTempo() {
    if (this.local.getCidade().id !== -1 && this.local.getEstado().id !== -1) {
      this.local.setStatus(true);
      this.noMatch = false;
      if (!this.local.isTeste()) {
        this.local.queryClima();
      } //destivado para teste
      this.saveHistory()
    } else {
      if (this.local.isTeste()) {
        this.local.setStatus(true);
      } // true Para teste
      this.noMatch = true;
      this.local.setStatus(false);
    }
  }
  handleToogleHistorico() {
    
    this.toogleHistorico = !this.toogleHistorico;
    const buscaHistorico = localStorage.getItem('history');
    if(buscaHistorico!=null) { this.historico = JSON.parse(buscaHistorico); } else {
      this.historico = [];
    }
  }
  public queryHistory(busca: IHistorico) {
    this.coletarEstado(busca.estado.id);
    this.inputEstado = busca.estado.nome;
    this.coletarCidade(busca.cidade.id);
    this.inputCidade = busca.cidade.nome;
    this.buscarTempo();
  }

  private saveHistory() {
    const queryDetalhes: IHistorico = {
        cidade: this.local.getCidade(),
        estado: this.local.getEstado(),
        timeBusca: Utils.formatDateString(this.dataAtual.getHours(), this.dataAtual.getMinutes()),
      };
    const history = localStorage.getItem('history');
    if(history!=null) {
      const historyObject: Object[] = JSON.parse(history);
      historyObject.push(queryDetalhes);
      
      localStorage.setItem('history', JSON.stringify(historyObject));
    } else {
      localStorage.setItem('history', JSON.stringify([queryDetalhes]));
    }
  }
}
