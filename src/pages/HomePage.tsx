import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [showRazbanModal, setShowRazbanModal] = useState(false);
  const [nick, setNick] = useState("");
  const [sending, setSending] = useState(false);
  const [razbanSent, setRazbanSent] = useState(false);
  const [razbanError, setRazbanError] = useState("");

  const handleDonate = () => {
    alert("Простите, пока что не работает");
  };

  const handleRazbanSubmit = async () => {
    if (!nick.trim()) return;
    setSending(true);
    setRazbanError("");
    try {
      const res = await fetch("https://functions.poehali.dev/f7dd4043-7bf8-49e6-abb0-f5d39f234ea1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nick: nick.trim() }),
      });
      if (res.ok) {
        setRazbanSent(true);
        setNick("");
      } else {
        setRazbanError("Ошибка отправки. Попробуйте позже.");
      }
    } catch {
      setRazbanError("Ошибка соединения. Попробуйте позже.");
    }
    setSending(false);
  };

  const closeModal = () => {
    setShowRazbanModal(false);
    setRazbanSent(false);
    setNick("");
    setRazbanError("");
  };

  return (
    <div className="home-page">
      {/* Animated background */}
      <div className="home-bg">
        <div className="home-bg-orb orb-1" />
        <div className="home-bg-orb orb-2" />
        <div className="home-bg-orb orb-3" />
        <div className="home-bg-particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="home-particle" style={{ "--i": i } as React.CSSProperties} />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="home-content">
        {/* Rainbow title */}
        <div className="home-welcome-wrap">
          <h1 className="home-rainbow-title">
            Приветствую вас на Сайте сервера MOSTAXYI
          </h1>
        </div>

        {/* Subtitle */}
        <p className="home-subtitle">
          Добро пожаловать! Здесь вы можете купить донат и подать заявку на разбан.
        </p>

        {/* Buttons */}
        <div className="home-buttons">
          <button className="home-btn home-btn-donate" onClick={handleDonate}>
            <span className="home-btn-icon">💎</span>
            Купить донат
          </button>

          <button className="home-btn home-btn-razban" onClick={() => setShowRazbanModal(true)}>
            <span className="home-btn-icon">🔓</span>
            RAZBAN на сервере
          </button>
        </div>

        {/* Decorative server card */}
        <div className="home-server-card">
          <div className="home-server-dot" />
          <span className="home-server-label">MOSTAXYI — сервер онлайн</span>
        </div>

        {/* FAQ link */}
        <button className="home-faq-link" onClick={() => navigate("/faq")}>
          📋 Частые вопросы (FAQ)
        </button>
      </div>

      {/* RAZBAN Modal */}
      {showRazbanModal && (
        <div className="home-modal-overlay" onClick={closeModal}>
          <div className="home-modal" onClick={(e) => e.stopPropagation()}>
            <button className="home-modal-close" onClick={closeModal}>✕</button>

            {razbanSent ? (
              <div className="home-modal-success">
                <div className="home-modal-success-icon">✅</div>
                <h3>Заявка отправлена!</h3>
                <p>Администрация рассмотрит вашу заявку на разбан в ближайшее время.</p>
                <button className="home-btn home-btn-razban" style={{ marginTop: 20 }} onClick={closeModal}>
                  Закрыть
                </button>
              </div>
            ) : (
              <>
                <div className="home-modal-icon">🔓</div>
                <h3 className="home-modal-title">Заявка на разбан</h3>
                <p className="home-modal-desc">
                  Введите ваш ник на сервере, и мы отправим заявку администрации.
                </p>
                <input
                  className="home-modal-input"
                  type="text"
                  placeholder="Ваш ник на сервере..."
                  value={nick}
                  onChange={(e) => setNick(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleRazbanSubmit()}
                  autoFocus
                />
                {razbanError && <p className="home-modal-error">{razbanError}</p>}
                <button
                  className="home-btn home-btn-razban"
                  style={{ width: "100%", justifyContent: "center" }}
                  onClick={handleRazbanSubmit}
                  disabled={!nick.trim() || sending}
                >
                  {sending ? "Отправляем..." : "Отправить заявку"}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        /* ====== HOME PAGE ====== */
        .home-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: #0a0a1a;
          font-family: "Golos Text", sans-serif;
        }

        /* BACKGROUND */
        .home-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .home-bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.5;
          animation: orb-float 8s ease-in-out infinite;
        }

        .orb-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #7c3aed, #4f46e5);
          top: -100px;
          left: -100px;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #ec4899, #f97316);
          bottom: -80px;
          right: -80px;
          animation-delay: -3s;
        }

        .orb-3 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, #06b6d4, #10b981);
          bottom: 20%;
          left: 30%;
          animation-delay: -5s;
        }

        @keyframes orb-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }

        /* PARTICLES */
        .home-bg-particles {
          position: absolute;
          inset: 0;
        }

        .home-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          animation: particle-rise calc(6s + calc(var(--i) * 0.4s)) ease-in-out infinite;
          left: calc(var(--i) * 5.2%);
          bottom: -10px;
          opacity: 0;
        }

        @keyframes particle-rise {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-100vh) scale(1.5); opacity: 0; }
        }

        /* CONTENT */
        .home-content {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 40px 24px;
          max-width: 700px;
          width: 100%;
          animation: home-fade-in 0.8s ease both;
        }

        @keyframes home-fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* RAINBOW TITLE */
        .home-welcome-wrap {
          margin-bottom: 24px;
        }

        .home-rainbow-title {
          font-size: clamp(28px, 5vw, 52px);
          font-weight: 900;
          line-height: 1.2;
          background: linear-gradient(
            90deg,
            #ff0000 0%,
            #ff7700 12%,
            #ffff00 25%,
            #00ff00 37%,
            #00ffff 50%,
            #0080ff 62%,
            #8000ff 75%,
            #ff00ff 87%,
            #ff0000 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: rainbow-shift 3s linear infinite;
          filter: drop-shadow(0 0 20px rgba(255, 100, 255, 0.4));
        }

        @keyframes rainbow-shift {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        /* SUBTITLE */
        .home-subtitle {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 48px;
          line-height: 1.6;
          animation: home-fade-in 0.8s ease 0.2s both;
        }

        /* BUTTONS */
        .home-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 48px;
          animation: home-fade-in 0.8s ease 0.4s both;
        }

        .home-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 36px;
          border-radius: 50px;
          border: none;
          font-family: "Golos Text", sans-serif;
          font-size: 17px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          position: relative;
          overflow: hidden;
        }

        .home-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0);
          transition: background 0.2s;
        }

        .home-btn:hover {
          transform: translateY(-3px) scale(1.03);
        }

        .home-btn:active {
          transform: translateY(0) scale(0.98);
        }

        .home-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .home-btn-donate {
          background: linear-gradient(135deg, #f59e0b, #ef4444, #ec4899);
          color: #fff;
          box-shadow: 0 8px 32px rgba(239, 68, 68, 0.4);
        }

        .home-btn-donate:hover {
          box-shadow: 0 12px 40px rgba(239, 68, 68, 0.6);
        }

        .home-btn-razban {
          background: linear-gradient(135deg, #10b981, #06b6d4, #6366f1);
          color: #fff;
          box-shadow: 0 8px 32px rgba(99, 102, 241, 0.4);
        }

        .home-btn-razban:hover {
          box-shadow: 0 12px 40px rgba(99, 102, 241, 0.6);
        }

        .home-btn-icon {
          font-size: 20px;
          line-height: 1;
        }

        /* SERVER CARD */
        .home-server-card {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(12px);
          border-radius: 100px;
          padding: 10px 24px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          font-weight: 500;
          animation: home-fade-in 0.8s ease 0.6s both;
        }

        .home-server-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
          animation: dot-pulse 2s ease-in-out infinite;
        }

        @keyframes dot-pulse {
          0%, 100% { box-shadow: 0 0 8px #10b981; }
          50% { box-shadow: 0 0 16px #10b981, 0 0 24px rgba(16, 185, 129, 0.4); }
        }

        /* FAQ LINK */
        .home-faq-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 20px;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.45);
          font-family: "Golos Text", sans-serif;
          font-size: 14px;
          cursor: pointer;
          transition: color 0.2s;
          text-decoration: underline;
          text-underline-offset: 3px;
          animation: home-fade-in 0.8s ease 0.8s both;
        }

        .home-faq-link:hover {
          color: rgba(255, 255, 255, 0.8);
        }

        /* MODAL */
        .home-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: modal-bg-in 0.25s ease both;
        }

        @keyframes modal-bg-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .home-modal {
          background: linear-gradient(135deg, #1a1a2e, #16213e);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 24px;
          padding: 40px 36px;
          width: 100%;
          max-width: 440px;
          position: relative;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.6);
          animation: modal-slide-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }

        @keyframes modal-slide-in {
          from { opacity: 0; transform: scale(0.85) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .home-modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(255,255,255,0.08);
          border: none;
          color: rgba(255,255,255,0.6);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s, color 0.15s;
        }

        .home-modal-close:hover {
          background: rgba(255,255,255,0.15);
          color: #fff;
        }

        .home-modal-icon {
          font-size: 48px;
          margin-bottom: 16px;
          display: block;
          text-align: center;
        }

        .home-modal-title {
          font-size: 24px;
          font-weight: 800;
          color: #fff;
          text-align: center;
          margin-bottom: 10px;
        }

        .home-modal-desc {
          font-size: 15px;
          color: rgba(255,255,255,0.6);
          text-align: center;
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .home-modal-input {
          width: 100%;
          background: rgba(255,255,255,0.07);
          border: 2px solid rgba(255,255,255,0.12);
          border-radius: 14px;
          padding: 14px 18px;
          font-family: "Golos Text", sans-serif;
          font-size: 16px;
          color: #fff;
          outline: none;
          margin-bottom: 16px;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }

        .home-modal-input::placeholder {
          color: rgba(255,255,255,0.3);
        }

        .home-modal-input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.2);
        }

        .home-modal-error {
          color: #ef4444;
          font-size: 14px;
          margin-bottom: 12px;
          text-align: center;
        }

        .home-modal-success {
          text-align: center;
          padding: 10px 0;
        }

        .home-modal-success-icon {
          font-size: 56px;
          margin-bottom: 16px;
        }

        .home-modal-success h3 {
          font-size: 22px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 10px;
        }

        .home-modal-success p {
          font-size: 15px;
          color: rgba(255,255,255,0.6);
          line-height: 1.6;
        }

        @media (max-width: 500px) {
          .home-buttons { flex-direction: column; align-items: center; }
          .home-btn { width: 100%; max-width: 320px; justify-content: center; }
          .home-modal { padding: 28px 20px; }
        }
      `}</style>
    </div>
  );
}