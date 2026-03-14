package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/gocolly/colly/v2"
)

// 1. O Molde do que vem do Node.js
type ProdutoNode struct {
	ID         int     `json:"id"`
	URL        string  `json:"url"`
	PrecoAlvo  float64 `json:"precoAlvo"`
	PrecoAtual string  `json:"precoAtual"`
	Titulo     string  `json:"titulo"`
}

// 2. O Molde do que vamos enviar de volta para o Node.js
type Atualizacao struct {
	ID         int    `json:"id"`
	Titulo     string `json:"titulo"`
	PrecoAtual string `json:"precoAtual"`
}

func main() {
	fmt.Println("🤖 Iniciando o GopherScraper...")

	// --- PASSO A: Buscar a lista de produtos no Node.js ---
	resp, err := http.Get("http://localhost:3000/produtos")
	if err != nil {
		fmt.Println("❌ Erro ao conectar no Node.js. Ele está rodando?", err)
		return
	}
	defer resp.Body.Close() // Boa prática no Go: fechar a conexão no final

	// Lendo a resposta do Node
	body, _ := io.ReadAll(resp.Body)
	var produtos []ProdutoNode
	json.Unmarshal(body, &produtos) // Transforma o JSON do Node no nosso Slice de Structs

	fmt.Printf("📥 Recebi %d produto(s) para rastrear.\n", len(produtos))

	// --- PASSO B: Iniciar o robô (Colly) para cada produto ---
	c := colly.NewCollector()

	for _, produto := range produtos {
		fmt.Printf("🔎 Vasculhando: %s\n", produto.URL)

		var tituloEncontrado, precoEncontrado string

		// Configura o que o robô vai fazer ao achar o HTML
		c.OnHTML("article.product_pod", func(e *colly.HTMLElement) {
			// Como a página tem vários livros, vamos pegar só o primeiro para este teste
			if tituloEncontrado == "" {
				tituloEncontrado = e.ChildText("h3 a")
				precoEncontrado = e.ChildText("p.price_color")
			}
		})

		// Manda o robô visitar a URL que veio do Node!
		c.Visit(produto.URL)

		// --- PASSO C: Enviar o resultado de volta para o Node.js ---
		if tituloEncontrado != "" {
			fmt.Printf("📦 Achei! %s - %s. Avisando o Node...\n", tituloEncontrado, precoEncontrado)

			// Monta o pacote de dados
			dados := Atualizacao{
				ID:         produto.ID,
				Titulo:     tituloEncontrado,
				PrecoAtual: precoEncontrado,
			}

			// Converte para JSON
			jsonData, _ := json.Marshal(dados)

			// Faz o POST para o Node
			http.Post("http://localhost:3000/atualizar-preco", "application/json", bytes.NewBuffer(jsonData))
		}
	}

	fmt.Println("✅ Varredura concluída!")
}