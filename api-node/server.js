const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares: Ensinando o Node a entender JSON e permitindo acesso externo (CORS)
app.use(express.json());
app.use(cors());

// 📦 Nosso "Banco de Dados" em memória por enquanto
let produtosRastreados = [
    { 
        id: 1, 
        url: 'http://books.toscrape.com/', 
        precoAlvo: 40.00, 
        precoAtual: null, 
        titulo: 'Aguardando o Go buscar...' 
    }
];

// 🟢 ROTA 1: Lista os produtos (O Go vai chamar essa rota para saber onde deve ir)
app.get('/produtos', (req, res) => {
    console.log("📥 Alguém pediu a lista de produtos!");
    res.json(produtosRastreados);
});

// 🟢 ROTA 2: O React vai usar essa rota para cadastrar um novo link para rastrear
app.post('/produtos', (req, res) => {
    const { url, precoAlvo } = req.body;

    const novoProduto = {
        id: produtosRastreados.length + 1,
        url: url,
        precoAlvo: precoAlvo,
        precoAtual: null,
        titulo: 'Aguardando o Go buscar...'
    };

    produtosRastreados.push(novoProduto);
    console.log("✅ Novo produto cadastrado:", url);
    
    // Retorna status 201 (Created)
    res.status(201).json(novoProduto);
});

// 🟢 ROTA 3: O Go vai usar essa rota para avisar o Node qual é o preço atualizado
app.post('/atualizar-preco', (req, res) => {
    const { id, precoAtual, titulo } = req.body;

    // Procura o produto no nosso array e atualiza
    const produtoIndex = produtosRastreados.findIndex(p => p.id === id);
    
    if (produtoIndex !== -1) {
        produtosRastreados[produtoIndex].precoAtual = precoAtual;
        produtosRastreados[produtoIndex].titulo = titulo;
        console.log(`🚀 PREÇO ATUALIZADO PELO GO: ${titulo} - ${precoAtual}`);
        res.json({ message: "Atualizado com sucesso!" });
    } else {
        res.status(404).json({ error: "Produto não encontrado" });
    }
});

// Subindo o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🧠 Cérebro Node.js rodando na porta http://localhost:${PORT}`);
});