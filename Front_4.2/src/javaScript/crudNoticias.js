const API_URL = 'http://localhost:5000/api/noticias';
const token = localStorage.getItem('authToken');

// Carregar lista de notícias
async function carregarNoticias() {
  try {
    const response = await fetch(API_URL, {
      headers: { 'x-custom-auth': token }
    });
    const noticias = await response.json();

    const lista = document.getElementById('noticias-list');
    lista.innerHTML = '';

    noticias.forEach((noticia) => {
      const item = document.createElement('li');
      item.innerHTML = `
        <strong>${noticia.titulo}</strong> - ${noticia.autor}
        <button onclick="deletarNoticia('${noticia._id}')">Excluir</button>
      `;
      lista.appendChild(item);
    });
  } catch (error) {
    console.error('Erro ao carregar notícias:', error.message);
  }
}

// Criar notícia
document.getElementById('noticia-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'x-custom-auth': token },
      body: formData,
    });

    if (response.ok) {
      alert('Notícia criada com sucesso!');
      carregarNoticias();
      event.target.reset();
    } else {
      alert('Erro ao criar notícia.');
    }
  } catch (error) {
    console.error('Erro ao criar notícia:', error.message);
  }
});

// Deletar notícia
async function deletarNoticia(id) {
  if (!confirm('Tem certeza que deseja excluir esta notícia?')) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: { 'x-custom-auth': token }
    });

    if (response.ok) {
      alert('Notícia excluída com sucesso!');
      carregarNoticias();
    } else {
      alert('Erro ao excluir notícia.');
    }
  } catch (error) {
    console.error('Erro ao excluir notícia:', error.message);
  }
}

carregarNoticias();
