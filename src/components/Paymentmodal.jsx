import React, { useState } from 'react'
import { PRODUCTS } from '../data'
import styles from './PaymentModal.module.css'

const DEFAULT_ADDRESSES = [
  { id:1, tag:'🏠 Home',       address:'123, Anna Nagar West, Chennai - 600040',       default: true },
  { id:2, tag:'💼 Work',       address:'456, T. Nagar, Pondy Bazaar, Chennai - 600017', default: false },
  { id:3, tag:'👨‍👩‍👧 Parents',   address:'78, Adyar, ECR Road, Chennai - 600020',          default: false },
  { id:4, tag:'🏋️ Gym',        address:'12, Velachery Main Road, Chennai - 600042',     default: false },
  { id:5, tag:'🏨 Other',      address:'90, OMR Road, Sholinganallur, Chennai - 600119', default: false },
]

const PAYMENT_METHODS = [
  { id:'upi',  icon:'📱', label:'UPI',               desc:'GPay, PhonePe, Paytm, BHIM' },
  { id:'card', icon:'💳', label:'Credit / Debit Card',desc:'Visa, Mastercard, RuPay' },
  { id:'nb',   icon:'🏦', label:'Net Banking',        desc:'All major Indian banks' },
  { id:'wallet',icon:'👛',label:'Wallets',            desc:'Paytm, Amazon Pay, Freecharge' },
  { id:'cod',  icon:'💵', label:'Cash on Delivery',   desc:'Pay when your order arrives' },
]

