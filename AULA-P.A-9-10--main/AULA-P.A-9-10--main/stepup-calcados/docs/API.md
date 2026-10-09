# API (módulos JavaScript)

O projeto não tem servidor, então a "API" aqui são as funções públicas dos
módulos em `src/js/`. Ordem de carregamento nas páginas: `produtos.js` → `carrinho.js` → `main.js`.

## Estrutura de um produto
```js
{
  id: 1,
  nome: "Tênis Urban Run",
  preco: 249.90,
  categoria: "tenis",          // tenis | sandalia | social | bota | casual
  tamanhos: [38, 39, 40, 41, 42],
  imagem: "tenis-urban-run",   // arquivo em src/img/produtos/ (.svg)
  destaque: true               // aparece na home
}
```

## produtos.js
| Função | Descrição |
|---|---|
| `formatarPreco(valor)` | Converte número para moeda BRL (`249.9` → `R$ 249,90`) |
| `buscarProduto(id)` | Retorna o produto com o id informado |
| `criarCard(produto)` | Retorna o HTML do card de um produto |
| `renderizarProdutos(lista, container)` | Desenha uma lista de produtos dentro do elemento |
| `iniciarHome()` | Mostra os produtos em destaque |
| `iniciarProdutos()` | Liga busca, filtro de categoria e ordenação |

## carrinho.js
Dados salvos no `localStorage`: `stepup_carrinho` (itens) e `stepup_cupom` (cupom).
Item do carrinho: `{ id, tamanho, qtd }`.

| Função | Descrição |
|---|---|
| `obterCarrinho()` | Lê os itens do carrinho |
| `adicionarAoCarrinho(id, tamanho)` | Adiciona um item (ou soma 1 na quantidade) |
| `removerDoCarrinho(id, tamanho)` | Remove o item |
| `alterarQuantidade(id, tamanho, delta)` | Soma ou subtrai quantidade (≤ 0 remove) |
| `contarItens()` | Total de unidades no carrinho |
| `calcularSubtotal()` | Soma de preço × quantidade |
| `calcularDesconto(subtotal)` | Desconto do cupom aplicado |
| `calcularFrete(cep, subtotal)` | Frete fictício; `null` se o CEP for inválido |
| `renderizarCarrinho()` | Desenha a página do carrinho |

**Cupons:** `PRIMEIRA10` (10%) e `STEPUP15` (15%).
**Frete:** grátis acima de R$ 299; abaixo disso varia pelo 1º dígito do CEP (R$ 19,90 / 24,90 / 29,90).

## main.js
| Função | Descrição |
|---|---|
| `montarHeader()` / `montarFooter()` | Inserem cabeçalho e rodapé em todas as páginas |
| `mostrarAviso(texto)` | Mostra uma mensagem temporária na tela |
| `validarEmail(email)` | Retorna `true` se o e-mail for válido |
| `iniciarContato()` | Liga a validação do formulário de contato |
