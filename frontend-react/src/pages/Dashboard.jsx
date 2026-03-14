import React, { useState } from 'react';
import { LayoutDashboard, Bell, Search, ExternalLink, Package, Trash2, PlusCircle } from 'lucide-react';

function Dashboard() {
  const [url, setUrl] = useState('');
  const [targetPrice, setTargetPrice] = useState('');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0F172A', color: '#F8FAFC', fontFamily: "'Inter', sans-serif" }}>
      
      {/* SIDEBAR (Barra Lateral) */}
      <div style={{ width: '260px', backgroundColor: '#1E293B', padding: '24px', borderRight: '1px solid #334155', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <div style={{ backgroundColor: '#3B82F6', padding: '8px', borderRadius: '8px' }}>
            <LayoutDashboard size={24} color="white" />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Gopher<span style={{color: '#3B82F6'}}>SaaS</span></span>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ padding: '12px', backgroundColor: '#3B82F6', borderRadius: '8px', cursor: 'pointer', display: 'flex', gap: '12px', alignItems: 'center', fontWeight: '500' }}>
            <LayoutDashboard size={20} /> Dashboard
          </div>
          <div style={{ padding: '12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', gap: '12px', alignItems: 'center', color: '#94A3B8', fontWeight: '500' }}>
            <Bell size={20} /> Alertas
          </div>
        </nav>
      </div>

      {/* ÁREA PRINCIPAL */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: '800' }}>Painel de Controle</h1>
            <p style={{ color: '#94A3B8', marginTop: '4px' }}>Rastreadores em tempo real operando.</p>
          </div>
          <div style={{ backgroundColor: '#1E293B', padding: '16px 24px', borderRadius: '16px', border: '1px solid #334155', textAlign: 'center' }}>
            <div style={{ fontSize: '0.875rem', color: '#94A3B8', fontWeight: '600', textTransform: 'uppercase' }}>Ativos</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFF' }}>1</div>
          </div>
        </div>

        {/* INPUT DE NOVO PRODUTO */}
        <div style={{ backgroundColor: '#1E293B', padding: '24px', borderRadius: '16px', border: '1px solid #334155', marginBottom: '40px', display: 'flex', gap: '16px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ flex: 2, minWidth: '250px' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '8px', color: '#F8FAFC' }}>URL do Produto</label>
            <div style={{ position: 'relative' }}>
              <Search size={18} color="#64748B" style={{ position: 'absolute', left: '16px', top: '14px' }} />
              <input type="text" placeholder="https://produto.mercadolivre.com.br/..." value={url} onChange={e => setUrl(e.target.value)}
                style={{ width: '100%', padding: '12px 16px 12px 48px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0F172A', color: 'white', outline: 'none' }} />
            </div>
          </div>
          <div style={{ flex: 1, minWidth: '150px' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '8px', color: '#F8FAFC' }}>Preço Alvo</label>
            <input type="text" placeholder="Ex: 1200" value={targetPrice} onChange={e => setTargetPrice(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0F172A', color: 'white', outline: 'none' }} />
          </div>
          <button style={{ padding: '12px 24px', backgroundColor: '#3B82F6', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', height: '46px' }}>
            <PlusCircle size={18} /> Deploy
          </button>
        </div>

        {/* GRID DE CARDS (Com lógica Mobile-First) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 350px), 1fr))', gap: '24px' }}>
          
          {/* CARD DE EXEMPLO */}
          <div style={{ backgroundColor: '#1E293B', borderRadius: '16px', border: '1px solid #334155', padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ backgroundColor: '#1E3A8A', padding: '10px', borderRadius: '10px' }}>
                <Package size={20} color="#60A5FA" />
              </div>
              <ExternalLink size={18} color="#64748B" style={{ cursor: 'pointer' }} />
            </div>
            
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1rem', fontWeight: '600', lineHeight: '1.4' }}>Apple iPhone 15 (128 GB) - Preto - Distribuidor Autorizado</h3>
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '24px' }}>
              <span style={{ fontSize: '2rem', fontWeight: '800', color: '#10B981' }}>R$ 7.209</span>
              <span style={{ color: '#94A3B8', fontSize: '0.875rem' }}>atual</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #334155', borderBottom: '1px solid #334155', padding: '16px 0', marginBottom: '16px' }}>
              <div style={{ textAlign: 'center', flex: 1, borderRight: '1px solid #334155' }}>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: '600', marginBottom: '4px' }}>TARGET</div>
                <div style={{ fontWeight: 'bold' }}>R$ 3800</div>
              </div>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: '600', marginBottom: '4px' }}>STATUS</div>
                <div style={{ fontWeight: 'bold', color: '#3B82F6' }}>Active</div>
              </div>
            </div>

            <button style={{ backgroundColor: '#4C1D95', color: '#F87171', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '600', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', cursor: 'pointer', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
              <Trash2 size={16} /> Abortar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;