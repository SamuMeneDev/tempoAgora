import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Busca } from './components/busca/busca';
import { Home } from './components/home/home';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Busca, Home],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('tempoagora');
}
