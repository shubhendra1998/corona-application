import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths } = {}, country = '' }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const d = await fetchDailyData();
      if (mounted) setDailyData(d);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const lineChart =
    dailyData && dailyData.length ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [
            {
              data: dailyData.map(({ confirmed }) => confirmed),
              label: 'Infected',
              borderColor: '#3333ff',
              fill: true,
            },
            {
              data: dailyData.map(({ deaths }) => deaths),
              label: 'Deaths',
              borderColor: 'red',
              backgroundColor: 'rgba(255,0,0,0.5)',
              fill: true,
            },
          ],
        }}
      />
    ) : null;

  const showCountryBar = country && country !== '';

  const barChart =
    confirmed && showCountryBar ? (
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['rgba(0,0,255,0.5)', 'rgba(0,255,0,0.5)', 'rgba(255,0,0,0.5)'],
              data: [confirmed.value, recovered.value, deaths.value],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${country || 'Global'}` },
        }}
      />
    ) : null;

  return <div className={styles.container}>{showCountryBar ? barChart : lineChart}</div>;
};

Chart.propTypes = {
  data: PropTypes.object,
  country: PropTypes.string,
};

export default Chart;