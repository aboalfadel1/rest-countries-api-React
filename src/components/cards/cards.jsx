import React, { useRef, useState, useEffect } from 'react';
import styles from "./cards.module.css";
import Card from '../card/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import CardLoader from '../cardLoader/cardLoader';

export default function Cards() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const selected = useRef();
  const countryName = useRef();

  const handleSearch = async () => {
    const typedName = countryName.current.value;
    setLoading(true);
    if (typedName) {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${typedName}`);
        if (res.status === 404) {
          setCountries([]);
          return;
        }
        const data = await res.json();
        setCountries(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    } else {
      fetchCountries();
    }
  };

  const handelSelect = async () => {
    const selectedRegion = selected.current.value;
    setLoading(true);
    if (selectedRegion) {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/region/${selectedRegion}`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setCountries(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    } else {
      fetchCountries();
    }
  };

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,capital,region,subregion,population,tld,currencies,languages,borders');
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

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className={styles.controlContainer}>
        <div className={styles.inputContainer}>
          <FontAwesomeIcon icon={faSearch} className={styles.serachIcon} />
          <input onChange={handleSearch} type="text" placeholder='Search for a country...' ref={countryName} />
        </div>
        <select name="select" id="select" ref={selected} className={styles.select} onChange={handelSelect}>
          <option value="">All</option>
          <option value="africa">Africa</option>
          <option value="america">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>

      <div className={styles.cards}>
        {loading ? (
          Array.from({ length: 15 }).map((_, index) => (
            <CardLoader key={index} />
          ))
        ) : countries.length === 0 ? (
          <p>There are no matching countries.</p>
        ) : (
          countries.map((country) => (
            <Card
              key={country.name.common}
              flag={country.flags.svg}
              name={country.name.common}
              population={country.population}
              region={country.region}
              capital={country.capital}
            />
          ))
        )}
      </div>
    </>
  );
}
