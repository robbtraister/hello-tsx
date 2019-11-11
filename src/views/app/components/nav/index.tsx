'use strict'

import React, { Ref, createRef, useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

import styles from './styles.scss'
import { useUserContext } from '../../contexts/user'

const Tab = ({ children, className, to }: { children: any; className?: string; to: string }) =>
  <li className={`${styles.tab} ${className || ''}`.trim()}><NavLink to={to}>{children}</NavLink></li>

const Profile = () => {
  const user = useUserContext()
  const name = (user && user.name) || 'Profile'

  return <Tab to='/profile' className={styles.profile}>{name}</Tab>
}

const Nav = () => {
  const hamburger: Ref<HTMLDivElement> = createRef()
  const [open, setOpen] = useState(false)

  const toggleOpen = (e) => {
    hamburger && hamburger.current && (window.getComputedStyle(hamburger.current).display !== 'none') && e.preventDefault()
    setOpen((open) => !open)
  }

  useEffect(() => {
    if (open) {
      const close = () => setOpen(false)
      document.addEventListener('click', close)
      return () => document.removeEventListener('click', close)
    }
  }, [open])

  return <>
    <div className={styles.nav}>
      <div className={styles.container}>
        <div className={`${styles.hamburger} ${open ? styles.open : ''}`.trim()} onClick={toggleOpen} ref={hamburger} />
        <Link to='/' className={styles.logo} onClick={toggleOpen}>
          <div className={styles.hello}>Hello</div>
          <div className={styles.wallet}>Wallet</div>
        </Link>
        <div className={`${styles.menu} ${open ? styles.open : ''}`.trim()}>
          <div className={styles.shade} />
          <ul className={styles.tabs}>
            <Tab to='/home'>Home</Tab>
            <Tab to='/score'>Score</Tab>
            <Tab to='/guidance'>Guidance</Tab>
            <Tab to='/accounts'>Accounts</Tab>
            <Tab to='/budget'>Budget</Tab>
          </ul>
        </div>
        <Profile />
      </div>
    </div>
  </>
}

export default Nav
