// ===== Dados e vitrine de produtos =====
const BASE = document.body.dataset.base || "";

const PRODUTOS = [
  { id: 1,  nome: "Tênis Urban Run",       preco: 249.90, categoria: "tenis",    tamanhos: [38, 39, 40, 41, 42], imagem: "tenis-urban-run",        destaque: true },
  { id: 2,  nome: "Tênis Flex Air",        preco: 299.90, categoria: "tenis",    tamanhos: [37, 38, 39, 40, 41], imagem: "tenis-flex-air",         destaque: true },
  { id: 3,  nome: "Tênis Retrô 90",        preco: 279.90, categoria: "tenis",    tamanhos: [38, 39, 40, 41, 42], imagem: "tenis-retro-90",         destaque: false },
  { id: 4,  nome: "Tênis Branco Clássico", preco: 199.90, categoria: "tenis",    tamanhos: [36, 37, 38, 39, 40], imagem: "tenis-branco-classico",  destaque: true },
  { id: 5,  nome: "Sandália Conforto",     preco: 129.90, categoria: "sandalia", tamanhos: [34, 35, 36, 37, 38], imagem: "sandalia-conforto",      destaque: false },
  { id: 6,  nome: "Sandália Verão",        preco: 99.90,  categoria: "sandalia", tamanhos: [34, 35, 36, 37, 38], imagem: "sandalia-verao",         destaque: false },
  { id: 7,  nome: "Sapato Oxford",         preco: 349.90, categoria: "social",   tamanhos: [39, 40, 41, 42, 43], imagem: "sapato-social-oxford",   destaque: true },
  { id: 8,  nome: "Sapato Social Preto",   preco: 319.90, categoria: "social",   tamanhos: [39, 40, 41, 42, 43], imagem: "sapato-social-preto",    destaque: false },
  { id: 9,  nome: "Bota Aventura",         preco: 389.90, categoria: "bota",     tamanhos: [38, 39, 40, 41, 42], imagem: "bota-aventura",          destaque: false },
  { id: 10, nome: "Bota Chelsea",          preco: 369.90, categoria: "bota",     tamanhos: [37, 38, 39, 40, 41], imagem: "bota-chelsea",           destaque: false },
  { id: 11, nome: "Mocassim Casual",       preco: 229.90, categoria: "casual",   tamanhos: [39, 40, 41, 42, 43], imagem: "casual-mocassim",        destaque: false },
  { id: 12, nome: "Slip-on Cinza",         preco: 159.90, categoria: "casual",   tamanhos: [37, 38, 39, 40, 41], imagem: "casual-slip-on",         destaque: false }
];

const NOMES_CATEGORIAS = {
  tenis: "Tênis", sandalia: "Sandálias", social: "Sociais", bota: "Botas", casual: "Casual"
};

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function buscarProduto(id) {
  return PRODUTOS.find((p) => p.id === Number(id));
}

function criarCard(p) {
  const opcoes = p.tamanhos.map((t) => `<option value="${t}">${t}</option>`).join("");
  return `
    <article class="card" data-id="${p.id}">
      <div class="card__imagem">
        <img src="${BASE}img/produtos/${p.imagem}.svg" alt="${p.nome}" loading="lazy">
      </div>
      <div class="card__corpo">
        <span class="card__categoria">${NOMES_CATEGORIAS[p.categoria]}</span>
        <h3 class="card__titulo">${p.nome}</h3>
        <p class="card__preco">${formatarPreco(p.preco)}</p>
        <p class="card__parcelas">ou 3x de ${formatarPreco(p.preco / 3)}</p>
        <label class="card__tamanho">Tamanho
          <select class="card__select">${opcoes}</select>
        </label>
        <button class="btn btn--primario btn--bloco btn-add" type="button">Adicionar ao carrinho</button>
      </div>
    </article>`;
}

function renderizarProdutos(lista, container) {
  if (!container) return;
  container.innerHTML = lista.length
    ? lista.map(criarCard).join("")
    : '<p class="vazio">Nenhum produto encontrado.</p>';
}

// Clique em "Adicionar ao carrinho" (vale para qualquer grade de produtos)
document.addEventListener("click", (e) => {
  const botao = e.target.closest(".btn-add");
  if (!botao) return;
  const card = botao.closest(".card");
  const id = card.dataset.id;
  const tamanho = card.querySelector(".card__select").value;
  adicionarAoCarrinho(id, tamanho);
});

// ----- Home: destaques -----
function iniciarHome() {
  renderizarProdutos(PRODUTOS.filter((p) => p.destaque), document.getElementById("destaques"));
}

// ----- Página de produtos: filtros -----
function iniciarProdutos() {
  const grade = document.getElementById("lista-produtos");
  const busca = document.getElementById("busca");
  const categoria = document.getElementById("filtro-categoria");
  const ordem = document.getElementById("ordenar");
  const contagem = document.getElementById("contagem");

  const params = new URLSearchParams(window.location.search);
  if (params.get("cat")) categoria.value = params.get("cat");

  function aplicar() {
    const termo = busca.value.trim().toLowerCase();
    let lista = PRODUTOS.filter((p) =>
      p.nome.toLowerCase().includes(termo) &&
      (categoria.value === "todas" || p.categoria === categoria.value)
    );
    if (ordem.value === "menor") lista.sort((a, b) => a.preco - b.preco);
    if (ordem.value === "maior") lista.sort((a, b) => b.preco - a.preco);
    if (ordem.value === "nome") lista.sort((a, b) => a.nome.localeCompare(b.nome));
    renderizarProdutos(lista, grade);
    contagem.textContent = `${lista.length} produto(s) encontrado(s)`;
  }

  [busca, categoria, ordem].forEach((el) => el.addEventListener("input", aplicar));
  aplicar();
}
