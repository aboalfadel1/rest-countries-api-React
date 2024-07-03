import React from 'react'
import styles from "./header.module.css"
import { faMoon as faMoonRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function Header() {
  return (
    <div className={styles.header}>
        <div className={styles.logo}>
            <p>Where in the world?</p>
        </div>
        <div className="mode">
            <p><FontAwesomeIcon icon={faMoonRegular} /><b> Dark Mode</b></p>
        </div>
    </div>
  )
}
