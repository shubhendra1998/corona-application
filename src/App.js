import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import { Cards, Chart, Countrypicker } from './components';
import { fetchData } from './api';

const App = () => {
  const [data, setData] = useState({});
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const fetched = await fetchData();
      if (mounted) {
        setData(fetched || {});
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const handleCountryChange = async (selectedCountry) => {
    setLoading(true);
    const fetched = await fetchData(selectedCountry);
    setData(fetched || {});
    setCountry(selectedCountry);
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <Cards data={data} />
      <Countrypicker handleCountryChange={handleCountryChange} />
      <Chart data={data} country={country} />
      {loading && <div style={{ marginTop: 12 }}>Loading data…</div>}
    </div>
  );
};

export default App;