export default function PaymentModal({ cart, total, onClose, onSuccess }) {
  const [step,         setStep]         = useState('address')
  const [selectedAddr, setSelectedAddr] = useState(1)
  const [selectedPay,  setSelectedPay]  = useState('upi')
  const [addingAddr,   setAddingAddr]   = useState(false)
  const [newAddr,      setNewAddr]      = useState({ tag:'', address:'' })
  const [addresses,    setAddresses]    = useState(DEFAULT_ADDRESSES)
  const [upiId,        setUpiId]        = useState('')
  const [cardNum,      setCardNum]      = useState('')
  const [cardName,     setCardName]     = useState('')
  const [expiry,       setExpiry]       = useState('')
  const [cvv,          setCvv]          = useState('')
  const [loading,      setLoading]      = useState(false)

  function handlePlaceOrder() {
    setLoading(true)
    setTimeout(() => { setLoading(false); setStep('success'); setTimeout(onSuccess, 3200) }, 1800)
  }

  function saveAddress() {
    if (!newAddr.tag.trim() || !newAddr.address.trim()) return
    const id = addresses.length + 1
    setAddresses(a => [...a, { id, tag: newAddr.tag, address: newAddr.address }])
    setSelectedAddr(id)
    setNewAddr({ tag:'', address:'' })
    setAddingAddr(false)
  }

  function formatCard(val) {
    return val.replace(/\D/g,'').slice(0,16).replace(/(\d{4})/g,'$1 ').trim()
  }
  function formatExpiry(val) {
    return val.replace(/\D/g,'').slice(0,4).replace(/(\d{2})(\d)/,'$1/$2')
  }

  const cartEntries = Object.entries(cart)

  if (step === 'success') return (
    <div className={styles.overlay}>
      <div className={styles.successBox}>
        <div className={styles.successAnim}>🎉</div>
        <div className={styles.successTitle}>Order Placed!</div>
        <div className={styles.successSub}>Your groceries are on the way 🛵</div>
        <div className={styles.successEta}>⚡ Estimated arrival: <strong>8 minutes</strong></div>
        <div className={styles.successAddr}>
          📍 {addresses.find(a=>a.id===selectedAddr)?.address}
        </div>
        <div className={styles.successId}>Order #MM{Math.floor(Math.random()*90000+10000)}</div>
      </div>
    </div>
  )

  return (
    <div className={styles.overlay} onClick={e => e.target===e.currentTarget && onClose()}>
      <div className={styles.modal}>

        {/* HEADER */}
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>
            {step==='address' && '📍 Delivery Address'}
            {step==='payment' && '💳 Payment Method'}
            {step==='confirm' && '✅ Confirm Order'}
          </div>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* STEP INDICATOR */}
        <div className={styles.steps}>
          {['address','payment','confirm'].map((s,i) => {
            const labels = ['Address','Payment','Confirm']
            const current = ['address','payment','confirm'].indexOf(step)
            return (
              <div key={s} className={`${styles.step} ${step===s?styles.activeStep:''} ${current>i?styles.doneStep:''}`}>
                <div className={styles.stepDot}>{current>i?'✓':i+1}</div>
                <div className={styles.stepLabel}>{labels[i]}</div>
                {i<2 && <div className={`${styles.stepLine} ${current>i?styles.stepLineDone:''}`}/>}
              </div>
            )
          })}
        </div>

        {/* BODY */}
        <div className={styles.modalBody}>

          {/* ── ADDRESS ── */}
          {step==='address' && (
            <div>
              <div className={styles.addrList}>
                {addresses.map(addr => (
                  <div
                    key={addr.id}
                    className={`${styles.addrCard} ${selectedAddr===addr.id?styles.selectedCard:''}`}
                    onClick={() => setSelectedAddr(addr.id)}
                  >
                    <div className={styles.addrRadio}>
                      <div className={`${styles.radioCircle} ${selectedAddr===addr.id?styles.radioSelected:''}`}>
                        {selectedAddr===addr.id && <div className={styles.radioDot}/>}
                      </div>
                    </div>
                    <div className={styles.addrContent}>
                      <div className={styles.addrTag}>{addr.tag}</div>
                      <div className={styles.addrText}>{addr.address}</div>
                    </div>
                    {addr.default && <span className={styles.defaultBadge}>Default</span>}
                  </div>
                ))}
              </div>

              {addingAddr ? (
                <div className={styles.addAddrForm}>
                  <div className={styles.fieldRow}>
                    <label className={styles.fieldLabel}>Label</label>
                    <input className={styles.addrInput} placeholder="e.g. 🏠 Home, 💼 Work, 👨‍👩‍👧 Family" value={newAddr.tag} onChange={e=>setNewAddr(a=>({...a,tag:e.target.value}))}/>
                  </div>
                  <div className={styles.fieldRow}>
                    <label className={styles.fieldLabel}>Full Address</label>
                    <textarea className={styles.addrTextarea} rows={3} placeholder="Door no, Street, Area, City, Pincode" value={newAddr.address} onChange={e=>setNewAddr(a=>({...a,address:e.target.value}))}/>
                  </div>
                  <div className={styles.addrBtns}>
                    <button className={styles.saveAddrBtn} onClick={saveAddress}>💾 Save Address</button>
                    <button className={styles.cancelBtn} onClick={()=>setAddingAddr(false)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <button className={styles.addAddrBtn} onClick={()=>setAddingAddr(true)}>+ Add New Address</button>
              )}
            </div>
          )}

          {/* ── PAYMENT ── */}
          {step==='payment' && (
            <div>
              {PAYMENT_METHODS.map(pm => (
                <div key={pm.id} className={`${styles.payCard} ${selectedPay===pm.id?styles.selectedCard:''}`} onClick={()=>setSelectedPay(pm.id)}>
                  <div className={styles.payIcon}>{pm.icon}</div>
                  <div className={styles.payInfo}>
                    <div className={styles.payLabel}>{pm.label}</div>
                    <div className={styles.payDesc}>{pm.desc}</div>
                  </div>
                  <div className={styles.radioCircle} style={{flexShrink:0}}>
                    {selectedPay===pm.id && <><div className={styles.radioCircle} style={{border:'2px solid #0ea5e9'}}><div className={styles.radioDot}/></div></>}
                    {selectedPay!==pm.id && <div className={styles.radioCircle}/>}
                  </div>
                </div>
              ))}

              {selectedPay==='upi' && (
                <div className={styles.payDetail}>
                  <label className={styles.fieldLabel}>UPI ID</label>
                  <input className={styles.payInput} placeholder="yourname@okaxis / @ybl / @paytm" value={upiId} onChange={e=>setUpiId(e.target.value)}/>
                  <div className={styles.upiLogos}>
                    {['GPay','PhonePe','Paytm','BHIM'].map(u=>(
                      <span key={u} className={styles.upiChip}>{u}</span>
                    ))}
                  </div>
                </div>
              )}

              {selectedPay==='card' && (
                <div className={styles.payDetail}>
                  <label className={styles.fieldLabel}>Card Number</label>
                  <input className={styles.payInput} placeholder="1234 5678 9012 3456" maxLength={19} value={cardNum} onChange={e=>setCardNum(formatCard(e.target.value))}/>
                  <label className={styles.fieldLabel} style={{marginTop:10}}>Cardholder Name</label>
                  <input className={styles.payInput} placeholder="Name as on card" value={cardName} onChange={e=>setCardName(e.target.value)}/>
                  <div style={{display:'flex',gap:12,marginTop:10}}>
                    <div style={{flex:1}}>
                      <label className={styles.fieldLabel}>Expiry</label>
                      <input className={styles.payInput} placeholder="MM/YY" maxLength={5} value={expiry} onChange={e=>setExpiry(formatExpiry(e.target.value))}/>
                    </div>
                    <div style={{flex:1}}>
                      <label className={styles.fieldLabel}>CVV</label>
                      <input className={styles.payInput} placeholder="•••" maxLength={3} type="password" value={cvv} onChange={e=>setCvv(e.target.value)}/>
                    </div>
                  </div>
                </div>
              )}

              {selectedPay==='nb' && (
                <div className={styles.payDetail}>
                  <label className={styles.fieldLabel}>Select Bank</label>
                  <select className={styles.payInput} style={{cursor:'pointer'}}>
                    {['SBI','HDFC Bank','ICICI Bank','Axis Bank','Kotak Bank','Bank of Baroda','Punjab National Bank','Canara Bank'].map(b=>(
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </div>
              )}

              {selectedPay==='wallet' && (
                <div className={styles.payDetail}>
                  <label className={styles.fieldLabel}>Select Wallet</label>
                  <div style={{display:'flex',gap:10,flexWrap:'wrap',marginTop:4}}>
                    {['Paytm','Amazon Pay','Freecharge','Mobikwik','Airtel Money'].map(w=>(
                      <span key={w} className={styles.upiChip} style={{cursor:'pointer',padding:'8px 16px'}}>{w}</span>
                    ))}
                  </div>
                </div>
              )}

              {selectedPay==='cod' && (
                <div className={styles.codNote}>
                  💵 Pay <strong>₹{total}</strong> in cash when your order arrives at your doorstep. No extra charges!
                </div>
              )}
            </div>
          )}

          {/* ── CONFIRM ── */}
          {step==='confirm' && (
            <div>
              <div className={styles.confirmSection}>
                <div className={styles.confirmLabel}>📍 Delivery Address</div>
                <div className={styles.confirmTag}>{addresses.find(a=>a.id===selectedAddr)?.tag}</div>
                <div className={styles.confirmValue}>{addresses.find(a=>a.id===selectedAddr)?.address}</div>
              </div>
              <div className={styles.confirmSection}>
                <div className={styles.confirmLabel}>💳 Payment</div>
                <div className={styles.confirmValue}>{PAYMENT_METHODS.find(p=>p.id===selectedPay)?.icon} {PAYMENT_METHODS.find(p=>p.id===selectedPay)?.label}</div>
              </div>
              <div className={styles.confirmSection}>
                <div className={styles.confirmLabel}>🛒 Order Items</div>
                {cartEntries.map(([id,qty]) => {
                  const p = PRODUCTS.find(x=>x.id===Number(id))
                  return (
                    <div key={id} className={styles.orderItem}>
                      <span>{p.emoji} {p.name} × {qty}</span>
                      <span style={{fontWeight:700}}>₹{p.price*qty}</span>
                    </div>
                  )
                })}
                <div className={styles.orderDivider}/>
                <div className={styles.orderTotal}><span>Total Amount</span><span>₹{total}</span></div>
                <div className={styles.deliveryNote}>⚡ Estimated delivery: <strong>8 minutes</strong></div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className={styles.modalFooter}>
          {step!=='address' && (
            <button className={styles.backBtn} onClick={()=>setStep(step==='payment'?'address':'payment')}>← Back</button>
          )}
          {step==='address' && <button className={styles.nextBtn} onClick={()=>setStep('payment')}>Continue to Payment →</button>}
          {step==='payment' && <button className={styles.nextBtn} onClick={()=>setStep('confirm')}>Review Order →</button>}
          {step==='confirm' && (
            <button className={styles.placeBtn} onClick={handlePlaceOrder} disabled={loading}>
              {loading ? <><span className={styles.spinner}/> Processing...</> : `🚀 Place Order · ₹${total}`}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

