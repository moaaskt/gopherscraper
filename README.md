# 🐹 GopherScraper - Rastreador de Preços

Este projeto é um sistema de rastreamento de preços construído utilizando uma **Arquitetura de Microsserviços**. Ele permite que o usuário cadastre URLs de produtos e utilize um *worker* automatizado para raspar a página e buscar o preço mais atualizado.

## 🚀 Tecnologias Utilizadas (Stack)

O projeto foi dividido em três serviços distintos, garantindo separação de responsabilidades:

* **Frontend (Interface):** React.js + Vite
* **Backend (API/BFF):** Node.js + Express
* **Worker (Web Scraper):** Golang + Colly

## ⚙️ Arquitetura

1.  **O Frontend (React)** consome a API Node.js para exibir a lista de produtos rastreados e permite o cadastro de novas URLs.
2.  **A API (Node.js)** atua como o cérebro da operação, gerenciando os dados em memória (futuramente em um Banco de Dados) e servindo de ponte entre o usuário e o robô de raspagem.
3.  **O Worker (Golang)** é um script de alta performance executado sob demanda. Ele consulta a API Node.js para saber quais URLs precisa visitar, faz a raspagem (scraping) do HTML usando a biblioteca Colly e devolve os preços atualizados para a API.

## 🛠️ Como rodar o projeto localmente

Para rodar este projeto, você precisará abrir **três terminais** diferentes, um para cada serviço.

### Pré-requisitos
* [Node.js](https://nodejs.org/) instalado.
* [Golang](https://go.dev/) instalado.

### Passo a passo

**1. Clone o repositório:**
```bash
git clone [https://github.com/SEU_USUARIO/gopherscraper.git](https://github.com/SEU_USUARIO/gopherscraper.git)
cd gopherscraper