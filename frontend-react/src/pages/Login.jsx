import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Lock, Mail } from 'lucide-react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function Login() {
  const [email, setEmail] = useState('ceo@gophersaas.com');
  const [senha, setSenha] = useState('123456');
  const navigate = useNavigate();

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const fazerLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    // 1. CONTAINER PRINCIPAL (Fundo escuro e tela cheia)
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', fontFamily: "'Inter', sans-serif" }}>
      
      {/* 2. CAMADA DAS PARTÍCULAS (Presa nas bordas da tela, z-index 1) */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          style={{ width: "100%", height: "100%" }}
          options={{
            fullScreen: { enable: false }, // <-- A MÁGICA TÁ AQUI (Desliga o modo bugado)
            background: { color: "transparent" }, // Fundo transparente para aparecer o #020617
            fpsLimit: 60,
            interactivity: {
              events: {
                onHover: { enable: true, mode: "grab" },
                onClick: { enable: true, mode: "push" },
              },
              modes: {
                grab: { distance: 140, line_linked: { opacity: 1 } },
                push: { quantity: 4 },
              },
            },
            particles: {
              color: { value: "#ffffff" },
              links: { color: "#3b82f6", distance: 150, enable: true, opacity: 0.5, width: 1 },
              move: { enable: true, speed: 1.5 },
              number: { density: { enable: true, area: 800 }, value: 80 },
              opacity: { value: 0.5 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 3 } },
            },
            detectRetina: true,
          }}
        />
      </div>

      {/* 3. CAMADA DO FORMULÁRIO (Fica na frente, z-index 10) */}
      <div style={{ position: 'relative', zIndex: 10, backgroundColor: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)', padding: '48px', borderRadius: '24px', width: '90%', maxWidth: '420px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)', border: '1px solid rgba(255,255,255,0.06)' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '40px' }}>
          <div style={{ backgroundColor: '#3B82F6', padding: '10px', borderRadius: '12px', boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)' }}>
            <LayoutDashboard size={28} color="white" />
          </div>
          <span style={{ fontSize: '2rem', fontWeight: '800', letterSpacing: '-1px', color: 'white' }}>Gopher<span style={{color: '#3B82F6'}}>SaaS</span></span>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600', color: 'white' }}>Acessar Plataforma</h2>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginTop: '8px' }}>Gerencie sua inteligência de preços.</p>
        </div>

        <form onSubmit={fazerLogin} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500', color: '#CBD5E1' }}>E-mail corporativo</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#64748B" style={{ position: 'absolute', left: '16px', top: '15px' }} />
              <input type="email" placeholder="ceo@gophersaas.com" required value={email} onChange={e => setEmail(e.target.value)}
                style={{ width: '100%', padding: '14px 14px 14px 48px', borderRadius: '12px', border: '1px solid #334155', backgroundColor: 'rgba(15, 23, 42, 0.6)', color: '#FFF', outline: 'none', fontSize: '1rem', boxSizing: 'border-box' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500', color: '#CBD5E1' }}>Senha</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#64748B" style={{ position: 'absolute', left: '16px', top: '15px' }} />
              <input type="password" placeholder="••••••••" required value={senha} onChange={e => setSenha(e.target.value)}
                style={{ width: '100%', padding: '14px 14px 14px 48px', borderRadius: '12px', border: '1px solid #334155', backgroundColor: 'rgba(15, 23, 42, 0.6)', color: '#FFF', outline: 'none', fontSize: '1rem', boxSizing: 'border-box' }} />
            </div>
          </div>

          <button type="submit" style={{ backgroundColor: '#3B82F6', color: 'white', padding: '16px', borderRadius: '12px', border: 'none', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', marginTop: '10px', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)' }}>
            Entrar no Painel
          </button>
        </form>

      </div>
    </div>
  );
}

export default Login;