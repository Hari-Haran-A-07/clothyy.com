import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS } from '../../data/products';
import { X, Send, Sparkles, User, Bot, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  recommendedProductIds?: string[];
}

export const AiStylistDrawer: React.FC = () => {
  const {
    isAiStylistOpen,
    setIsAiStylistOpen,
    navigateTo,
    formatPrice,
    addToCart,
    isRTL
  } = useStore();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: "Welcome to the CLOTHYYY Private Styling Concierge. I can assist you with runway pairings, black-tie gala dress codes, bespoke measurements, and fabric care secrets. How may I style your wardrobe today?",
      recommendedProductIds: ['clo-001', 'clo-002']
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isAiStylistOpen) {
      scrollToBottom();
    }
  }, [messages, isAiStylistOpen]);

  if (!isAiStylistOpen) return null;

  const quickPrompts = [
    "What pairs best with the Monolith Cashmere Coat?",
    "Recommend a black-tie evening gala outfit",
    "Men's architectural tailoring for boardroom to dinner",
    "How to care for 40mm mulberry silk crepe"
  ];

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: Message = {
      id: Math.random().toString(36),
      sender: 'user',
      text: query
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiReply = "I have curated a distinct architectural ensemble tailored to your inquiry.";
      let productIds: string[] = [];

      const lower = query.toLowerCase();
      if (lower.includes('coat') || lower.includes('monolith') || lower.includes('winter')) {
        aiReply = "For the Monolith Double-Faced Cashmere Overcoat, I recommend pairing it with our Pleated Palazzo Wool Trousers and the Tuscan Calfskin Tote for an impeccably fluid, elongated silhouette.";
        productIds = ['clo-001', 'clo-005', 'clo-009'];
      } else if (lower.includes('gala') || lower.includes('evening') || lower.includes('dress') || lower.includes('silk')) {
        aiReply = "For a black-tie gala or private soirée, our Architectural 40mm Silk Crepe Asymmetric Gown accompanied by the Sculptural Pointed Heel Mules and Origami Silk Evening Cape will create an unforgettable presence.";
        productIds = ['clo-002', 'clo-007', 'clo-010'];
      } else if (lower.includes('men') || lower.includes('suit') || lower.includes('tailor') || lower.includes('boardroom')) {
        aiReply = "For modern masculine authority, consider our Double-Breasted Tailored Coat cut from Super 150s Wool and Cashmere, layered over the 4-ply Scottish Crewneck and Japanese Selvedge Wool Trousers.";
        productIds = ['clo-004', 'clo-006', 'clo-008'];
      } else if (lower.includes('care') || lower.includes('wash') || lower.includes('clean')) {
        aiReply = "All CLOTHYYY cashmere and 40mm silk crepe pieces should be maintained with professional luxury dry cleaning only. Store garments in our breathable canvas bags on solid cedar hangers to preserve their natural drape.";
        productIds = ['clo-001', 'clo-003'];
      } else {
        aiReply = "Based on our latest Autumn/Winter '26 Runway edit, here are two signature pieces that encapsulate our quiet luxury philosophy.";
        productIds = ['clo-001', 'clo-004'];
      }

      const aiMsg: Message = {
        id: Math.random().toString(36),
        sender: 'ai',
        text: aiReply,
        recommendedProductIds: productIds
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm">
      <div className={`absolute inset-y-0 ${isRTL ? 'left-0' : 'right-0'} max-w-full flex`}>
        <motion.div
          initial={{ x: isRTL ? '-100%' : '100%' }}
          animate={{ x: 0 }}
          exit={{ x: isRTL ? '-100%' : '100%' }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-screen max-w-lg bg-[#FAF9F6] dark:bg-[#101115] text-[#121316] dark:text-[#FAF9F6] shadow-2xl flex flex-col justify-between border-l border-[#E5E1D8] dark:border-[#22242D]"
        >
          {/* Header */}
          <div className="p-5 border-b border-[#E8E4DA] dark:border-[#22242D] flex items-center justify-between bg-[#FAF9F6] dark:bg-[#101115]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#121316] text-[#C5A880] flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-serif font-medium tracking-wide">
                  CLOTHYYY AI STYLIST CONCIERGE
                </h3>
                <span className="text-[10px] font-mono text-[#8A857A] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1B6B4A] animate-pulse"></span>
                  Active Fashion Advisor
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsAiStylistOpen(false)}
              className="p-1 text-[#8A857A] hover:text-black dark:hover:text-white"
              aria-label="Close AI Stylist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages scroll area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-[#121316] text-[#C5A880] flex items-center justify-center flex-shrink-0 text-xs">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded p-4 text-xs font-light leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#121316] text-[#FAF9F6] ml-auto'
                      : 'bg-[#EFECE5] dark:bg-[#1A1C24] text-[#121316] dark:text-[#E8E6E0] border border-[#DDD8CE] dark:border-[#282A36]'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* If recommendations present */}
                  {msg.recommendedProductIds && msg.recommendedProductIds.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-[#DDD8CE] dark:border-[#2C2E38] space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#C5A880] block">
                        RECOMMENDED ATELIER PIECES:
                      </span>
                      <div className="grid grid-cols-1 gap-2">
                        {msg.recommendedProductIds.map((id) => {
                          const product = PRODUCTS.find((p) => p.id === id);
                          if (!product) return null;
                          return (
                            <div
                              key={product.id}
                              onClick={() => {
                                setIsAiStylistOpen(false);
                                navigateTo('product', { productId: product.id });
                              }}
                              className="flex items-center gap-3 p-2 bg-[#FAF9F6] dark:bg-[#121318] rounded cursor-pointer hover:border-[#C5A880] border border-transparent transition-all"
                            >
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-10 h-12 object-cover rounded flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <h5 className="font-serif text-xs truncate font-medium">
                                  {product.name}
                                </h5>
                                <span className="font-serif text-[11px] text-[#C5A880]">
                                  {formatPrice(product.price)}
                                </span>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-[#8A857A]" />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-[#C5A880] text-black flex items-center justify-center flex-shrink-0 text-xs">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-[#8A857A] font-mono p-2">
                <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-ping" />
                <span>Atelier Stylist is analyzing tailoring archives...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions pills */}
          <div className="p-3 bg-[#EFECE5] dark:bg-[#15161C] border-t border-[#E8E4DA] dark:border-[#22242D] overflow-x-auto whitespace-nowrap flex gap-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="text-[10.5px] bg-[#FAF9F6] dark:bg-[#1E2028] text-[#484A56] dark:text-[#C7C9D6] hover:bg-[#C5A880] hover:text-black px-3 py-1.5 rounded-full transition-all border border-[#DDD8CE] dark:border-[#2C2E38] flex-shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input field */}
          <div className="p-4 bg-[#FAF9F6] dark:bg-[#101115] border-t border-[#E8E4DA] dark:border-[#22242D]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask stylist about silhouettes, pairings, care..."
                className="flex-1 bg-[#EFECE5] dark:bg-[#181920] text-xs px-4 py-3 rounded border border-[#DDD8CE] dark:border-[#282A36] focus:outline-none focus:border-[#C5A880]"
              />
              <button
                type="submit"
                className="bg-[#121316] hover:bg-[#C5A880] text-white hover:text-black px-4 py-3 rounded text-xs font-mono transition-colors flex items-center justify-center"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
