import { Component, inject, Input } from '@angular/core';
import Local from '../models/Local';
import { Dialog } from '@angular/cdk/dialog';
import { ModalUv } from '../modal-uv/modal-uv';
import { ModalAr } from '../modal-ar/modal-ar';
import { Utils } from '../models/Utils';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  @Input() local!: Local;
  private dialogUV = inject(Dialog);
  private dialogAr = inject(Dialog);
  util = new Utils();


  public dateConfig: {} = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  public openModalUV(local: Local) {
    this.dialogUV.open(ModalUv, {
      data: local,
    });
  }
  public openModalAr(local: Local) {
    this.dialogAr.open(ModalAr, {
      data: local,
    });
  }
}
