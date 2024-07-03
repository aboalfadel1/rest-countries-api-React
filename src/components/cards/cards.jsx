import React, { useRef } from 'react'
import { useState,useEffect } from 'react';
import styles from "./cards.module.css"
import Card from '../card/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
export default function () {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const selected = useRef()
    const countryName= useRef()

    const  handleSearch = async ()=>{
      const typedName= countryName.current.value
      if(typedName){
        try{
          const res = await fetch(`https://restcountries.com/v3.1/name/${typedName}`)
          if(res.status==404){
            setCountries([])
            return
          }
          const data = await res.json();
          setCountries(data)
        }catch(error){
          setError(error)
        }finally{
          setLoading(false)
        }
         
      }else{
        fetchCountries()
      }
    }

    const handelSelect = async()=>{
    const selectedRegion= selected.current.value
      if(selectedRegion){
        try{
          const res = await fetch(`https://restcountries.com/v3.1/region/${selectedRegion}`)
          if(!res.ok){
            throw new Error ('Network response was not ok')
          }
          const data = await res.json();
          setCountries(data)
          console.log(data)
        }catch(error){
          setError(error)
        }finally{
          setLoading(false)
        }
         
      }else{
        fetchCountries()
      }
      }
      const fetchCountries = async () => {
        try {
          const response = await fetch('https://restcountries.com/v3.1/all');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setCountries(data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
    useEffect(() => {
      
      fetchCountries();
     
    }, []);
    if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }
  return (
    <>
    <div className={styles.controlContainer}>
      <div className={styles.inputContainer}>
      <FontAwesomeIcon icon={faSearch} className={styles.serachIcon}/> {/* Such-Icon */}
        <input onChange={handleSearch} type="text" placeholder='Search for a country...' ref={countryName} />
      </div>
      <select name="select" id="select" ref={selected} className={styles.select} onChange={handelSelect}> 
        <option value="" >All</option>
        <option value="africa">Africa</option>
        <option value="america" >America</option>
        <option value="asia" >Asia</option>
        <option value="europe" >Europe</option>
        <option value="oceania" >Oceania</option>
      </select>
    </div>
    <div className={styles.cards}>
      {countries.length== 0 ? <p>There are no maches Country</p>:countries.map((country)=><Card flag={country.flags.svg} key={country.name.common} name={country.name.common} population={country.population} region={country.region} capital={country.capital} />)}
        {}
    </div>
    </>
  )
}
