import { Component } from '@angular/core';
import Estado from '../models/Estado';
import Cidade from '../models/Cidade';
import { Utils } from '../models/Utils';
@Component({
  selector: 'app-input-estado',
  imports: [],
  templateUrl: './input-estado.html',
  styleUrl: './input-estado.css',
})
export class InputEstado {
  data: Estado[] | Cidade[] = JSON.parse(
    Utils.requisicao(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/`)
  );
  public backData = this.data;
  inputValor = '';
  mostrarOpcoes(pesquisa: string) {
    this.data = this.backData.filter((estado) =>
      estado.nome.toLowerCase().includes(pesquisa.toLowerCase())
    );
  }
  setInputValor(valor: string) {
    this.inputValor = valor;
  }
}
