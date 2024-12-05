document.addEventListener('DOMContentLoaded', () => { 
  // Header HTML
  const headerHtml = `
    <header>
      <nav class="nav-bar">
        <div class="logo">
          <h1>Tempo Maricá</h1>
        </div>
        <div class="nav-list">
          <ul>
            <li class="nav-item"><a href="/src/index.html" class="nav-link">Início</a></li>
            <li class="nav-item"><a href="/src/pages/sobre.html" class="nav-link">Sobre</a></li>
            <li class="nav-item"><a href="/src/pages/noticias.html" class="nav-link">Notícias</a></li>
            <li class="nav-item"><a href="/src/pages/boletim.html" class="nav-link">Boletim</a></li>
            <li class="nav-item"><a href="/src/pages/contato.html" class="nav-link">Contato</a></li>
          </ul>
        </div>
        <div class="access-restricted">
          <a href="/src/pages/login.html" title="Acesso Restrito">
            <img src="/src/images/icone_restrito.png" alt="Ícone de Acesso Restrito" class="access-icon" />
          </a>
        </div>
        <div class="theme-toggle">
          <button id="dark-mode" title="Modo Escuro">
            🌙
          </button>
          <button id="light-mode" title="Modo Claro">
            ☀️
          </button>
        </div>
        <div class="mobile-menu-icon">
          <button onclick="menuShow()" title="Abrir menu">
            <img class="icon" src="/src/images/menu_white_36dp.svg" alt="Menu">
          </button>
        </div>
      </nav>
      <div class="mobile-menu">
        <ul>
          <li class="nav-item"><a href="/src/index.html" class="nav-link">Início</a></li>
          <li class="nav-item"><a href="/src/pages/sobre.html" class="nav-link">Sobre</a></li>
          <li class="nav-item"><a href="/src/pages/noticias.html" class="nav-link">Notícias</a></li>
          <li class="nav-item"><a href="/src/pages/boletim.html" class="nav-link">Boletim</a></li>
          <li class="nav-item"><a href="/src/pages/contato.html" class="nav-link">Contato</a></li>
        </ul>
      </div>
    </header>
  `;

  // Footer HTML
  const footerHtml = `
    <footer>
      <div class="footer-content">
        <p>&copy; 2024 Desenvolvido por Alpha Solutions. Todos os direitos reservados.</p>
      </div>
    </footer>
  `;

  // Inserir o header no início do body
  document.body.insertAdjacentHTML('afterbegin', headerHtml);

  // Inserir o footer no final do body
  document.body.insertAdjacentHTML('beforeend', footerHtml);

  // Função para alternar temas
  const darkModeBtn = document.getElementById('dark-mode');
  const lightModeBtn = document.getElementById('light-mode');

  // Alternar para o modo escuro
  darkModeBtn.addEventListener('click', () => {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
    localStorage.setItem('theme', 'dark-mode');
  });

  // Alternar para o modo claro
  lightModeBtn.addEventListener('click', () => {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light-mode');
  });

  // Carregar o tema salvo no localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.classList.add(savedTheme);
  } else {
    document.body.classList.add('light-mode'); // Tema padrão
  }
});
