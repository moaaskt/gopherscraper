package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
<<<<<<< HEAD
	"strings"
	"time"

	"github.com/gocolly/colly/v2"
)

type Produto struct {
	ID   int    `json:"id"`
	URL  string `json:"url"`
}

func main() {
	fmt.Println("🚀 [GO] Scraper REAL iniciado! Buscando preços na web...")

	for {
	
		resp, _ := http.Get("http://localhost:3000/produtos")
=======
	"time"
)


type Produto struct {
	ID        int     `json:"id"`
	URL       string  `json:"url"`
	PrecoAlvo float64 `json:"precoAlvo"`
}

func main() {
	fmt.Println("🚀 Scraper Go iniciado e aguardando ordens do Node.js...")

	for {
		
		resp, err := http.Get("http://localhost:3000/produtos")
		if err != nil {
			fmt.Println("❌ Erro ao conectar na API Node:", err)
			time.Sleep(5 * time.Second)
			continue
		}

>>>>>>> b739cb853edbb39a9ffd5719b3bf3d9d4577d3a3
		var produtos []Produto
		json.NewDecoder(resp.Body).Decode(&produtos)
		resp.Body.Close()

<<<<<<< HEAD
		for _, p := range produtos {
			fmt.Printf("🔍 [GO] Acessando site: %s\n", p.URL)

			c := colly.NewCollector()
			var precoEncontrado string
			var tituloEncontrado string

			
			c.OnHTML("h1.ui-pdp-title", func(e *colly.HTMLElement) {
				tituloEncontrado = strings.TrimSpace(e.Text)
			})

			c.OnHTML("span.andes-money-amount__fraction", func(e *colly.HTMLElement) {
				if precoEncontrado == "" { 
					precoEncontrado = "R$ " + e.Text
				}
			})

			c.Visit(p.URL)

			
			if precoEncontrado != "" {
				dados := map[string]interface{}{
					"id":         p.ID,
					"precoAtual": precoEncontrado,
					"titulo":     tituloEncontrado,
				}
				jsonDados, _ := json.Marshal(dados)
				http.Post("http://localhost:3000/atualizar-preco", "application/json", bytes.NewBuffer(jsonDados))
				fmt.Printf("✅ [GO] Atualizado: %s -> %s\n", tituloEncontrado, precoEncontrado)
			}
		}

		fmt.Println("😴 [GO] Aguardando 30 segundos para a próxima rodada...")
		time.Sleep(30 * time.Second)
=======
		
		for _, p := range produtos {
			fmt.Printf("🔍 Verificando: %s\n", p.URL)
			
			
			precoSimulado := "R$ 1.450,00"
			tituloSimulado := "Produto Teste Automatizado"

			
			atualizacao := map[string]interface{}{
				"id":         p.ID,
				"precoAtual": precoSimulado,
				"titulo":     tituloSimulado,
			}
			
			corpoJSON, _ := json.Marshal(atualizacao)
			http.Post("http://localhost:3000/atualizar-preco", "application/json", bytes.NewBuffer(corpoJSON))
			
			fmt.Printf("✅ Atualizado: %s custa %s\n", tituloSimulado, precoSimulado)
		}

		
		time.Sleep(10 * time.Second)
>>>>>>> b739cb853edbb39a9ffd5719b3bf3d9d4577d3a3
	}
}