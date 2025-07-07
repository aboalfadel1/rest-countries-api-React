import React, { useEffect, useState } from 'react'
import styles from "./country-details.module.css"
import { Link, useParams } from 'react-router-dom'
import newSyria from "../../imgs/syria.svg.png"

export default function CountryDetails() {
  const {countryDetails}= useParams()
  const [country,setCountry] = useState({})
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  useEffect(()=>{
    const fetchCountry= async()=>{
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryDetails}`)
      if(response===404){
        setCountry({})
        return
      }
      if(!response.ok){
        throw new Error("Respornt was not ok")
      }
      const data = await response.json()
      setCountry(data[0])
      console.log(data)
      } catch (error) {
        setError(error)
      }
      finally{
        setLoading(false)
      }
    }
    fetchCountry()
  },[countryDetails])
  console.log(country)

    if(error){
      return <div>Error: {error.message}</div>;
    }
    if(loading){
        return <div>Loding...</div>
    }
  return (
   <div className={styles.father}>
    {country.length === 0 ?<p>Country not found</p>: <div>
            <Link to="/" className={styles.link}><strong>&#8592;</strong> Back</Link>

    <div className={styles.container }>
<div className={styles.left}>
  <img
    src={country.name?.common === "Syria" ? newSyria : country.flags?.png}
    alt={country.name?.common ? `${country.name.common} flag` : "Country flag"}
  />
</div>
      <div className={styles.right}>
        <h2>{country.name.common}</h2>
        <div className={styles.colContainer}>
      	  <div>
            <p>Nativ Name: {Object.values(country.name.nativeName)[0].common}</p>
            <p>Population: {country.population}</p>
            <p>Region: {country.region}</p>
            <p>Sub Reguion: {country.subregion}</p>
            <p>Capital: {country.capital.map((c,index)=> {
              if(index===country.capital.length-1) return c
              return `${c}, `
            })}</p>
          </div>
      	  <div>
            <p>Top Level Domain: {country.tld.map((t,index) => index===country.tld.length-1 ? t:`${t}, ` )}</p>
            <p>Currencies: {Object.values(country.currencies)[0].name} {Object.values(country.currencies)[0].symbol}</p>
            <p>Langueges: {Object.entries(country.languages).map(([key, value],index) => {
              if(index === Object.keys(country.languages).length-1 ) return value
                return `${value}, `
            })}</p>
          </div>
        </div>
        <div>
          <p><b>Border Countries: {(country.border) ? country.borders.map(border => `${border}, `):"There is no Bordercountry for this Country!"} </b></p>

          
        </div>
      </div>
    </div>
    </div>}
   </div>
  )
}
