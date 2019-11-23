'use strict'

import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import styles from './styles.scss'
import { useUser } from '../../../contexts/user'

const Tab = ({
  children,
  className,
  to
}: {
  children: any
  className?: string
  to: string
}) => (
  <li className={`${styles.tab} ${className || ''}`.trim()}>
    <NavLink to={to}>{children}</NavLink>
  </li>
)

const Profile = () => {
  const user = useUser()

  return (
    <Tab to={user ? '/profile' : '/login'} className={styles.profile}>
      {user ? user.name : 'Login'}
    </Tab>
  )
}

const Header = () => {
  const user = useUser()
  const [open, setOpen] = useState(null)

  useEffect(() => {
    if (open) {
      const close = () => setOpen(false)
      document.addEventListener('click', close)
      return () => document.removeEventListener('click', close)
    }
  }, [open])

  const toggleOpen = () => setOpen(open => !open)

  return (
    <>
      <nav className={styles.nav}>
        <div
          className={`${styles.container} ${
            open ? styles.open : open === false ? styles.closed : ''
          }`.trim()}>
          <NavLink to="/" className={`${styles.logo} ${styles.desktop}`}>
            <div className={styles.hello}>Hello</div>
            <div className={styles.wallet}>Wallet</div>
          </NavLink>
          {user && (
            <>
              <a
                href="#"
                className={`${styles.logo} ${styles.mobile}`}
                onClick={toggleOpen}>
                <div className={styles.hello}>Hello</div>
                <div className={styles.wallet}>Wallet</div>
              </a>
              <a href="#" className={styles.hamburger} onClick={toggleOpen} />
              <div className={styles.menu}>
                <div className={styles.shade} />
                <ul className={styles.tabs}>
                  <Tab to="/dashboard">Home</Tab>
                  <Tab to="/score">Score</Tab>
                  <Tab to="/guidance">Guidance</Tab>
                  <Tab to="/accounts">Accounts</Tab>
                  <Tab to="/budget">Budget</Tab>
                </ul>
              </div>
            </>
          )}
          <Profile />
        </div>
      </nav>
    </>
  )
}

export default Header
