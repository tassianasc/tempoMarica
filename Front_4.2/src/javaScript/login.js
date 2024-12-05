document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('error-message') || createErrorMessageElement();

  try {
    const response = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (response.ok) {
      // Armazenar o token no localStorage
      localStorage.setItem('authToken', result.token);

      // Exibir mensagem de sucesso e redirecionar para o dashboard
      alert('Login realizado com sucesso!');
      window.location.href = '/src/pages/dashboard.html';
    } else {
      // Exibir mensagem de erro
      errorMessage.textContent = result.msg || 'Erro ao fazer login';
      errorMessage.style.display = 'block';
    }
  } catch (err) {
    // Exibir mensagem de erro genérico
    errorMessage.textContent = 'Erro no servidor. Tente novamente mais tarde.';
    errorMessage.style.display = 'block';
  }
});

// Função para criar o elemento de mensagem de erro, caso não exista
function createErrorMessageElement() {
  const form = document.getElementById('login-form');
  const errorMessage = document.createElement('p');
  errorMessage.id = 'error-message';
  errorMessage.style.color = 'red';
  errorMessage.style.display = 'none';
  form.appendChild(errorMessage);
  return errorMessage;
}
