import React from 'react'
import styles from './card.module.css'
import { Link } from 'react-router-dom';

export default function Card({name,population,region,capital,flag}) {
  return (
    <Link to={name} className= {styles.card}>
        <img src={flag} alt="flag" />
        <div className={styles.text}>
            <h3>{name}</h3>
            <p>Population: {population}</p>
            <p>Region: {region}</p>
            <p>Capital: {capital}</p>
        </div>
    </Link>
  )
}
