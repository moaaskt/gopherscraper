import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [url, setUrl] = useState('');
  const [precoAlvo, setPrecoAlvo] = useState('');

  // Busca produtos da API a cada 3 segundos para ver a atualização do Go em tempo real
  const carregarProdutos = async () => {
    const res = await axios.get('http://localhost:3000/produtos');
    setProdutos(res.data);
  };

  useEffect(() => {
    carregarProdutos();
    const interval = setInterval(carregarProdutos, 3000);
    return () => clearInterval(interval);
  }, []);

  const cadastrar = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/produtos', { url, precoAlvo });
    setUrl('');
    setPrecoAlvo('');
    carregarProdutos();
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#f4f4f9', minHeight: '100vh' }}>
      <h1>🕵️‍♂️ Gopher Scraper - Dashboard</h1>
      
      <form onSubmit={cadastrar} style={{ marginBottom: '30px', background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h3>Cadastrar Novo Produto</h3>
        <input type="text" placeholder="URL do Produto" value={url} onChange={e => setUrl(e.target.value)} style={{ padding: '10px', width: '300px', marginRight: '10px' }} required />
        <input type="number" placeholder="Preço Alvo" value={precoAlvo} onChange={e => setPrecoAlvo(e.target.value)} style={{ padding: '10px', width: '100px', marginRight: '10px' }} required />
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>Monitorar</button>
      </form>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {produtos.map(p => (
          <div key={p.id} style={{ background: '#fff', padding: '15px', borderRadius: '8px', borderLeft: '5px solid #007bff', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
            <h4>{p.titulo || "Buscando informações..."}</h4>
            <p style={{ fontSize: '12px', color: '#666', wordBreak: 'break-all' }}>{p.url}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Alvo: <b>R$ {p.precoAlvo}</b></span>
              <span style={{ color: 'green', fontWeight: 'bold' }}>Atual: {p.precoAtual || "---"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;