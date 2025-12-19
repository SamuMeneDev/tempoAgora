import { Component } from '@angular/core';
import Local from '../models/Local';
import Estado from '../models/Estado';
import Cidade from '../models/Cidade';
import { Home } from '../home/home';
@Component({
  selector: 'app-busca',
  imports: [Home],
  templateUrl: './busca.html',
  styleUrl: './busca.css',
})
export class Busca {
  estados!: Array<Estado>;
  cidades!: Array<Cidade>;
  dataAtual = new Date();
  local = new Local(false); // true para testes
  constructor() {
    const dados = JSON.parse(
      Local.requisicao('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    );
    this.estados = dados;
  }

  public carregarCidades(id: number | string) {
    let idParse!: number;
    if (typeof id === 'string') {
      idParse = Number(id);
    } else {
      idParse = id;
    }
    if (id != -1) {
      this.local.setEstado(
        JSON.parse(
          Local.requisicao(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idParse}`)
        )
      );
      const dados = JSON.parse(
        Local.requisicao(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idParse}/municipios`
        )
      );
      this.cidades = dados;
    } else {
      this.local.reset();
    }
    this.local.setStatus(false);
  }

  public saveCidade(id: number | string) {
    let idParse!: number;
    if (typeof id === 'string') {
      idParse = Number(id);
    } else {
      idParse = id;
    }
    if (id != -1) {
      const dados: Cidade = JSON.parse(
        Local.requisicao(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${idParse}`)
      );
      this.local.setCidade(dados);
    } else {
      this.local.resetCid();
    }
    this.local.setStatus(false);
  }
  

  public buscarTempo() {
    if (this.local.getCidade().id !== -1 && this.local.getEstado().id !== -1) {
      this.local.setStatus(true);
      this.local.queryClima(); //destivado para teste
    } else {
      //this.local.setStatus(true); // Para teste
      this.local.setStatus(false);
    }
  }
}
