import axios from 'axios';

const url ='https://covid19.mathdro.id/api';

 export const fetchData =async (country) => {
     let changableurl=url;

     if(country) {
         changableurl=`${url}/countries/${country}`
     }
    try {
 const {data :{ confirmed,recovered,deaths,lastUpdate} }  =await axios.get(changableurl);
  return {
     confirmed,
     recovered,
     deaths,
     lastUpdate 
 };
 
 //return response;
 //console.log(response);

  //return modifiedData;
    }
    catch(error) {

    }
};

export const fetchDailyData =async () => {
     try {
 const { data } = await axios.get(`${url}/daily`);
  
 const modifiedData =data.map((dailyData) => ({
 confirmed :dailyData.confirmed.total,
 deaths: dailyData.deaths.total,
 date :dailyData.reportDate,
 }));
 
 console.log(data); 
 
 return modifiedData;
}
     catch {

     }
};

export const  fetchcountries =async () => {
    try {
  const {data : {countries }}  =await axios.get(`${url}/countries`);
   return countries.map((country) => country.name);
    }
    catch {

    }
};