document.addEventListener('DOMContentLoaded', () => {
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

  // Carregar o tema salvo do localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.classList.add(savedTheme);
  } else {
    document.body.classList.add('light-mode'); // Tema padrão
  }
});
