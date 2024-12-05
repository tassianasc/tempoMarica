# **Tempo Maricá**

Projeto para centralizar informações meteorológicas, notícias e boletins da cidade de Maricá (RJ), utilizando uma arquitetura baseada em microsserviços e um frontend moderno.

---

## **Índice**
- [Descrição](#descrição)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Execução](#execução)
- [APIs Disponíveis](#apis-disponíveis)
- [Licença](#licença)

---

## **Descrição**

**Tempo Maricá** é um sistema web composto por:
- **Frontend:** Interface amigável e responsiva para visualização de clima, notícias e boletins.
- **Backend:** Arquitetura de microsserviços para autenticação, gestão de notícias e boletins informativos.

---

## **Tecnologias Utilizadas**

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - JWT para autenticação
  - Multer para upload de arquivos
- **Frontend:**
  - HTML5, CSS3 e JavaScript
  - Consumo de APIs RESTful
  - OpenWeatherMap para informações climáticas
- **Testes:**
  - Postman para testes manuais das rotas.

---

## **Estrutura do Projeto**

```plaintext
Tempo-Maricá/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── uploads/
├── frontend/
│   ├── src/
│   │   ├── images/
│   │   ├── javaScript/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── index.html
└── README.md

Instalação
Backend
Clone o Repositório
git clone https://github.com/seu-usuario/tempo-marica.git
cd tempo-marica/backend
Instale as Dependências
npm install
Configuração
Crie um arquivo .env em cada microsserviço:

.env.auth
.env.boletins
.env.noticias
Insira as variáveis de ambiente correspondentes, como:
MONGO_URI=mongodb://seu-banco
SECRET=sua-chave-secreta
PORT=porta-do-serviço

Inicie os Microsserviços
npm start
