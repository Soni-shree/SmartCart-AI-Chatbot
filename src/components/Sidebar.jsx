import React from 'react'
import { CATEGORIES } from '../data'
import styles from './Sidebar.module.css'

export default function Sidebar({ active, onSelect }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.card}>
        <div className={styles.title}>Categories</div>
        {CATEGORIES.map(cat => (
          <div
            key={cat.name}
            className={`${styles.item} ${active === cat.name ? styles.active : ''}`}
            onClick={() => onSelect(cat.name)}
          >
            <span className={styles.icon}>{cat.emoji}</span>
            <span className={styles.label}>{cat.name}</span>
          </div>
        ))}
      </div>
    </aside>
  )
}