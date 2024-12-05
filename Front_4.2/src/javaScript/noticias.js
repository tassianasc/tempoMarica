const noticiasUrl = 'http://localhost:5000/api/noticias'; // URL da API de notícias

// Listar todas as notícias
async function listarNoticias() {
  try {
    const response = await fetch(noticiasUrl);
    if (!response.ok) throw new Error('Erro ao buscar as notícias.');

    const noticias = await response.json();
    console.log('Notícias:', noticias);
  } catch (error) {
    console.error('Erro ao listar notícias:', error.message);
  }
}

// Criar uma nova notícia (requisição protegida)
async function criarNoticia(data) {
  const token = localStorage.getItem('authToken');

  try {
    const response = await fetch(noticiasUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-custom-auth': token, // Inclui o token na requisição
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Erro ao criar a notícia.');

    const result = await response.json();
    alert('Notícia criada com sucesso!');
    console.log('Notícia criada:', result);
  } catch (error) {
    console.error('Erro ao criar notícia:', error.message);
    alert('Erro ao criar notícia.');
  }
}
