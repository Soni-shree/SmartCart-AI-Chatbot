import React, { useState, useRef, useEffect } from 'react'
import styles from './Header.module.css'

const PROFILE_MENU = [
  { icon: '📦', label: 'Your Orders',   desc: 'Track & reorder' },
  { icon: '❤️', label: 'Wishlist',      desc: 'Saved products' },
  { icon: '🏠', label: 'Addresses',     desc: 'Manage delivery addresses' },
  { icon: '💸', label: 'Refunds',       desc: 'Refund status & history' },
  { icon: '🎧', label: 'Help & Support',desc: 'Chat, call or email us' },
]

export default function Header({ cartCount, search, onSearch, onCartClick, user, onLogout }) {
  const [profileOpen, setProfileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(null)
  const ref = useRef()

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setProfileOpen(false)
        setActiveSection(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header className={styles.header}>
      <div className={styles.banner}>
        🛵 Grand Opening! Get <span className={styles.bannerBadge}>FREE delivery</span> on orders above ₹299
      </div>
      <div className={styles.bar}>
        <div className={styles.logo}>
          <span>🛒</span> MemoMart
        </div>
        <div className={styles.deliveryInfo}>
          ⚡ <span className={styles.deliveryBadge}>8 mins</span>
        </div>
        <div className={styles.searchBox}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            id="search-input"
            type="text"
            placeholder="Search groceries, snacks, dairy..."
            value={search}
            onChange={e => onSearch(e.target.value)}
          />
          {search && (
            <button className={styles.clearBtn} onClick={() => onSearch('')}>✕</button>
          )}
        </div>

        {/* PROFILE */}
        <div className={styles.profileWrap} ref={ref}>
          <button className={styles.profileBtn} onClick={() => setProfileOpen(o => !o)}>
            <div className={styles.avatar}>U</div>
            <span className={styles.profileName}>Profile</span>
            <span className={styles.chevron}>{profileOpen ? '▲' : '▼'}</span>
          </button>

          {profileOpen && (
            <div className={styles.dropdown}>
              <div className={styles.dropHeader}>
                <div className={styles.dropAvatar}>U</div>
                <div>
                  <div className={styles.dropName}>Hello, {user?.name || "User"}! 👋</div>
                  <div className={styles.dropEmail}>user@memomart.in</div>
                </div>
              </div>
              <div className={styles.dropDivider} />
              {activeSection ? (
                <div className={styles.sectionView}>
                  <button className={styles.backBtn} onClick={() => setActiveSection(null)}>← Back</button>
                  <div className={styles.sectionTitle}>{activeSection.icon} {activeSection.label}</div>
                  {activeSection.label === 'Your Orders' && (
                    <div className={styles.emptySection}>
                      <div style={{fontSize:36}}>📦</div>
                      <div className={styles.emptySectionText}>No orders yet</div>
                      <div className={styles.emptySectionSub}>Start shopping to see your orders here!</div>
                    </div>
                  )}
                  {activeSection.label === 'Wishlist' && (
                    <div className={styles.emptySection}>
                      <div style={{fontSize:36}}>❤️</div>
                      <div className={styles.emptySectionText}>Wishlist is empty</div>
                      <div className={styles.emptySectionSub}>Save products you love!</div>
                    </div>
                  )}
                  {activeSection.label === 'Addresses' && (
                    <div>
                      <div className={styles.addressCard}>
                        <div className={styles.addressTag}>🏠 Home</div>
                        <div className={styles.addressText}>123, Anna Nagar, Chennai - 600040</div>
                      </div>
                      <button className={styles.addAddressBtn}>+ Add New Address</button>
                    </div>
                  )}
                  {activeSection.label === 'Refunds' && (
                    <div className={styles.emptySection}>
                      <div style={{fontSize:36}}>💸</div>
                      <div className={styles.emptySectionText}>No refunds</div>
                      <div className={styles.emptySectionSub}>All your refunds will appear here</div>
                    </div>
                  )}
                  {activeSection.label === 'Help & Support' && (
                    <div className={styles.supportList}>
                      <div className={styles.supportItem}>📞 Call us: <strong>1800-XXX-XXXX</strong></div>
                      <div className={styles.supportItem}>📧 Email: <strong>help@memomart.in</strong></div>
                      <div className={styles.supportItem}>💬 Live chat: <strong>Available 24/7</strong></div>
                    </div>
                  )}
                </div>
              ) : (
                <div className={styles.menuList}>
                  {PROFILE_MENU.map(item => (
                    <button key={item.label} className={styles.menuItem} onClick={() => setActiveSection(item)}>
                      <span className={styles.menuIcon}>{item.icon}</span>
                      <div>
                        <div className={styles.menuLabel}>{item.label}</div>
                        <div className={styles.menuDesc}>{item.desc}</div>
                      </div>
                      <span className={styles.menuArrow}>›</span>
                    </button>
                  ))}
                  <div className={styles.dropDivider} />
                  <button className={styles.logoutBtn} onClick={onLogout}>🚪 Logout</button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* CART */}
        <button className={styles.cartBtn} onClick={onCartClick}>
          🛒 Cart
          {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
        </button>
      </div>
    </header>
  )
}


