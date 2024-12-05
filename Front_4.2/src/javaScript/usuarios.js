// Evento para o formulário de registro
document.getElementById('register-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const token = localStorage.getItem('authToken'); // Obtém o token armazenado
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmpassword = document.getElementById('confirmpassword').value;
  const errorMessage = document.getElementById('error-message');

  // Limpa mensagens de erro anteriores
  errorMessage.style.display = 'none';

  // Validação básica no front-end
  if (!name || !email || !password || !confirmpassword) {
    errorMessage.textContent = 'Por favor, preencha todos os campos.';
    errorMessage.style.display = 'block';
    return;
  }

  if (password !== confirmpassword) {
    errorMessage.textContent = 'As senhas não conferem.';
    errorMessage.style.display = 'block';
    return;
  }

  try {
    // Requisição para registrar o usuário
    const response = await fetch('http://localhost:4000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-custom-auth': token, // Inclui o token para autorização
      },
      body: JSON.stringify({ name, email, password, confirmpassword }),
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.msg); // Exibe a mensagem de sucesso
      window.location.href = '/src/pages/dashboard.html'; // Redireciona para o dashboard
    } else {
      // Exibe a mensagem de erro retornada pelo servidor
      errorMessage.textContent = result.msg || 'Erro ao registrar usuário.';
      errorMessage.style.display = 'block';
    }
  } catch (err) {
    // Trata erros de conexão ou servidor
    errorMessage.textContent = 'Erro no servidor. Tente novamente mais tarde.';
    errorMessage.style.display = 'block';
    console.error('Erro no registro do usuário:', err.message);
  }
});

// Função para login de usuário
document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const errorMessage = document.getElementById('login-error-message');

  // Limpa mensagens de erro anteriores
  errorMessage.style.display = 'none';

  if (!email || !password) {
    errorMessage.textContent = 'Por favor, preencha todos os campos.';
    errorMessage.style.display = 'block';
    return;
  }

  try {
    // Requisição para autenticar o usuário
    const response = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (response.ok) {
      localStorage.setItem('authToken', result.token); // Armazena o token no localStorage
      alert('Login realizado com sucesso!');
      window.location.href = '/src/pages/dashboard.html'; // Redireciona para o dashboard
    } else {
      errorMessage.textContent = result.msg || 'Erro ao realizar login.';
      errorMessage.style.display = 'block';
    }
  } catch (err) {
    // Trata erros de conexão ou servidor
    errorMessage.textContent = 'Erro no servidor. Tente novamente mais tarde.';
    errorMessage.style.display = 'block';
    console.error('Erro no login do usuário:', err.message);
  }
});

// Função para logout
function logout() {
  localStorage.removeItem('authToken'); // Remove o token do localStorage
  alert('Você saiu da conta com sucesso.');
  window.location.href = '/src/pages/login.html'; // Redireciona para a página de login
}
