const apiUrl = 'http://localhost:5001/api/boletins/latest'; // URL da API para buscar o boletim mais recente

// Carregar o boletim mais recente
async function carregarBoletim() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Erro ao buscar o boletim.');

    const boletim = await response.json();
    if (!boletim || !boletim.pdf) {
      alert('Nenhum boletim disponível.');
      return;
    }

    const pdfUrl = `http://localhost:5001/uploads/${boletim.pdf}`;

    const pdfViewer = document.getElementById('pdfViewer');
    pdfViewer.src = pdfUrl;

    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.onclick = () => {
      window.open(pdfUrl, '_blank');
    };
  } catch (error) {
    console.error('Erro ao carregar o boletim:', error.message);
    const container = document.getElementById('container');
    container.innerHTML = '<p>Erro ao carregar o boletim. Tente novamente mais tarde.</p>';
  }
}

// Criar um novo boletim (requisição protegida)
async function criarBoletim(data) {
  const token = localStorage.getItem('authToken'); // Obtém o token salvo no login

  try {
    const response = await fetch('http://localhost:5001/api/boletins', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-custom-auth': token, // Inclui o token na requisição
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar o boletim.');
    }

    const result = await response.json();
    alert('Boletim criado com sucesso!');
    console.log('Boletim criado:', result);
  } catch (error) {
    console.error('Erro ao criar boletim:', error.message);
    alert('Erro ao criar boletim.');
  }
}

document.addEventListener('DOMContentLoaded', carregarBoletim);
