import { Component, inject, Inject, Input } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { IUvDados } from '../models/Local';
@Component({
  selector: 'app-modal-uv',
  imports: [],
  templateUrl: './modal-uv.html',
  styleUrl: './modal-uv.css',
})
export class ModalUv {
  private modalRef = inject(DialogRef, {optional: true});
  constructor(@Inject(DIALOG_DATA) public data: IUvDados) {

 }
 public fecharModalUV() {
  this.modalRef?.close();
 }
}
