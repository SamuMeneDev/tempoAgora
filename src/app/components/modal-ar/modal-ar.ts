import { Component, inject, Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import Local from '../models/Local';
@Component({
  selector: 'app-modal-ar',
  imports: [],
  templateUrl: './modal-ar.html',
  styleUrl: './modal-ar.css',
})
export class ModalAr {
  private modalRef = inject(DialogRef, {optional: true});
  constructor(@Inject(DIALOG_DATA) public data: Local) {}

  public fecharModalAr() {
    this.modalRef?.close();
  }
}
