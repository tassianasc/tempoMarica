const API_URL = 'http://localhost:5001/api/boletins';
const token = localStorage.getItem('authToken');

// Carregar lista de boletins
async function carregarBoletins() {
  try {
    const response = await fetch(API_URL, {
      headers: { 'x-custom-auth': token }
    });
    const boletins = await response.json();

    const lista = document.getElementById('boletins-list');
    lista.innerHTML = '';

    boletins.forEach((boletim) => {
      const item = document.createElement('li');
      item.innerHTML = `
        <strong>${boletim.title}</strong>
        <button onclick="deletarBoletim('${boletim._id}')">Excluir</button>
      `;
      lista.appendChild(item);
    });
  } catch (error) {
    console.error('Erro ao carregar boletins:', error.message);
  }
}

// Criar boletim
document.getElementById('boletim-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'x-custom-auth': token },
      body: formData,
    });

    if (response.ok) {
      alert('Boletim criado com sucesso!');
      carregarBoletins();
      event.target.reset();
    } else {
      alert('Erro ao criar boletim.');
    }
  } catch (error) {
    console.error('Erro ao criar boletim:', error.message);
  }
});

// Deletar boletim
async function deletarBoletim(id) {
  if (!confirm('Tem certeza que deseja excluir este boletim?')) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: { 'x-custom-auth': token }
    });

    if (response.ok) {
      alert('Boletim excluído com sucesso!');
      carregarBoletins();
    } else {
      alert('Erro ao excluir boletim.');
    }
  } catch (error) {
    console.error('Erro ao excluir boletim:', error.message);
  }
}

carregarBoletins();
