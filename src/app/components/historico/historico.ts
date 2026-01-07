import { Component, EventEmitter, Output, Input } from '@angular/core';
import { IHistorico } from '../models/IHistorico';

@Component({
  selector: 'app-historico',
  imports: [],
  templateUrl: './historico.html',
  styleUrl: './historico.css',
})
export class Historico {
  open = false;
  @Output() openEvent = new EventEmitter<boolean>;
  @Input() historico!: IHistorico[];
  @Output() busca = new EventEmitter<IHistorico>

  public backHome() {
    this.open = false;
    this.openEvent.emit(this.open);

  }

  public query(spanEl: HTMLElement) {
    const nomeCidade = spanEl.innerText;
    const local = this.historico.filter(local => local.cidade.nome==nomeCidade);
    this.busca.emit(local.at(0));
    this.backHome();
  }

}
