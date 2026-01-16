import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NativeSelect, FormControl } from '@material-ui/core';
import styles from './Countrypicker.modules.css';
import { fetchCountries } from '../../api';

const Countrypicker = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const list = await fetchCountries();
      if (mounted) setCountries(list);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleCountryChange(e.target.value)}
        inputProps={{ 'aria-label': 'Select country' }}
      >
        <option value="">Global</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

Countrypicker.propTypes = {
  handleCountryChange: PropTypes.func.isRequired,
};

export default Countrypicker;