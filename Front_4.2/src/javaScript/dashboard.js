document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    alert('Você precisa estar logado para acessar esta página.');
    window.location.href = '/src/pages/login.html';
    return;
  }

  // Logout
  document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('authToken'); // Remove o token
    alert('Você saiu com sucesso!');
    window.location.href = '/src/pages/login.html'; // Redireciona para login
  });
});
