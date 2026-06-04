import React, { useState, useRef, useEffect } from 'react'
import { PRODUCTS } from '../data'
import styles from './Chatbot.module.css'

const BOT_RULES = [
  { keys: ['hello','hi','hey','namaste'], reply: "👋 Hi! I'm MemoBot. Ask me about products, offers, delivery or anything!", products: [] },
  { keys: ['fruit','vegetable','tomato','banana','onion','potato','carrot','spinach','apple'], reply: "🥦 Here are our fresh Fruits & Vegetables!", products: PRODUCTS.filter(p => p.cat === 'Fruits & Vegetables') },
  { keys: ['milk','dairy','egg','butter','paneer','curd'], reply: "🥛 Fresh Dairy & Eggs available!", products: PRODUCTS.filter(p => p.cat === 'Dairy & Eggs') },
  { keys: ['snack','chips','biscuit','namkeen','popcorn'], reply: "🍿 Tasty Snacks for you!", products: PRODUCTS.filter(p => p.cat === 'Snacks') },
  { keys: ['drink','beverage','juice','cola','tea','coffee'], reply: "🧃 Refreshing Beverages!", products: PRODUCTS.filter(p => p.cat === 'Beverages') },
  { keys: ['rice','dal','atta','grain','flour','poha'], reply: "🌾 Grains & Staples for daily cooking!", products: PRODUCTS.filter(p => p.cat === 'Grains & Staples') },
  { keys: ['bread','bakery','croissant'], reply: "🍞 Fresh Bakery items!", products: PRODUCTS.filter(p => p.cat === 'Bakery') },
  { keys: ['oil','ketchup','sauce','condiment'], reply: "🫙 Oils & Condiments!", products: PRODUCTS.filter(p => p.cat === 'Oils & Condiments') },
  { keys: ['shampoo','soap','toothpaste','personal','care'], reply: "🧴 Personal Care products!", products: PRODUCTS.filter(p => p.cat === 'Personal Care') },
  { keys: ['cleaner','household','dish','broom'], reply: "🧹 Household essentials!", products: PRODUCTS.filter(p => p.cat === 'Household') },
  { keys: ['frozen','fries','peas'], reply: "❄️ Frozen & Ready to cook!", products: PRODUCTS.filter(p => p.cat === 'Frozen & Ready') },
  { keys: ['baby','cereal','kid'], reply: "👶 Baby & Kids products!", products: PRODUCTS.filter(p => p.cat === 'Baby & Kids') },
  { keys: ['pet','dog','cat','food'], reply: "🐾 Pet Care products!", products: PRODUCTS.filter(p => p.cat === 'Pet Care') },
  { keys: ['cheap','discount','offer','sale','deal'], reply: "🔥 Best deals today!", products: PRODUCTS.filter(p => p.discount >= 18) },
  { keys: ['delivery','time','fast','when'], reply: "⚡ We deliver in just 8 minutes! FREE delivery above ₹299.", products: [] },
  { keys: ['pay','upi','cod','payment'], reply: "💳 We accept UPI, Cards and Cash on Delivery!", products: [] },
  { keys: ['return','refund'], reply: "✅ 100% fresh guarantee! Wrong item? We refund instantly.", products: [] },
  { keys: ['thank','thanks'], reply: "😊 Happy shopping at MemoMart!", products: [] },
]

function getBotReply(msg) {
  const lower = msg.toLowerCase()
  for (const rule of BOT_RULES) {
    if (rule.keys.some(k => lower.includes(k))) return rule
  }
  return { reply: "🤔 Try asking about: vegetables, dairy, snacks, delivery, offers or payments!", products: [] }
}

export default function Chatbot({ onAddToCart }) {
  const [open, setOpen]         = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: "👋 Hi! I'm MemoBot. Ask me about products — try typing 'fruits', 'snacks', 'dairy' and I'll show you what we have!", products: [] }
  ])
  const [input, setInput]       = useState('')
  const [typing, setTyping]     = useState(false)
  const bottomRef               = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  function send() {
    const msg = input.trim()
    if (!msg) return
    setInput('')
    setMessages(prev => [...prev, { from: 'user', text: msg, products: [] }])
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      const result = getBotReply(msg)
      setMessages(prev => [...prev, { from: 'bot', text: result.reply, products: result.products }])
    }, 700)
  }

  return (
    <>
      <button className={styles.toggle} onClick={() => setOpen(o => !o)} title="Chat with MemoBot">
        {open ? '✕' : '💬'}
      </button>

      {open && (
        <div className={styles.window}>
          <div className={styles.head}>
            <div className={styles.avatar}>🤖</div>
            <div>
              <div className={styles.botName}>MemoBot</div>
              <div className={styles.botStatus}>● Online — Ask me anything!</div>
            </div>
            <button className={styles.close} onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className={styles.messages}>
            {messages.map((m, i) => (
              <div key={i}>
                <div className={`${styles.msg} ${m.from === 'bot' ? styles.bot : styles.user}`}>
                  {m.text}
                </div>
                {m.products && m.products.length > 0 && (
                  <div className={styles.productList}>
                    {m.products.slice(0, 4).map(p => (
                      <div key={p.id} className={styles.productChip}>
                        <span className={styles.chipEmoji}>{p.emoji}</span>
                        <div className={styles.chipInfo}>
                          <div className={styles.chipName}>{p.name}</div>
                          <div className={styles.chipPrice}>₹{p.price}
                            {p.discount > 0 && <span className={styles.chipDiscount}> {p.discount}% off</span>}
                          </div>
                        </div>
                        <button
                          className={styles.chipAddBtn}
                          onClick={() => { onAddToCart(p.id); setOpen(false) }}
                        >
                          + Add
                        </button>
                      </div>
                    ))}
                    {m.products.length > 4 && (
                      <div className={styles.moreProducts}>+{m.products.length - 4} more products available</div>
                    )}
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className={`${styles.msg} ${styles.bot}`}>
                <span className={styles.dot} /><span className={styles.dot} /><span className={styles.dot} />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className={styles.quickBtns}>
            {['🥦 Fruits', '🥛 Dairy', '🍿 Snacks', '🔥 Deals'].map(q => (
              <button key={q} className={styles.quickBtn} onClick={() => {
                setInput(q.split(' ')[1])
                setTimeout(() => {
                  const msg = q.split(' ')[1]
                  setMessages(prev => [...prev, { from: 'user', text: msg, products: [] }])
                  setTyping(true)
                  setTimeout(() => {
                    setTyping(false)
                    const result = getBotReply(msg)
                    setMessages(prev => [...prev, { from: 'bot', text: result.reply, products: result.products }])
                  }, 600)
                }, 100)
              }}>{q}</button>
            ))}
          </div>

          <div className={styles.inputRow}>
            <input
              className={styles.chatInput}
              placeholder="Type 'fruits', 'snacks'..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
            />
            <button className={styles.sendBtn} onClick={send}>➤</button>
          </div>
        </div>
      )}
    </>
  )
}

