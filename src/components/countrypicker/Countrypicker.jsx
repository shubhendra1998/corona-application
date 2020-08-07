import React , {useEffect, useState} from 'react' ;

import {NativeSelect ,FormControl} from '@material-ui/core';

import styles from './Countrypicker.modules.css';

import {fetchcountries } from '../../api';
const Countrypicker =( {handleCountryChange}) => {
const [fetchedCountries,setFetchedCountries] = useState([]);

    useEffect( () => {
        const fetchAPI  =async () => {
            setFetchedCountries( await fetchcountries());
        }

        fetchAPI();
    }, [setFetchedCountries]);
console.log(fetchedCountries);

 return (

    <FormControl className={styles.FormControl}>
        <NativeSelect defaultValue= " " onChange={(e) => handleCountryChange(e.target.value)}>
            <option value="global">Global</option>
            {fetchedCountries.map((country,i) => <option key ={i} value={country}>{country}</option>)}
        </NativeSelect>
    </FormControl>
 )

}

 export default Countrypicker;