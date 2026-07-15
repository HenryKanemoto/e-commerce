import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';


@Component({
  selector: 'app-produto',
  imports: [ PrecoFormatadoPipe ],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})
export class Produto {

  // Entrada de dados
  @Input() nome: string = '';
  @Input() preco: number = 0;
  
  // Saída de dados de produtos selecionados
  @Output() produtoSelecionado = new EventEmitter<string>();

  selecionarProduto() {
    this.produtoSelecionado.emit(this.nome);
  }
}
