import React, { useState } from 'react';
import { MessageSquare, Send, CheckCheck, Phone, Video, MoreVertical, Sparkles } from 'lucide-react';
import { Language, TRANSLATIONS } from '../lib/translations';

interface WhatsAppSimulatorProps {
  language: Language;
}

export const WhatsAppSimulator: React.FC<WhatsAppSimulatorProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  const [chat, setChat] = useState([
    { sender: 'bot', time: '10:00 AM', text: "Namaskar! Welcome to Maharashtra SkillBridge WhatsApp Helpline (+91 94220 12345). Reply with your current skills or target job role to receive an instant skill gap report and Skill India course links." },
    { sender: 'user', time: '10:01 AM', text: "I have skills in HTML, CSS, JavaScript and SQL. Target is Full Stack Developer." },
    { sender: 'bot', time: '10:01 AM', text: "📊 SkillBridge Analysis:\n• Match: 50.0% Basic / 52.2% Weighted\n• Verified: HTML, CSS, JS, SQL\n• Missing Priority: React, Node.js, REST APIs\n\n🔗 Recommended Subsidized Course:\nFull Stack Web Development with React & Node (Skill India Digital Hub)\n👉 https://courses.skillindiadigital.gov.in/\n\nReply 'ROADMAP' to get weekly SMS learning checkpoints." }
  ]);
  const [msgInput, setMsgInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgInput.trim()) return;

    const userText = msgInput;
    const newChat = [...chat, { sender: 'user', time: 'Just now', text: userText }];
    setChat(newChat);
    setMsgInput('');

    setTimeout(() => {
      let botReply = "SkillBridge Bot: To explore accredited training programs in your district, visit https://courses.skillindiadigital.gov.in/ or reply 'HELP'.";
      const lower = userText.toLowerCase();

      if (lower.includes('roadmap') || lower.includes('step')) {
        botReply = "📍 Roadmap Step 1: Master React state components (Estimated: 2 weeks). Project: AI Career Dashboard.\nCheck: https://internship.aicte-india.org/";
      } else if (lower.includes('pune') || lower.includes('mumbai') || lower.includes('district')) {
        botReply = "📍 Regional Hub Alert: Pune Hinjewadi has 1,200+ open Full Stack positions. Top requirement: React & Node.js.";
      }

      setChat(prev => [...prev, { sender: 'bot', time: 'Just now', text: botReply }]);
    }, 800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '800px', padding: '1.75rem' }}>
        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#10b981', fontWeight: 700, letterSpacing: '0.05em' }}>
          SIH Differentiator 3 • Rural & Low-Bandwidth Inclusion
        </div>
        <h2 style={{ fontSize: '1.35rem', color: '#f8fafc', margin: '0.2rem 0 0 0' }}>
          {t.nav_whatsapp} (WhatsApp Cloud API Sandbox)
        </h2>
        <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>
          Simulates offline/2G smartphone accessibility allowing rural Maharashtra youth to query skill gaps and subsidized courses via WhatsApp.
        </p>
      </div>

      {/* Simulated Smartphone Screen */}
      <div style={{
        width: '100%',
        maxWidth: '440px',
        background: '#0b141a',
        borderRadius: '32px',
        border: '8px solid #1f2c34',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '620px'
      }}>
        {/* WhatsApp Header */}
        <div style={{
          background: '#202c33',
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#e9edef'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#00a884',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '1.1rem'
            }}>
              SB
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>
                SkillBridge Maharashtra
              </div>
              <div style={{ fontSize: '0.7rem', color: '#00a884' }}>
                Official Government Bot • Online
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', color: '#aebac1' }}>
            <Video size={18} />
            <Phone size={18} />
            <MoreVertical size={18} />
          </div>
        </div>

        {/* WhatsApp Chat Body */}
        <div style={{
          flex: 1,
          padding: '1rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}>
          {chat.map((m, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                background: m.sender === 'user' ? '#005c4b' : '#202c33',
                color: '#e9edef',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                fontSize: '0.82rem',
                lineHeight: 1.45,
                whiteSpace: 'pre-line',
                boxShadow: '0 1px 2px rgba(0,0,0,0.3)'
              }}
            >
              <div>{m.text}</div>
              <div style={{ fontSize: '0.65rem', color: '#8696a0', textAlign: 'right', marginTop: '0.2rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.2rem' }}>
                <span>{m.time}</span>
                {m.sender === 'user' && <CheckCheck size={13} color="#53bdeb" />}
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Input Bar */}
        <form onSubmit={handleSend} style={{
          background: '#202c33',
          padding: '0.5rem 0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <input
            type="text"
            placeholder="Type skill query or 'ROADMAP'..."
            value={msgInput}
            onChange={(e) => setMsgInput(e.target.value)}
            style={{
              flex: 1,
              background: '#2a3942',
              border: 'none',
              borderRadius: '8px',
              padding: '0.6rem 0.85rem',
              color: '#e9edef',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            style={{
              background: '#00a884',
              border: 'none',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              cursor: 'pointer'
            }}
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
