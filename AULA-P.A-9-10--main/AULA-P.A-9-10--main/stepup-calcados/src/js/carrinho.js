// ===== Carrinho de compras (localStorage) =====
const CHAVE_CARRINHO = "stepup_carrinho";
const CHAVE_CUPOM = "stepup_cupom";
const FRETE_GRATIS_ACIMA = 299;
const CUPONS = { PRIMEIRA10: 0.10, STEPUP15: 0.15 };

function lerStorage(chave, padrao) {
  try {
    const valor = localStorage.getItem(chave);
    return valor ? JSON.parse(valor) : padrao;
  } catch (erro) {
    return padrao;
  }
}

function gravarStorage(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch (erro) {
    console.warn("Não foi possível salvar no navegador.", erro);
  }
}

function obterCarrinho() { return lerStorage(CHAVE_CARRINHO, []); }

function salvarCarrinho(carrinho) {
  gravarStorage(CHAVE_CARRINHO, carrinho);
  atualizarContador();
}

function adicionarAoCarrinho(id, tamanho) {
  const carrinho = obterCarrinho();
  const item = carrinho.find((i) => i.id === Number(id) && i.tamanho === Number(tamanho));
  if (item) item.qtd += 1;
  else carrinho.push({ id: Number(id), tamanho: Number(tamanho), qtd: 1 });
  salvarCarrinho(carrinho);
  mostrarAviso(`${buscarProduto(id).nome} (tam. ${tamanho}) adicionado ao carrinho!`);
}

function removerDoCarrinho(id, tamanho) {
  const carrinho = obterCarrinho().filter(
    (i) => !(i.id === Number(id) && i.tamanho === Number(tamanho))
  );
  salvarCarrinho(carrinho);
}

function alterarQuantidade(id, tamanho, delta) {
  const carrinho = obterCarrinho();
  const item = carrinho.find((i) => i.id === Number(id) && i.tamanho === Number(tamanho));
  if (!item) return;
  item.qtd += delta;
  salvarCarrinho(item.qtd <= 0 ? carrinho.filter((i) => i !== item) : carrinho);
}

function contarItens() {
  return obterCarrinho().reduce((soma, i) => soma + i.qtd, 0);
}

function calcularSubtotal() {
  return obterCarrinho().reduce((soma, i) => soma + buscarProduto(i.id).preco * i.qtd, 0);
}

function atualizarContador() {
  const el = document.getElementById("contador-carrinho");
  if (el) el.textContent = contarItens();
}

// ----- Cupom e frete -----
function obterCupom() { return lerStorage(CHAVE_CUPOM, null); }

function calcularDesconto(subtotal) {
  const cupom = obterCupom();
  return cupom && CUPONS[cupom] ? subtotal * CUPONS[cupom] : 0;
}

function calcularFrete(cep, subtotal) {
  const digitos = String(cep || "").replace(/\D/g, "");
  if (digitos.length !== 8) return null;
  if (subtotal >= FRETE_GRATIS_ACIMA) return 0;
  const regiao = Number(digitos[0]);
  if (regiao <= 3) return 19.9;
  if (regiao <= 6) return 24.9;
  return 29.9;
}

// ----- Página do carrinho -----
function renderizarCarrinho() {
  const lista = document.getElementById("carrinho-itens");
  if (!lista) return;
  const carrinho = obterCarrinho();
  const resumo = document.getElementById("resumo");

  if (carrinho.length === 0) {
    lista.innerHTML = `<div class="vazio">
      <p>Seu carrinho está vazio.</p>
      <a class="btn btn--primario" href="${BASE}pages/produtos.html">Ver produtos</a>
    </div>`;
    resumo.hidden = true;
    return;
  }
  resumo.hidden = false;

  lista.innerHTML = carrinho.map((i) => {
    const p = buscarProduto(i.id);
    return `
      <div class="item" data-id="${i.id}" data-tam="${i.tamanho}">
        <img class="item__img" src="${BASE}img/produtos/${p.imagem}.svg" alt="${p.nome}">
        <div class="item__info">
          <h3>${p.nome}</h3>
          <p>Tamanho: ${i.tamanho}</p>
          <p>${formatarPreco(p.preco)}</p>
        </div>
        <div class="item__qtd">
          <button class="qtd-btn" data-acao="menos" aria-label="Diminuir">−</button>
          <span>${i.qtd}</span>
          <button class="qtd-btn" data-acao="mais" aria-label="Aumentar">+</button>
        </div>
        <strong class="item__total">${formatarPreco(p.preco * i.qtd)}</strong>
        <button class="item__remover" data-acao="remover" aria-label="Remover">✕</button>
      </div>`;
  }).join("");

  atualizarResumo();
}

