import { Component, inject, Input } from '@angular/core';
import Local, { IUvDados } from '../models/Local';
import { Dialog } from '@angular/cdk/dialog'
import { ModalUv } from '../modal-uv/modal-uv';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  //@Input() local = new Local();
  public local = new Local(true); // Para desenvolvimento apenas
  private dialog = inject(Dialog);

  public openModalUV(dadoUV: IUvDados) {
    this.dialog.open(ModalUv, {
      data: dadoUV
    })
  }


}
