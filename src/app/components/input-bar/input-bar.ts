import { Component, Input } from '@angular/core';
import Estado from '../models/Estado';
import Cidade from '../models/Cidade';

@Component({
  selector: 'app-input-bar',
  imports: [],
  templateUrl: './input-bar.html',
  styleUrl: './input-bar.css',
})
export class InputBar {
  @Input() data!: Array<Estado> | Array<Cidade>;
  
  showOptions(search: string) {

  }
}
