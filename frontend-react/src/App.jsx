import { useState, useEffect } from 'react'

function App() {
  const [produtos, setProdutos] = useState([])
  const [novaUrl, setNovaUrl] = useState('')
  const [novoPrecoAlvo, setNovoPrecoAlvo] = useState('')

  // Função para buscar os dados na nossa API Node.js
  const carregarProdutos = async () => {
    try {
      const resposta = await fetch('http://localhost:3000/produtos')
      const dados = await resposta.json()
      setProdutos(dados)
    } catch (error) {
      console.error("Erro ao buscar produtos. O Node está rodando?", error)
    }
  }

  // O useEffect garante que os produtos sejam carregados assim que a tela abrir
  useEffect(() => {
    carregarProdutos()
  }, [])

  // Função para cadastrar uma nova URL
  const adicionarProduto = async (e) => {
    e.preventDefault()
    
    await fetch('http://localhost:3000/produtos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        url: novaUrl, 
        precoAlvo: parseFloat(novoPrecoAlvo) 
      })
    })

    // Limpa os campos do formulário e recarrega a tabela
    setNovaUrl('')
    setNovoPrecoAlvo('')
    carregarProdutos()
  }

  return (
    <div style={{ padding: '30px', fontFamily: 'system-ui, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🐹 GopherScraper - Rastreador de Preços</h1>
      <p>Desenvolvido com React, Node.js e Golang!</p>

      {/* Formulário para adicionar novos links */}
      <div style={{ background: '#f4f4f4', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Adicionar Novo Produto</h3>
        <form onSubmit={adicionarProduto} style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="url" 
            placeholder="Cole a URL aqui..." 
            value={novaUrl} 
            onChange={e => setNovaUrl(e.target.value)} 
            required 
            style={{ flex: 1, padding: '8px' }}
          />
          <input 
            type="number" 
            placeholder="Preço Alvo" 
            value={novoPrecoAlvo} 
            onChange={e => setNovoPrecoAlvo(e.target.value)} 
            required 
            style={{ width: '100px', padding: '8px' }}
          />
          <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer', background: '#00add8', color: 'white', border: 'none', borderRadius: '4px' }}>
            Rastrear
          </button>
        </form>
      </div>

      {/* Tabela de Produtos */}
      <table border="1" cellPadding="12" style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'left' }}>
        <thead style={{ background: '#333', color: 'white' }}>
          <tr>
            <th>ID</th>
            <th>Título do Produto</th>
            <th>Preço Alvo</th>
            <th>Preço Atual (Go)</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td><strong>{p.titulo}</strong></td>
              <td>{p.precoAlvo}</td>
              <td style={{ color: p.precoAtual ? 'green' : 'gray', fontWeight: 'bold' }}>
                {p.precoAtual || 'Aguardando Go...'}
              </td>
              <td><a href={p.url} target="_blank" rel="noreferrer">Acessar</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App