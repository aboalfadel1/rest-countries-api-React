import React from 'react'
import styles from "./header.module.css"
import { faMoon as faMoonRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDarkMode } from '../../store/darkMode';
export default function Header() {
  const {isDarkMode,toggleDarkMode}=useDarkMode()
  return (
    <div className={`${styles.header} ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className={styles.logo}>
            <p>Where in the world?</p>
        </div>
        <div className={styles.mode} onClick={toggleDarkMode}>
            <p><FontAwesomeIcon icon={faMoonRegular} /><b> Dark Mode</b></p>
        </div>
    </div>
  )
}
