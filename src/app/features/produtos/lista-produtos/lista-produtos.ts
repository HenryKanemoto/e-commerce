import { Component, signal } from '@angular/core';
import { Produto } from '../produto/produto';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto],
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
}
