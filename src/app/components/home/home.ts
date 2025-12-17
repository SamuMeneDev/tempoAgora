import { Component, Input } from '@angular/core';
import Local from '../Local';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  @Input() local = new Local();
}
