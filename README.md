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

```
## Instalação
**Backend**
Clone o Repositório:

```git clone https://github.com/seu-usuario/tempo-marica.git
cd tempo-marica/backend
```

**Instale as Dependências**

```npm install```

**Configuração: Crie arquivos .env em cada microsserviço:**

.env.auth
.env.boletins
.env.noticias

**Exemplo de variáveis de ambiente:**

```
MONGO_URI=mongodb://seu-banco
SECRET=sua-chave-secreta
PORT=porta-do-serviço```

**Inicie os Microsserviços**

```npm start```

**Frontend**

**Clone o Repositório:

git clone https://github.com/seu-usuario/tempo-marica.git
cd tempo-marica/frontend
**Abra o Frontend: Use qualquer servidor local (por exemplo, Live Server no VSCode) para rodar a aplicação. Certifique-se de que os microsserviços estejam rodando antes de acessar funcionalidades como notícias e boletins.

**Execução**
**Inicie o Backend
Navegue para o diretório do backend:
cd backend
npm start
**Certifique-se de que cada microsserviço está rodando corretamente nas portas especificadas.
Inicie o Frontend
Utilize um servidor local ou abra o arquivo index.html diretamente em um navegador.
**Exemplo com Live Server:
live-server ./frontend/src
**APIs Disponíveis
AuthService
POST /auth/login: Realiza login e retorna um token JWT.
POST /auth/register: Registra um novo usuário.
NoticiasService
GET /noticias: Lista todas as notícias.
POST /noticias: Cria uma notícia (requer autenticação).
DELETE /noticias/:id: Exclui uma notícia (requer autenticação).
BoletinsService
GET /boletins/latest: Retorna o boletim mais recente.
POST /boletins: Cria um novo boletim com upload de PDF (requer autenticação).
DELETE /boletins/:id: Exclui um boletim (requer autenticação).
Licença
Este projeto está sob a licença MIT. Sinta-se à vontade para usar, modificar e distribuir
