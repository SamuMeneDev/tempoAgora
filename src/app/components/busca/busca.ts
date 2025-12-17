import { Component } from '@angular/core';
import Local from '../Local';
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
  local = new Local();
  constructor() {
    const dados = JSON.parse(
      this.requisicao('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
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
          this.requisicao(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idParse}`)
        )
      );
      const dados = JSON.parse(
        this.requisicao(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idParse}/municipios`
        )
      );
      this.cidades = dados;
    } else {
      this.local.reset();
    }
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
        this.requisicao(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${idParse}`)
      );
      this.local.setCidade(dados);
      this.local.setStatus(false);
    } else {
      this.local.resetCid();
    }
  }
  public requisicao(url: string) {
    const request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send();
    return request.responseText;
  }

  public buscarTempo() {
    if(this.local.getCidade().id !== -1 && this.local.getEstado().id !== -1) {
      this.local.setStatus(true);
    } else { this.local.setStatus(false) }
  }
}