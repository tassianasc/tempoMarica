const API_URL = 'http://localhost:5000/api/noticias';
const GALERIA_URL = 'http://localhost:5000/galeria';

// Função para buscar todas as notícias
async function carregarNoticias() {
  try {
    const resposta = await fetch(API_URL);
    if (!resposta.ok) throw new Error('Erro ao buscar as notícias');

    const noticias = await resposta.json();
    const conteudo = document.getElementById('conteudo');
    
    if (!conteudo) {
      console.error("Elemento 'conteudo' não encontrado na página.");
      return;
    }

    conteudo.innerHTML = ''; // Limpa conteúdo antes de adicionar

    noticias.forEach((noticia) => {
      const divNoticia = document.createElement('div');
      divNoticia.classList.add('noticia');

      divNoticia.innerHTML = `
        <img src="${noticia.imageUrl}" alt="${noticia.titulo}" class="imagem-noticia" />
        <div>
          <h2><a href="./detalhenoticia.html?id=${noticia._id}">${noticia.titulo}</a></h2>
          <p>${noticia.subtitulo}</p>
        </div>
      `;
      conteudo.appendChild(divNoticia);
    });
  } catch (erro) {
    console.error('Erro ao carregar notícias:', erro);
    const conteudo = document.getElementById('conteudo');
    if (conteudo) {
      conteudo.innerHTML = '<p>Erro ao carregar as notícias.</p>';
    }
  }
}

// Função para carregar os detalhes de uma notícia específica
async function carregarDetalheNoticia() {
  const parametros = new URLSearchParams(window.location.search);
  const id = parametros.get('id');

  const conteudoDetalhe = document.getElementById('conteudo-detalhe');
  
  if (!conteudoDetalhe) {
    console.error("Elemento 'conteudo-detalhe' não encontrado na página.");
    return;
  }

  if (!id) {
    conteudoDetalhe.innerHTML = '<p>Notícia não encontrada.</p>';
    return;
  }

  try {
    const resposta = await fetch(`${API_URL}/${id}`); // Busca pela notícia específica
    if (!resposta.ok) throw new Error('Erro ao buscar a notícia');

    const noticia = await resposta.json();

    // Criar e adicionar elementos ao container
    const titulo = criarElemento('h1', noticia.titulo, 'titulo-detalhe');
    const subtitulo = criarElemento('h2', noticia.subtitulo, 'subtitulo-detalhe');
    const imagem = criarElemento('img', '', 'imagem-detalhe');
    imagem.src = noticia.imageUrl || '/src/images/default-image.png'; // Imagem padrão, se não houver
    imagem.alt = noticia.titulo;
    const descricao = criarElemento('p', noticia.descricao, 'descricao-detalhe');
    const autor = criarElemento('p', `<strong>Autor:</strong> ${noticia.autor}`, 'info-detalhe');
    const dataPublicacao = criarElemento('p', `<strong>Data:</strong> ${new Date(noticia.dataPublicacao).toLocaleDateString('pt-BR')}`, 'info-detalhe');

    conteudoDetalhe.innerHTML = ''; // Limpa o conteúdo antes de inserir os detalhes
    conteudoDetalhe.append(titulo, subtitulo, imagem, descricao, autor, dataPublicacao);
  } catch (erro) {
    console.error('Erro ao carregar detalhes da notícia:', erro);
    conteudoDetalhe.innerHTML = '<p>Erro ao carregar os detalhes da notícia.</p>';
  }
}

// Função auxiliar para criar elementos HTML
function criarElemento(tag, conteudo, classe = '') {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (conteudo) elemento.innerHTML = conteudo;
  return elemento;
}

// Inicializar a página dependendo do caminho
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('noticias.html')) {
    carregarNoticias();
  } else if (window.location.pathname.includes('detalhenoticia.html')) {
    carregarDetalheNoticia();
  }
});
