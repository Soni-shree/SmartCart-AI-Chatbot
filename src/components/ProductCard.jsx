import React from 'react'
import styles from './ProductCard.module.css'

export default function ProductCard({ product, qty, onAdd, onIncrease, onDecrease }) {
  return (
    <div className={styles.card}>
      {product.discount > 0 && (
        <div className={styles.discountBadge}>{product.discount}% OFF</div>
      )}
      <div className={styles.imgBox}>{product.emoji}</div>
      <div className={styles.name}>{product.name}</div>
      <div className={styles.qty}>{product.qty}</div>
      <div className={styles.footer}>
        <div>
          <div className={styles.price}>₹{product.price}</div>
          {product.discount > 0 && (
            <div className={styles.mrp}>₹{product.mrp}</div>
          )}
        </div>
        {qty === 0 ? (
          <button className={styles.addBtn} onClick={() => onAdd(product.id)}>
            + Add
          </button>
        ) : (
          <div className={styles.qtyControl}>
            <button className={styles.qtyBtn} onClick={() => onDecrease(product.id)}>−</button>
            <span className={styles.qtyNum}>{qty}</span>
            <button className={styles.qtyBtn} onClick={() => onIncrease(product.id)}>+</button>
          </div>
        )}
      </div>
    </div>
  )
}
