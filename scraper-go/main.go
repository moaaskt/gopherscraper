package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
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
		var produtos []Produto
		json.NewDecoder(resp.Body).Decode(&produtos)
		resp.Body.Close()

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
	}
}