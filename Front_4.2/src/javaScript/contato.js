document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault(); // Previne o envio do formulário até validação

  const nome = document.querySelector("#nome");
  const telefone = document.querySelector("#telefone");
  const email = document.querySelector("#email");
  const mensagem = document.querySelector("#mensagem");

  // Validação de campos
  if (nome.value === "" || telefone.value === "" || email.value === "" || mensagem.value === "") {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // Validação de formato de email
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailPattern.test(email.value)) {
    alert("Por favor, insira um e-mail válido.");
    return;
  }

  // Validação de telefone (opcional)
  const telefonePattern = /^[0-9]{10,11}$/; // Apenas números
  if (!telefonePattern.test(telefone.value)) {
    alert("Por favor, insira um número de telefone válido.");
    return;
  }

  // Enviar o formulário (simulação)
  alert("Mensagem enviada com sucesso!");
  this.submit(); // Submete o formulário
});

