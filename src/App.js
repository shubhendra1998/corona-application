import React from 'react';
 import styles from './app.module.css';

 //import Card from './components/card/Card';
 //import Chart from './components/chart/Chart';
 //import Countrypicker from './components/countrypicker/Countrypicker';

import { Cards, Chart,Countrypicker } from './components';
import {fetchData } from './api';
class App extends React.Component {

  state = {
    data: {},
    country : ' ',
  }
  async componentDidMount() {
    const fetchedData = await fetchData();
    console.log(fetchedData);
    this.setState({data: fetchedData});
  // console.log(data);
  }

  handleCountryChange = async(country) => {
    const data = await fetchData(country);

    this.setState({ data , country :country});
  } 
  render() {
    
    return (
    <div className={styles.container}>
     <Cards data={this.state.data}/>
     <Countrypicker  handleCountryChange={this.handleCountryChange} />
     <Chart data={this.state.data} country={this.state.country} />
     
    
    </div>
    );
  }
 }
 export  default App;
