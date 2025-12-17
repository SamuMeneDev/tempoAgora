import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Busca } from './components/busca/busca';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Busca],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('tempoagora');
}
