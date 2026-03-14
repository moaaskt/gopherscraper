import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LayoutDashboard, PlusCircle, Trash2, ExternalLink, TrendingDown, Package } from 'lucide-react';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [url, setUrl] = useState('');
  const [precoAlvo, setPrecoAlvo] = useState('');

  const carregarProdutos = async () => {
    try {
      const res = await axios.get('http://localhost:3000/produtos');
      setProdutos(res.data);
    } catch (err) { console.error("Erro ao conectar no Cérebro"); }
  };

  useEffect(() => {
    carregarProdutos();
    const interval = setInterval(carregarProdutos, 5000);
    return () => clearInterval(interval);
  }, []);

  const cadastrar = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/produtos', { url, precoAlvo: parseFloat(precoAlvo) });
    setUrl(''); setPrecoAlvo('');
    carregarProdutos();
  };

const deletar = async (id) => {
  if (window.confirm("Deseja mesmo parar de monitorar este produto?")) {
    await axios.delete(`http://localhost:3000/produtos/${id}`);
    carregarProdutos();
  }
};

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa', fontFamily: 'Inter, sans-serif' }}>
      
      {/* SIDEBAR */}
      <div style={{ width: '260px', backgroundColor: '#1e1e2d', color: '#fff', padding: '20px' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem' }}>
          <LayoutDashboard size={24} color="#007bff" /> GopherSaaS
        </h2>
        <nav style={{ marginTop: '40px' }}>
          <div style={{ padding: '10px', backgroundColor: '#2b2b40', borderRadius: '8px', cursor: 'pointer' }}>📊 Dashboard</div>
          <div style={{ padding: '10px', marginTop: '10px', color: '#a2a2c2', cursor: 'pointer' }}>⚙️ Configurações</div>
        </nav>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div style={{ flex: 1, padding: '40px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
          <h1>Visão Geral</h1>
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ background: '#fff', padding: '15px 25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <small style={{ color: '#666' }}>Produtos</small>
              <h3 style={{ margin: 0 }}>{produtos.length}</h3>
            </div>
            <div style={{ background: '#fff', padding: '15px 25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <small style={{ color: '#666' }}>Alertas</small>
              <h3 style={{ margin: 0, color: '#28a745' }}>0</h3>
            </div>
          </div>
        </header>

        {/* FORMULÁRIO DE CADASTRO RÁPIDO */}
        <section style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '15px', marginBottom: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <form onSubmit={cadastrar} style={{ display: 'flex', gap: '15px', alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Link do Produto</label>
              <input type="text" placeholder="Cole a URL do Mercado Livre..." value={url} onChange={e => setUrl(e.target.value)} 
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} required />
            </div>
            <div style={{ width: '150px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Preço Alvo</label>
              <input type="number" placeholder="Ex: 1500" value={precoAlvo} onChange={e => setPrecoAlvo(e.target.value)} 
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} required />
            </div>
            <button type="submit" style={{ padding: '12px 25px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PlusCircle size={20} /> Monitorar
            </button>
          </form>
        </section>

        {/* GRID DE MONITORAMENTO */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '25px' }}>
          {produtos.map(p => (
            <div key={p.id} style={{ background: '#fff', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', position: 'relative' }}>
               <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <Package size={20} color="#666" />
                    <a href={p.url} target="_blank" rel="noreferrer"><ExternalLink size={18} color="#007bff" /></a>
                  </div>
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '1rem', height: '40px', overflow: 'hidden' }}>{p.titulo || "Aguardando primeiro scan..."}</h4>
                  <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '15px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <small style={{ color: '#888' }}>Meta</small>
                      <p style={{ margin: 0, fontWeight: 'bold' }}>R$ {p.precoAlvo}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <small style={{ color: '#888' }}>Atual</small>
                      <p style={{ margin: 0, fontWeight: 'bold', color: '#28a745', fontSize: '1.2rem' }}>{p.precoAtual || "---"}</p>
                    </div>
                  </div>
               </div>
               <button onClick={() => deletar(p.id)} style={{ width: '100%', padding: '10px', border: 'none', backgroundColor: '#fff5f5', color: '#e03e3e', cursor: 'pointer', display: 'flex', justifyContent: 'center', gap: '5px', borderTop: '1px solid #ffe3e3' }}>
                 <Trash2 size={16} /> Remover Monitoramento
               </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;