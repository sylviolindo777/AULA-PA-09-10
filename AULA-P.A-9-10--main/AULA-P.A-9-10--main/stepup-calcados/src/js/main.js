// ===== Código compartilhado: header, footer, avisos, formulário =====
function montarHeader() {
  const el = document.getElementById("site-header");
  if (!el) return;
  el.className = "header";
  el.innerHTML = `
    <div class="container header__conteudo">
      <a class="logo" href="${BASE}index.html">Step<span>Up</span></a>
      <button class="menu-toggle" id="menu-toggle" aria-label="Abrir menu">☰</button>
      <nav class="nav" id="nav">
        <a href="${BASE}index.html">Home</a>
        <a href="${BASE}pages/produtos.html">Produtos</a>
        <a href="${BASE}pages/contato.html">Contato</a>
        <a class="nav__carrinho" href="${BASE}pages/carrinho.html">🛒 Carrinho
          <span class="contador" id="contador-carrinho">0</span></a>
      </nav>
    </div>`;
  document.getElementById("menu-toggle").addEventListener("click", () => {
    document.getElementById("nav").classList.toggle("nav--aberto");
  });
}

function montarFooter() {
  const el = document.getElementById("site-footer");
  if (!el) return;
  el.className = "footer";
  el.innerHTML = `
    <div class="container footer__grade">
      <div>
        <h4>StepUp Calçados</h4>
        <p>Projeto escolar de Desenvolvimento de Sistemas.<br>Nenhuma compra é real.</p>
      </div>
      <div>
        <h4>Ajuda</h4>
        <p>Troca em até 30 dias<br>Frete grátis acima de R$ 299<br>Pix, cartão e boleto</p>
      </div>
      <div>
        <h4>Contato</h4>
        <p>contato@stepup.exemplo<br>(11) 90000-0000</p>
      </div>
    </div>
    <p class="footer__copy">© 2026 StepUp Calçados · Todos os direitos reservados (de mentirinha)</p>`;
}

function mostrarAviso(texto) {
  let aviso = document.getElementById("aviso");
  if (!aviso) {
    aviso = document.createElement("div");
    aviso.id = "aviso";
    aviso.className = "aviso";
    document.body.appendChild(aviso);
  }
  aviso.textContent = texto;
  aviso.classList.add("aviso--visivel");
  clearTimeout(aviso.timer);
  aviso.timer = setTimeout(() => aviso.classList.remove("aviso--visivel"), 2500);
}

// ----- Validação do formulário de contato -----
function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function iniciarContato() {
  const form = document.getElementById("form-contato");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const campos = {
      nome: form.nome.value.trim().length >= 3 || "Digite seu nome (mín. 3 letras).",
      email: validarEmail(form.email.value.trim()) || "Digite um e-mail válido.",
      mensagem: form.mensagem.value.trim().length >= 10 || "A mensagem precisa ter ao menos 10 caracteres."
    };
    let valido = true;
    Object.keys(campos).forEach((nome) => {
      const erro = form.querySelector(`[data-erro="${nome}"]`);
      erro.textContent = campos[nome] === true ? "" : campos[nome];
      if (campos[nome] !== true) valido = false;
    });
    if (valido) {
      form.reset();
      document.getElementById("msg-contato").textContent = "Mensagem enviada! Responderemos em breve.";
    }
  });
}

// ----- Inicialização -----
montarHeader();
montarFooter();
atualizarContador();

const pagina = document.body.dataset.page;
if (pagina === "home") iniciarHome();
if (pagina === "produtos") iniciarProdutos();
if (pagina === "carrinho") iniciarCarrinho();
if (pagina === "contato") iniciarContato();
