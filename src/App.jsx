import React, { useState, useMemo } from 'react'
import LandingPage   from './components/LandingPage'
import AuthPage      from './components/AuthPage'
import Header        from './components/Header'
import Sidebar       from './components/Sidebar'
import ProductCard   from './components/ProductCard'
import Cart          from './components/Cart'
import Chatbot       from './components/Chatbot'
import Toast         from './components/Toast'
import PaymentModal  from './components/PaymentModal'
import { PRODUCTS, CATEGORIES } from './data'
import styles from './App.module.css'

export default function App() {
  const [page,     setPage]     = useState('landing') // landing | auth | shop
  const [user,     setUser]     = useState(null)
  const [search,   setSearch]   = useState('')
  const [category, setCategory] = useState('All')
  const [cart,     setCart]     = useState({})
  const [toast,    setToast]    = useState('')
  const [payment,  setPayment]  = useState(false)
  const [total,    setTotal]    = useState(0)

  const filtered = useMemo(() => {
    let list = PRODUCTS
    if (category !== 'All') list = list.filter(p => p.cat === category)
    if (search.trim()) list = list.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.cat.toLowerCase().includes(search.toLowerCase())
    )
    return list
  }, [category, search])

  const totalItems = Object.values(cart).reduce((s, q) => s + q, 0)

  function addToCart(id) {
    setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }))
    setToast('Added to cart! 🛒')
  }
  function increaseQty(id) { setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 })) }
  function decreaseQty(id) {
    setCart(c => {
      const next = { ...c, [id]: (c[id] || 0) - 1 }
      if (next[id] <= 0) delete next[id]
      return next
    })
  }

  function handleCheckout(amt) {
    if (!user) { setPage('auth'); return }
    setTotal(amt)
    setPayment(true)
  }

  function handleLogin(userData) {
    setUser(userData)
    setPage('shop')
    setToast(`Welcome, ${userData.name}! 👋`)
  }

  const catObj = CATEGORIES.find(c => c.name === category)

  if (page === 'landing') {
    return (
      <LandingPage
        onGetStarted={() => setPage('auth')}
        onLogin={() => setPage('auth')}
      />
    )
  }

  if (page === 'auth') {
    return <AuthPage onLogin={handleLogin} />
  }

  return (
    <>
      <Header
        user={user}
        cartCount={totalItems}
        search={search}
        onSearch={q => { setSearch(q); setCategory('All') }}
        onCartClick={() => document.getElementById('cart-panel')?.scrollIntoView({ behavior: 'smooth' })}
        onLogout={() => { setUser(null); setPage('landing'); setCart({}) }}
      />

      <div className={styles.layout}>
        <Sidebar active={category} onSelect={cat => { setCategory(cat); setSearch('') }} />

        <main className={styles.main}>
          <div className={styles.hero}>
            <div>
              <div className={styles.heroTitle}>Fresh Groceries ⚡<br />In 8 Minutes Flat</div>
              <div className={styles.heroSub}>37 products · Best prices · FREE delivery above ₹299</div>
              <button className={styles.heroBtn} onClick={() => document.getElementById('search-input')?.focus()}>
                Shop Now →
              </button>
            </div>
            <div className={styles.heroEmoji}>🥬</div>
          </div>

          <div className={styles.offersStrip}>
            {['🍅 Farm-fresh veggies','🥛 Daily dairy','⚡ 8-min delivery','💳 UPI & COD','✅ Fresh guarantee','🎉 Free delivery ₹299+'].map((t,i)=>(
              <span key={i} className={styles.offerChip}>{t}</span>
            ))}
          </div>

          <div className={styles.sectionTitle}>
            {catObj?.emoji} {category === 'All' ? '🌟 All Products' : category}
            <span className={styles.productCount}>{filtered.length} items</span>
          </div>

          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>🔍</div>
              <div className={styles.emptyTitle}>No products found</div>
              <div className={styles.emptySub}>Try a different search or category</div>
            </div>
          ) : (
            <div className={styles.grid}>
              {filtered.map(p => (
                <ProductCard key={p.id} product={p} qty={cart[p.id]||0}
                  onAdd={addToCart} onIncrease={increaseQty} onDecrease={decreaseQty} />
              ))}
            </div>
          )}
        </main>

        <div className={styles.cartPanel} id="cart-panel">
          <Cart cart={cart} onIncrease={increaseQty} onDecrease={decreaseQty} onCheckout={handleCheckout} />
        </div>
      </div>

      <Chatbot onAddToCart={addToCart} />
      <Toast message={toast} onClose={() => setToast('')} />

      {payment && (
        <PaymentModal
          cart={cart}
          total={total}
          onClose={() => setPayment(false)}
          onSuccess={() => {
            setPayment(false)
            setCart({})
            setToast('🎉 Order placed! Arriving in 8 minutes.')
          }}
        />
      )}
    </>
  )
}



