import React, { useEffect } from 'react'

export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return
    const t = setTimeout(onClose, 2200)
    return () => clearTimeout(t)
  }, [message])

  if (!message) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '100px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#1a1a2e',
      color: '#fff',
      padding: '11px 26px',
      borderRadius: '30px',
      fontSize: '14px',
      fontWeight: '700',
      zIndex: 2000,
      pointerEvents: 'none',
      whiteSpace: 'nowrap',
      boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    }}>
      {message}
    </div>
  )
}
