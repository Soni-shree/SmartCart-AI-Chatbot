import React, { useState } from 'react'
import styles from './AuthPage.module.css'

export default function AuthPage({ onLogin }) {
  const [mode, setMode]         = useState('login') // login | signup | otp
  const [form, setForm]         = useState({ name: '', email: '', phone: '', password: '' })
  const [otp, setOtp]           = useState(['','','','','',''])
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [otpSent, setOtpSent]   = useState(false)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  function handleOtpChange(i, val) {
    if (!/^\d?$/.test(val)) return
    const next = [...otp]
    next[i] = val
    setOtp(next)
    if (val && i < 5) document.getElementById(`otp-${i+1}`)?.focus()
  }

  function validate() {
    if (mode === 'login') {
      if (!form.email && !form.phone) return 'Enter email or phone number'
      if (!form.password) return 'Enter your password'
    } else {
      if (!form.name) return 'Enter your name'
      if (!form.email) return 'Enter your email'
      if (!form.phone || form.phone.length < 10) return 'Enter a valid 10-digit phone number'
      if (!form.password || form.password.length < 6) return 'Password must be at least 6 characters'
    }
    return ''
  }

  function handleSubmit() {
    const err = validate()
    if (err) { setError(err); return }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (mode === 'login') {
        onLogin({ name: form.email.split('@')[0] || 'User', email: form.email, phone: form.phone })
      } else {
        setMode('otp')
        setOtpSent(true)
      }
    }, 1200)
  }

  function handleOtpVerify() {
    const code = otp.join('')
    if (code.length < 6) { setError('Enter the 6-digit OTP'); return }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onLogin({ name: form.name, email: form.email, phone: form.phone })
    }, 1000)
  }

  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <div className={styles.leftContent}>
          <div className={styles.leftLogo}>🛒 MemoMart</div>
          <h1 className={styles.leftTitle}>Fresh groceries, delivered in <span>8 minutes</span></h1>
          <p className={styles.leftDesc}>Join thousands of happy customers who shop smarter every day.</p>
          <div className={styles.leftFeatures}>
            {['⚡ 8-minute delivery', '🥬 100% fresh produce', '💰 Best prices guaranteed', '🔄 Easy returns & refunds'].map((f,i) => (
              <div key={i} className={styles.leftFeature}>{f}</div>
            ))}
          </div>
          <div className={styles.leftEmojis}>
            {['🍅','🥛','🥦','🍌','🥚','🍞'].map((e,i) => (
              <span key={i} className={styles.floatingEmoji} style={{ animationDelay: `${i*0.4}s` }}>{e}</span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.card}>
          {mode !== 'otp' ? (
            <>
              <div className={styles.cardTitle}>{mode === 'login' ? 'Welcome back! 👋' : 'Create account 🚀'}</div>
              <div className={styles.cardSub}>{mode === 'login' ? 'Login to continue shopping' : 'Sign up and start shopping'}</div>

              <div className={styles.tabs}>
                <button className={`${styles.tab} ${mode==='login'?styles.activeTab:''}`} onClick={() => { setMode('login'); setError('') }}>Login</button>
                <button className={`${styles.tab} ${mode==='signup'?styles.activeTab:''}`} onClick={() => { setMode('signup'); setError('') }}>Sign Up</button>
              </div>

              <div className={styles.form}>
                {mode === 'signup' && (
                  <div className={styles.field}>
                    <label className={styles.label}>Full Name</label>
                    <input className={styles.input} name="name" placeholder="Enter your full name" value={form.name} onChange={handleChange} />
                  </div>
                )}
                <div className={styles.field}>
                  <label className={styles.label}>Email Address</label>
                  <input className={styles.input} name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
                </div>
                {mode === 'signup' && (
                  <div className={styles.field}>
                    <label className={styles.label}>Phone Number</label>
                    <div className={styles.phoneRow}>
                      <span className={styles.countryCode}>🇮🇳 +91</span>
                      <input className={styles.phoneInput} name="phone" type="tel" placeholder="10-digit number" maxLength={10} value={form.phone} onChange={handleChange} />
                    </div>
                  </div>
                )}
                <div className={styles.field}>
                  <label className={styles.label}>Password</label>
                  <input className={styles.input} name="password" type="password" placeholder={mode === 'login' ? 'Your password' : 'Min 6 characters'} value={form.password} onChange={handleChange} />
                </div>

                {error && <div className={styles.error}>⚠️ {error}</div>}

                <button className={styles.submitBtn} onClick={handleSubmit} disabled={loading}>
                  {loading ? <span className={styles.spinner} /> : (mode === 'login' ? 'Login →' : 'Send OTP →')}
                </button>

                {mode === 'login' && (
                  <div className={styles.divider}><span>or</span></div>
                )}

                {mode === 'login' && (
                  <button className={styles.guestBtn} onClick={() => onLogin({ name: 'Guest', email: '', phone: '' })}>
                    Continue as Guest →
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <div className={styles.otpHeader}>
                <div className={styles.otpIcon}>📱</div>
                <div className={styles.cardTitle}>Verify OTP</div>
                <div className={styles.cardSub}>We sent a 6-digit code to <strong>{form.phone ? `+91 ${form.phone}` : form.email}</strong></div>
              </div>

              <div className={styles.otpBoxes}>
                {otp.map((val, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    className={styles.otpBox}
                    maxLength={1}
                    value={val}
                    onChange={e => handleOtpChange(i, e.target.value)}
                    onKeyDown={e => e.key === 'Backspace' && !val && i > 0 && document.getElementById(`otp-${i-1}`)?.focus()}
                  />
                ))}
              </div>

              {error && <div className={styles.error}>⚠️ {error}</div>}

              <button className={styles.submitBtn} onClick={handleOtpVerify} disabled={loading}>
                {loading ? <span className={styles.spinner} /> : 'Verify & Continue →'}
              </button>

              <button className={styles.guestBtn} onClick={() => setMode('signup')}>← Change details</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
