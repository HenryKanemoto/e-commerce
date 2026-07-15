import { Component, signal } from '@angular/core';
import { ListaProdutos } from './features/produtos/lista-produtos/lista-produtos';
//!import { RouterOutlet } from '@angular/router'; // Remove importação do Router

@Component({
  selector: 'app-root',
  imports: [ListaProdutos],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-commerce');
}
