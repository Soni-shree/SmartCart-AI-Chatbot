import React, { useState, useEffect } from 'react'
import styles from './LandingPage.module.css'

const FEATURES = [
  { icon: '⚡', title: '8-Min Delivery', desc: 'From dark store to your door in minutes' },
  { icon: '🥬', title: '100% Fresh', desc: 'Farm-fresh produce every single morning' },
  { icon: '💰', title: 'Best Prices', desc: 'Up to 28% off on thousands of products' },
  { icon: '🔄', title: 'Easy Returns', desc: 'Not happy? Instant refund, no questions' },
]

const CATEGORIES = [
  { emoji: '🥦', name: 'Vegetables' },
  { emoji: '🍎', name: 'Fruits' },
  { emoji: '🥛', name: 'Dairy' },
  { emoji: '🍿', name: 'Snacks' },
  { emoji: '🧃', name: 'Beverages' },
  { emoji: '🌾', name: 'Staples' },
]

const STATS = [
  { num: '8', unit: 'min', label: 'Avg. delivery' },
  { num: '37+', unit: '', label: 'Products' },
  { num: '100%', unit: '', label: 'Fresh guarantee' },
  { num: '24/7', unit: '', label: 'Support' },
]

const PHONE_PRODUCTS = [
  { emoji: '🍅', name: 'Tomatoes', price: '₹29' },
  { emoji: '🥛', name: 'Milk',     price: '₹30' },
  { emoji: '🍌', name: 'Bananas',  price: '₹39' },
  { emoji: '🥚', name: 'Eggs',     price: '₹79' },
]

const EMOJIS = ['🥬','🍅','🥛','🍌','🥕','🍞']

