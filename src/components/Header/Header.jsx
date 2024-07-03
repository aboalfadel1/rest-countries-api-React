import React from 'react'
import styles from "./header.module.css"

export default function Header() {
  return (
    <div className={styles.header}>
        <div className={styles.logo}>
            <p>Where in the world?</p>
        </div>
        <div className="mode">
            <p><i></i>Dark Mode</p>
        </div>
    </div>
  )
}
