import React from 'react'
import { PRODUCTS } from '../data'
import styles from './Cart.module.css'

export default function Cart({ cart, onIncrease, onDecrease, onCheckout }) {
  const entries  = Object.entries(cart)
  const subtotal = entries.reduce((sum, [id, qty]) => {
    const p = PRODUCTS.find(x => x.id === Number(id))
    return sum + p.price * qty
  }, 0)
  const savings  = entries.reduce((sum, [id, qty]) => {
    const p = PRODUCTS.find(x => x.id === Number(id))
    return sum + (p.mrp - p.price) * qty
  }, 0)
  const totalItems = entries.reduce((s, [, q]) => s + q, 0)
  const delivery   = subtotal >= 299 ? 0 : 30
  const total      = subtotal + delivery

  return (
    <div className={styles.cartCard} id="cart-panel">
      <div className={styles.cartHeader}>
        <span className={styles.cartTitle}>🛒 My Cart</span>
        <span className={styles.cartCount}>{totalItems} items</span>
      </div>

      <div className={styles.cartBody}>
        {entries.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🛒</div>
            <div className={styles.emptyTitle}>Cart is empty</div>
            <div className={styles.emptySub}>Add products to get started!</div>
          </div>
        ) : (
          entries.map(([id, qty]) => {
            const p = PRODUCTS.find(x => x.id === Number(id))
            return (
              <div key={id} className={styles.cartItem}>
                <span className={styles.itemEmoji}>{p.emoji}</span>
                <div className={styles.itemInfo}>
                  <div className={styles.itemName}>{p.name}</div>
                  <div className={styles.itemPrice}>₹{p.price} × {qty} = <strong>₹{p.price * qty}</strong></div>
                </div>
                <div className={styles.itemQty}>
                  <button className={styles.qBtn} onClick={() => onDecrease(p.id)}>−</button>
                  <span>{qty}</span>
                  <button className={styles.qBtn} onClick={() => onIncrease(p.id)}>+</button>
                </div>
              </div>
            )
          })
        )}
      </div>

      {entries.length > 0 && (
        <div className={styles.cartFooter}>
          <div className={styles.row}><span>Subtotal</span><span>₹{subtotal}</span></div>
          <div className={styles.row}>
            <span>Delivery</span>
            <span style={{ color: '#10b981', fontWeight: 700 }}>{delivery === 0 ? '🎉 FREE' : `₹${delivery}`}</span>
          </div>
          {savings > 0 && (
            <div className={styles.row}><span>You save</span><span style={{ color: '#f43f5e', fontWeight: 700 }}>-₹{savings}</span></div>
          )}
          <div className={styles.divider} />
          <div className={`${styles.row} ${styles.total}`}><span>Total</span><span>₹{total}</span></div>
          {subtotal < 299 && (
            <div className={styles.freeDeliveryHint}>Add ₹{299 - subtotal} more for FREE delivery!</div>
          )}
          <button className={styles.checkoutBtn} onClick={() => onCheckout(total)}>
            🚀 Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  )
}


