package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
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

		var produtos []Produto
		json.NewDecoder(resp.Body).Decode(&produtos)
		resp.Body.Close()

		
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
	}
}