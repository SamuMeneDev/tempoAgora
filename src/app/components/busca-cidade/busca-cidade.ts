import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import Estado from '../models/Estado';

import Cidade from '../models/Cidade';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-busca-cidade',
  imports: [FormsModule],
  templateUrl: './busca-cidade.html',
  styleUrl: './busca-cidade.css',
})
export class BuscaCidade implements OnChanges{
  ngOnChanges(changes: SimpleChanges): void {
    this.inputValue = "";
  }
  @Input() data!: Estado[] | Cidade[];
  @Input() inputValue = "";
  @Input() placeholder!: string;
  selected = -1;
  @Output() outSelected = new EventEmitter<number>();

  bindInputValue(valor: string) {
    this.inputValue = valor;
    this.selected = -1;
    this.outSelected.emit(this.selected);
  }
  listaOpt(): Estado[] | Cidade[] {
    if (this.inputValue == '') {
      return this.data;
    } else {
      const list = this.data.filter((item) =>
        item.nome.toLowerCase().includes(this.inputValue.toLowerCase())
      );
      return list;
    }
   
  }
  selectItem(valor: Event) {
    const el = valor.target as HTMLOptionElement;
    this.inputValue = el.innerText;
    this.selected = Number(el.value);
    this.outSelected.emit(this.selected);
  }
}
