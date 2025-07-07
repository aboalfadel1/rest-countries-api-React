import React from 'react'
import styles from './card.module.css'
import { Link } from 'react-router-dom';
import { useDarkMode } from '../../store/darkMode';
export default function Card({name,population,region,capital,flag}) {
  const {isDarkMode} = useDarkMode()
  return (
    <Link to={name} className= {`${styles.card} ${isDarkMode ? "dark-mode":""}`}>
       <div className={styles.image}> <img src={flag} alt="flag" /></div>
        <div className={styles.text}>
            <h3>{name}</h3>
            <p>Population: {population}</p>
            <p>Region: {region}</p>
            <p>Capital: {capital}</p>
        </div>
    </Link>
  )
}
