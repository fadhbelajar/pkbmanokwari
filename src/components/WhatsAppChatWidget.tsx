import { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { MessageCircle, Send, X, User } from 'lucide-react';

export default function WhatsAppChatWidget() {
  const { settings } = useSite();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const whatsappNumber = settings.whatsappNumber?.replace(/\D/g, '') || '';
  const waLink = `https://wa.me/${whatsappNumber}`;

  const handleSend = () => {
    if (!message.trim()) return;
    const text = encodeURIComponent(
      `${name ? `Nama: ${name}\n` : ''}${message}`
    );
    window.open(`${waLink}?text=${text}`, '_blank', 'noopener,noreferrer');
    setMessage('');
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!whatsappNumber) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => { setIsOpen(!isOpen); setHasInteracted(true); }}
          className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
            isOpen
              ? 'bg-slate-700 hover:bg-slate-800 scale-105'
              : 'bg-primary-600 hover:bg-primary-700 hover:scale-110 shadow-primary-500/30'
          }`}
          aria-label="Chat via WhatsApp"
        >
          {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-t-3xl shadow-2xl animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-5 rounded-t-3xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg">Chat dengan Kami</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold">{settings.siteName}</p>
                  <p className="text-xs text-white/70 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Online
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-4">
              {!hasInteracted ? null : null}

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Nama (opsional)
                </label>
                <input
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Anda"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Pesan
                </label>
                <textarea
                  autoComplete="off"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Tulis pesan Anda..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none resize-none text-sm"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all text-sm font-medium"
                >
                  Batal
                </button>
                <button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-medium"
                >
                  <Send className="w-4 h-4" />
                  Kirim ke WhatsApp
                </button>
              </div>

              <p className="text-[10px] text-slate-400 text-center">
                Anda akan diarahkan ke WhatsApp untuk mengirim pesan
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