function atualizarResumo() {
  const subtotal = calcularSubtotal();
  const desconto = calcularDesconto(subtotal);
  const cep = document.getElementById("cep").value;
  const frete = calcularFrete(cep, subtotal);

  document.getElementById("res-subtotal").textContent = formatarPreco(subtotal);
  document.getElementById("res-desconto").textContent = desconto ? "− " + formatarPreco(desconto) : formatarPreco(0);
  document.getElementById("res-frete").textContent =
    frete === null ? "Informe o CEP" : frete === 0 ? "Grátis" : formatarPreco(frete);
  document.getElementById("res-total").textContent = formatarPreco(subtotal - desconto + (frete || 0));
}

function iniciarCarrinho() {
  const lista = document.getElementById("carrinho-itens");
  if (!lista) return;

  lista.addEventListener("click", (e) => {
    const botao = e.target.closest("[data-acao]");
    if (!botao) return;
    const { id, tam } = botao.closest(".item").dataset;
    if (botao.dataset.acao === "mais") alterarQuantidade(id, tam, 1);
    if (botao.dataset.acao === "menos") alterarQuantidade(id, tam, -1);
    if (botao.dataset.acao === "remover") removerDoCarrinho(id, tam);
    renderizarCarrinho();
  });

  document.getElementById("btn-cupom").addEventListener("click", () => {
    const codigo = document.getElementById("cupom").value.trim().toUpperCase();
    const msg = document.getElementById("msg-cupom");
    if (CUPONS[codigo]) {
      gravarStorage(CHAVE_CUPOM, codigo);
      msg.textContent = `Cupom ${codigo} aplicado!`;
      msg.className = "msg msg--ok";
    } else {
      localStorage.removeItem(CHAVE_CUPOM);
      msg.textContent = "Cupom inválido.";
      msg.className = "msg msg--erro";
    }
    atualizarResumo();
  });

  document.getElementById("btn-frete").addEventListener("click", () => {
    const msg = document.getElementById("msg-frete");
    if (calcularFrete(document.getElementById("cep").value, calcularSubtotal()) === null) {
      msg.textContent = "CEP inválido. Digite 8 números.";
      msg.className = "msg msg--erro";
    } else {
      msg.textContent = "";
    }
    atualizarResumo();
  });

  document.getElementById("btn-finalizar").addEventListener("click", () => {
    const frete = calcularFrete(document.getElementById("cep").value, calcularSubtotal());
    if (frete === null) {
      const msg = document.getElementById("msg-frete");
      msg.textContent = "Calcule o frete para finalizar.";
      msg.className = "msg msg--erro";
      return;
    }
    const numero = Math.floor(100000 + Math.random() * 900000);
    localStorage.removeItem(CHAVE_CARRINHO);
    localStorage.removeItem(CHAVE_CUPOM);
    atualizarContador();
    document.getElementById("area-carrinho").innerHTML = `
      <div class="sucesso">
        <h2>✅ Pedido realizado com sucesso!</h2>
        <p>Número do pedido: <strong>#${numero}</strong></p>
        <p>Este é um projeto escolar: nenhuma compra real foi feita.</p>
        <a class="btn btn--primario" href="${BASE}index.html">Voltar para a home</a>
      </div>`;
  });

  renderizarCarrinho();
}
