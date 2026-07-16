import { Component, signal, computed } from '@angular/core';
import { Produto } from '../produto/produto';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  produtos = signal([
    {
      nome: 'Teclado',
      preco: 299.99
    },
    {
      nome: 'Monitor',
      preco: 449.99
    },
    {
      nome: 'Mouse',
      preco: 179.99
    },
    {
      nome: 'Notebook da Positivo',
      preco: -2899.99
    }
  ]);
  exibirProduto(nome: string) {
    console.log('Produto Selecionado: ', nome)
  }
  adicionarProduto(nome: string, preco: number) {
    this.produtos.update(listaAtual => [
      ...listaAtual, {nome: nome, preco: preco}
    ]);
  }
  totalProdutos = computed(() => this.produtos().length);

  valorTotal = computed(() => {return this.produtos().reduce(
    (total, item) => total + item.preco, 0)});
  
  subtituirProdutos () {
    this.produtos.set([
      {nome: 'Arroz', preco: 100}
    ]);
  }
}
