const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();

// 🚀 Com o Prisma v6, inicializamos vazio! 
// Ele lê a URL do banco diretamente do schema.prisma
const prisma = new PrismaClient();

// Middlewares (CORS sempre vem antes para liberar o acesso do React)
app.use(cors());
app.use(express.json());

// ROTA 1: Lista todos os produtos
app.get("/produtos", async (req, res) => {
  console.log("📥 Alguém pediu a lista de produtos!");
  const produtos = await prisma.produto.findMany();
  res.json(produtos);
});

// ROTA 2: Cadastra um novo produto (Vem do React)
app.post("/produtos", async (req, res) => {
  const { url, precoAlvo } = req.body;

  try {
    const novoProduto = await prisma.produto.create({
      data: {
        url: url,
        precoAlvo: parseFloat(precoAlvo),
      },
    });

    console.log("✅ Novo produto registado na BD:", url);
    res.status(201).json(novoProduto);
  } catch (error) {
    console.error("Erro ao guardar na base de dados:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

// ROTA 3: Atualiza o preço e título (Vem do Go Scraper)
app.post("/atualizar-preco", async (req, res) => {
  const { id, precoAtual, titulo } = req.body;

  try {
    const produtoAtualizado = await prisma.produto.update({
      where: { id: id },
      data: {
        precoAtual: precoAtual,
        titulo: titulo,
      },
    });

    console.log(`🚀 PREÇO ATUALIZADO NA BD: ${titulo} - ${precoAtual}`);
    res.json({ message: "Atualizado com sucesso na BD!" });
  } catch (error) {
    console.error("Erro ao atualizar base de dados:", error);
    res.status(404).json({ error: "Produto não encontrado ou erro na BD" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(
    `🧠 Cérebro Node.js a correr com PostgreSQL na porta http://localhost:${PORT}`
  );
});