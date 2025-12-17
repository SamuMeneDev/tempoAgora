import { Component } from '@angular/core';
import axios from 'axios';
@Component({
  selector: 'app-busca',
  imports: [],
  templateUrl: './busca.html',
  styleUrl: './busca.css',
})
export class Busca {
  
  constructor() {
    const dados = JSON.parse(this.carregarEstados());
  }

  public carregarEstados() {
    const request = new XMLHttpRequest();
    request.open("GET", 'https://servicodados.ibge.gov.br/api/v1/localidades/estados', false);
    request.send();
    return request.responseText;
  }
}
