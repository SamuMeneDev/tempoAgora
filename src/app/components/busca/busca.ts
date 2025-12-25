import { Component } from '@angular/core';
import Local from '../models/Local';
import Estado from '../models/Estado';
import Cidade from '../models/Cidade';
import { Home } from '../home/home';
import { Utils } from '../models/Utils';
import { InputEstado } from '../input-estado/input-estado';
@Component({
  selector: 'app-busca',
  imports: [Home, InputEstado],
  templateUrl: './busca.html',
  styleUrl: './busca.css',
})
export class Busca {
  estados!: Array<Estado>;
  cidades!: Array<Cidade>;
  dataAtual = new Date();
  public inputEstado!: string;
  public inputCidade!: string;

  local = new Local(false); // true para testes
  noMatch: boolean = false;

  constructor() {
    const dados = JSON.parse(
      Utils.requisicao('https://servicodados.ibge.gov.br/api/v1/localidades/estados') // Carrega a lista de Estados
    );
    this.estados = dados;
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
      this.local.resetAll();
    }
    this.local.setStatus(false);
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

  public buscarTempo() {
    if (this.local.getCidade().id !== -1 && this.local.getEstado().id !== -1) {
      this.local.setStatus(true);
      this.noMatch = false;
      if (!this.local.isTeste()) {
        this.local.queryClima();
      } //destivado para teste
    } else {
      if (this.local.isTeste()) {
        this.local.setStatus(true);
      } // true Para teste
      this.noMatch = true;
      this.local.setStatus(false);
    }
  }
}
