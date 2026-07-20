import { Component, signal, computed, effect } from '@angular/core';
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

  produtoSelecionado = signal<string | null>(null);
  totalProdutos = computed(() => this.produtos().length);
  
  exibirProduto(nome: string) {
    console.log('Produto Selecionado: ', nome);
  };
  
  valorTotal = computed(() => {
    return this.produtos().reduce(
    (total, item) => total + item.preco, 0)
  });
  
    adicionarProduto() {
      this.produtos.update(listaAtual => [
        ...listaAtual, 
        {nome: 'Teclado', preco: 250}
      ]);
    }
    subtituirProdutos () {
      this.produtos.set([
        {nome: 'Arroz', preco: 100}
      ]);
    }
  
  constructor() {
    effect(() => {
      console.log('Lista de produtos alterada: ', this.produtos());
    });
    effect(() => {
      console.log('Valor total atualizado: ', this.valorTotal);
    });
    effect(() => {
      if(typeof document !== 'undefined') {
        document.title = `(${this.totalProdutos()}) Minha Loja`;
      }
    });
  }

  carrinho = signal<{nome: string; preco: number}[]>([]);
  quantidade_carrinho = computed( () => this.carrinho().length);
  total_carrinho = computed(() => {
    return this.carrinho().reduce(
      (total, item) => total + item.preco, 0
    )
  });
  adicionarAoCarrinho (produto: {nome: string; preco: number}) {
    this.carrinho.update(listaAtual => [
      ...listaAtual,
      produto
    ])
  }
  removeTodosProdutos() {
    this.produtos.set([]);
  }
}
