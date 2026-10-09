# Guia de uso

## Para quem vai usar o site
1. **Home:** veja categorias e produtos em destaque
2. **Produtos:** busque pelo nome, filtre por categoria e ordene por preço
3. **Adicionar:** escolha o tamanho no card e clique em *Adicionar ao carrinho*
4. **Carrinho:** altere quantidades, informe o CEP (frete) e use um cupom
5. **Finalizar:** o pedido é simulado e nenhuma compra real é feita
6. **Contato:** envie uma mensagem (o formulário valida os campos)

**Cupons para testar:** `PRIMEIRA10` e `STEPUP15`.
**Frete grátis:** compras a partir de R$ 299.

## Para quem vai rodar o projeto
1. Baixe ou clone o repositório
2. Abra a pasta no VS Code
3. Abra `src/index.html` com o Live Server (ou direto no navegador)

## Trocar as imagens
As imagens em `src/img/produtos/` são placeholders em SVG. Para usar fotos reais
(Unsplash, Pexels), salve-as nessa pasta e ajuste o campo `imagem` e a extensão
em `criarCard()` (`produtos.js`) e em `renderizarCarrinho()` (`carrinho.js`).

## Dados salvos no navegador
O carrinho fica no `localStorage`. Para limpar:
DevTools (F12) → Application → Local Storage → apagar `stepup_carrinho` e `stepup_cupom`.

## Problemas comuns
| Problema | Solução |
|---|---|
| CSS não carrega nas páginas internas | Use `../css/style.css` dentro de `pages/` |
| Imagem não aparece | Confira o caminho e o nome do arquivo (minúsculo, sem acento) |
| Carrinho não salva | Verifique se o navegador permite `localStorage` |
| Produtos não aparecem | Abra o console (F12) e veja se há erro de caminho nos scripts |
