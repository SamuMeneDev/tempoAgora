import { Component, inject, Input } from '@angular/core';
import Local, { IUvDados } from '../models/Local';
import { Dialog } from '@angular/cdk/dialog';
import { ModalUv } from '../modal-uv/modal-uv';
import { ModalAr } from '../modal-ar/modal-ar';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  @Input() local = new Local();
  //public local = new Local(true); // Para desenvolvimento apenas
  private dialogUV = inject(Dialog);
  private dialogAr = inject(Dialog);

  public dateConfig: {} = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  public openModalUV(dadoUV: IUvDados) {
    this.dialogUV.open(ModalUv, {
      data: dadoUV,
    });
  }
  public openModalAr(dadoAr: IUvDados) {
    this.dialogAr.open(ModalAr, {
      data: dadoAr,
    });
  }
}
