import { Component, signal, computed, effect, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../produto/produto';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { produtoService } from '../produto/produto.service';
import { Inject } from '@angular/core';
import { error } from 'console';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {

  //? ===== SIGNALS ======================================
  // Signal do produto
  produtos = signal<{ nome: string; preco: number }[]>([]);
  // Signal do carrinho
  carrinho = signal<{nome: string; preco: number}[]>([]);
  // Controle de carregamento
  carregando = signal(true);
  // Signal do produto que foi selecionado
  produtoSelecionado = signal<string | null>(null);

  //? ===== COMPUTED ======================================
  totalProdutos = computed(() => this.produtos().length);
  
  valorTotal = computed(() => {
    return this.produtos()
    .reduce((total, item) => total + item.preco, 0)
  });

  quantidade_carrinho = computed( () => this.carrinho().length);

  total_carrinho = computed(() => {
    return this.carrinho().reduce(
      (total, item) => total + item.preco, 0
    )
  });

  //?===== CONSTRUCTOR ======================================
  constructor(private http: HttpClient) {
    
    // Carrega da API
    this.carregarProdutos();

    // effects
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

  //? ===== MÉTODOS HTTP (API) ======================================

  carregarProdutos() {

    this.carregando.set(true);

    this.produtoService.buscarProdutos().subscribe({
      next: (dados) => {
        const produtos = this.produtoService.transformarProdutos(dados);
        this.produtos.set(produtos);
        this.carregando.set(false);
      },
      error: (erro) => {
        console.error('Erro ao carregar os Produtos: ', erro);
        this.carregando.set(false);
      }
    })
  };

  //? ===== Métodos dos produtos ====================================== 

  exibirProduto(nome: string) {
    console.log('Produto Selecionado: ', nome);
  };
  
  
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
  

  adicionarAoCarrinho (produto: {nome: string; preco: number}) {
    this.carrinho.update(listaAtual => [
      ...listaAtual,
      produto
    ])
  }
  removeTodosProdutos() {
    this.produtos.set([]);
  }

  //? ====== INJECT ====================================== 
  private produtoService = inject(produtoService);
}
