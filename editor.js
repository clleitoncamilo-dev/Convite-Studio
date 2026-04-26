let elementoSelecionado = null;
let offsetX = 0;
let offsetY = 0;
let arrastando = false;

const canvas = document.getElementById("canvas");

// Selecionar elemento
canvas.addEventListener("click", function(e) {
  if (e.target !== canvas) {
    if (elementoSelecionado) {
      elementoSelecionado.classList.remove("selecionado");
    }

    elementoSelecionado = e.target;
    elementoSelecionado.classList.add("selecionado");
  }
});

// Iniciar arrasto
canvas.addEventListener("mousedown", function(e) {
  if (e.target !== canvas) {
    elementoSelecionado = e.target;
    arrastando = true;

    offsetX = e.offsetX;
    offsetY = e.offsetY;
  }
});

// Movendo
canvas.addEventListener("mousemove", function(e) {
  if (arrastando && elementoSelecionado) {
    elementoSelecionado.style.left = (e.offsetX - offsetX) + "px";
    elementoSelecionado.style.top = (e.offsetY - offsetY) + "px";
  }
});

// Parar arrasto
canvas.addEventListener("mouseup", function() {
  arrastando = false;
});

// Atualizar texto
function atualizarTexto() {
  const nome = document.getElementById("inputNome").value;
  const mensagem = document.getElementById("inputMensagem").value;
  const cor = document.getElementById("corTexto").value;

  if (!elementoSelecionado) return;

  if (nome !== "") {
    elementoSelecionado.innerText = nome;
  }

  if (mensagem !== "") {
    elementoSelecionado.innerText = mensagem;
  }

  if (cor) {
    elementoSelecionado.style.color = cor;
  }
}

// Adicionar texto
function adicionarElemento() {
  const novo = document.createElement("p");
  novo.innerText = "Novo texto";
  novo.contentEditable = true;

  novo.style.left = "150px";
  novo.style.top = "150px";

  canvas.appendChild(novo);
}

// Adicionar imagem
function adicionarImagem() {
  const input = document.getElementById("uploadImagem");
  const file = input.files[0];

  if (!file) {
    alert("Escolhe uma imagem primeiro");
    return;
  }

  const reader = new FileReader();

  reader.onload = function(e) {
    const img = document.createElement("img");
    img.src = e.target.result;

    img.style.left = "100px";
    img.style.top = "100px";

    img.classList.add("resizable");

    canvas.appendChild(img);
  };

  reader.readAsDataURL(file);
}