export default function LandingPage({ onGetStarted, onLogin }) {
  const [visible,     setVisible]     = useState(false)
  const [activeEmoji, setActiveEmoji] = useState(0)
  const [addedIdx,    setAddedIdx]    = useState(null)
  const [cartCount,   setCartCount]   = useState(2)
  const [blink,       setBlink]       = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
    const emojiTimer = setInterval(() => setActiveEmoji(e => (e + 1) % EMOJIS.length), 1600)
    const blinkTimer = setInterval(() => { setBlink(true); setTimeout(() => setBlink(false), 200) }, 3000)
    return () => { clearInterval(emojiTimer); clearInterval(blinkTimer) }
  }, [])

  function handlePhoneAdd(i) {
    setAddedIdx(i)
    setCartCount(c => c + 1)
    setTimeout(() => setAddedIdx(null), 1000)
  }

  return (
    <div className={styles.landing}>

      {/* NAV */}
      <nav className={`${styles.nav} ${visible ? styles.navVisible : ''}`}>
        <div className={styles.navLogo}>🛒 MemoMart</div>
        <div className={styles.navLinks}>
          <button className={styles.navLoginBtn}  onClick={onLogin}>Login</button>
          <button className={styles.navSignupBtn} onClick={onGetStarted}>Get Started</button>
        </div>
      </nav>

      {/* HERO */}
      <section className={styles.hero}>

        {/* LEFT */}
        <div className={`${styles.heroLeft} ${visible ? styles.heroLeftVisible : ''}`}>
          <div className={styles.heroBadge}>⚡ India's Fastest Grocery App</div>
          <h1 className={styles.heroTitle}>
            Groceries Delivered in
            <span className={styles.heroHighlight}> 8 Minutes</span>
          </h1>
          <p className={styles.heroDesc}>
            From farm-fresh vegetables to daily essentials — get everything
            delivered lightning-fast at the best prices guaranteed.
          </p>
          <div className={styles.heroActions}>
            <button className={styles.heroBtn}          onClick={onGetStarted}>🛒 Start Shopping</button>
            <button className={styles.heroSecondaryBtn} onClick={onLogin}>Login →</button>
          </div>
          <div className={styles.heroStats}>
            {STATS.map((s, i) => (
              <div key={i} className={styles.statItem}>
                <div className={styles.statNum}>{s.num}<span className={styles.statUnit}>{s.unit}</span></div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — single iPhone frame */}
        <div className={`${styles.heroRight} ${visible ? styles.heroRightVisible : ''}`}>

          {/* iPhone shell */}
          <div className={styles.iphone}>

            {/* notch */}
            <div className={styles.notch}>
              <div className={styles.notchCamera}/>
              <div className={styles.notchSpeaker}/>
            </div>

            {/* ── SCREEN CONTENT ── */}
            <div className={styles.screen}>

              {/* App header bar */}
              <div className={styles.appBar}>
                <span className={styles.appBarLogo}>🛒 MemoMart</span>
                <span className={styles.appBarBadge}>⚡ 8 min</span>
              </div>

              {/* ── CUTE AVATAR SECTION ── */}
              <div className={styles.avatarSection}>
                <svg viewBox="0 0 110 110" width="90" height="90" xmlns="http://www.w3.org/2000/svg">
                  {/* Hair back */}
                  <ellipse cx="55" cy="44" rx="38" ry="36" fill="#c07a3a"/>
                  {/* Head */}
                  <ellipse cx="55" cy="58" rx="34" ry="36" fill="#fde7c8"/>
                  {/* Hair top */}
                  <ellipse cx="55" cy="26" rx="34" ry="20" fill="#a0522d"/>
                  {/* Side hair */}
                  <rect x="18" y="40" width="8" height="30" rx="4" fill="#a0522d"/>
                  <rect x="84" y="40" width="8" height="30" rx="4" fill="#a0522d"/>
                  {/* Ears */}
                  <ellipse cx="21" cy="62" rx="7" ry="9" fill="#fde7c8"/>
                  <ellipse cx="89" cy="62" rx="7" ry="9" fill="#fde7c8"/>
                  <ellipse cx="21" cy="62" rx="4" ry="6" fill="#f5c8a0"/>
                  <ellipse cx="89" cy="62" rx="4" ry="6" fill="#f5c8a0"/>
                  {/* Cheeks */}
                  <ellipse cx="36" cy="71" rx="9" ry="6" fill="#f9a8b8" opacity="0.55"/>
                  <ellipse cx="74" cy="71" rx="9" ry="6" fill="#f9a8b8" opacity="0.55"/>
                  {/* Eyes white */}
                  <ellipse cx="43" cy="56" rx="7" ry={blink ? 1.5 : 8} fill="#fff"/>
                  <ellipse cx="67" cy="56" rx="7" ry={blink ? 1.5 : 8} fill="#fff"/>
                  {/* Pupils */}
                  {!blink && <>
                    <circle cx="44.5" cy="57" r="4.5" fill="#3b1f0a"/>
                    <circle cx="68.5" cy="57" r="4.5" fill="#3b1f0a"/>
                    {/* Shine */}
                    <circle cx="46"   cy="54.5" r="1.8" fill="#fff"/>
                    <circle cx="70"   cy="54.5" r="1.8" fill="#fff"/>
                  </>}
                  {/* Eyebrows */}
                  <path d="M37 47 Q43 43 49 47" stroke="#7b4a1e" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                  <path d="M61 47 Q67 43 73 47" stroke="#7b4a1e" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                  {/* Nose */}
                  <ellipse cx="55" cy="67" rx="3.5" ry="2.5" fill="#e8a87c" opacity="0.5"/>
                  {/* Smile */}
                  <path d="M43 78 Q55 90 67 78" stroke="#d4714e" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  {/* Teeth */}
                  <path d="M47 79 Q55 86 63 79" fill="#fff" opacity="0.7"/>
                  {/* Chef hat */}
                  <rect x="26" y="14" width="58" height="12" rx="5" fill="#fff" stroke="#bae6fd" strokeWidth="1.5"/>
                  <ellipse cx="55" cy="12" rx="20" ry="13" fill="#fff" stroke="#bae6fd" strokeWidth="1.5"/>
                  {/* Hat stripe */}
                  <rect x="26" y="21" width="58" height="4" rx="2" fill="#e0f2fe"/>
                  {/* Cart icon on hat */}
                  <text x="47" y="18" fontSize="10" fill="#0ea5e9">🛒</text>
                </svg>

                <div className={styles.speechBubble}>
                  Hi! Shop fresh 👋
                </div>
              </div>

              {/* Rotating banner */}
              <div className={styles.banner}>
                <div>
                  <div className={styles.bannerTitle}>Fresh today!</div>
                  <div className={styles.bannerSub}>Best prices ✨</div>
                </div>
                <div className={styles.bannerEmoji}>{EMOJIS[activeEmoji]}</div>
              </div>

              {/* Product grid */}
              <div className={styles.prodGrid}>
                {PHONE_PRODUCTS.map((p, i) => (
                  <div
                    key={i}
                    className={`${styles.prodCard} ${addedIdx === i ? styles.prodCardAdded : ''}`}
                  >
                    <div className={styles.prodEmoji}>{p.emoji}</div>
                    <div className={styles.prodName}>{p.name}</div>
                    <div className={styles.prodPrice}>{p.price}</div>
                    <button
                      className={`${styles.prodAddBtn} ${addedIdx === i ? styles.prodAddBtnDone : ''}`}
                      onClick={() => handlePhoneAdd(i)}
                    >
                      {addedIdx === i ? '✓' : '+'}
                    </button>
                  </div>
                ))}
              </div>

              {/* Cart bar */}
              <div className={styles.cartBar}>
                <span>🛒 {cartCount} items</span>
                <span className={styles.cartBarBtn}>Checkout →</span>
              </div>

            </div>{/* end screen */}

            {/* home button */}
            <div className={styles.homeBtn}/>

          </div>{/* end iphone */}

          {/* floating badges */}
          <div className={styles.badge1}>🎉 Free delivery!</div>
          <div className={styles.badge2}>⭐ 4.9 rated</div>
          <div className={styles.badge3}>🔥 28% off</div>

        </div>{/* end heroRight */}
      </section>

      {/* FEATURES */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Why choose MemoMart?</h2>
        <div className={styles.featuresGrid}>
          {FEATURES.map((f, i) => (
            <div key={i} className={styles.featureCard} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <div className={styles.featureTitle}>{f.title}</div>
              <div className={styles.featureDesc}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className={styles.catsSection}>
        <h2 className={styles.sectionTitle}>Shop by Category</h2>
        <div className={styles.catsGrid}>
          {CATEGORIES.map((c, i) => (
            <div key={i} className={styles.catCard} onClick={onGetStarted} style={{ animationDelay: `${i * 0.08}s` }}>
              <div className={styles.catEmoji}>{c.emoji}</div>
              <div className={styles.catName}>{c.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaBox}>
          <h2 className={styles.ctaTitle}>Ready to shop smarter? 🚀</h2>
          <p className={styles.ctaDesc}>Join thousands of happy customers getting groceries in minutes.</p>
          <button className={styles.ctaBtn} onClick={onGetStarted}>Get Started — It's Free 🛒</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerLogo}>🛒 MemoMart</div>
        <div className={styles.footerText}>© 2026 MemoMart. Fresh groceries, lightning fast.</div>
      </footer>
    </div>
  )
}


