import {Inicio} from './components/Inicio'
import React from 'react';
import {Bar} from 'react-chartjs-2'


function App() {
  const data = {
    labels:['Renovable', 'No renovable', 'Fotovoltaica', 'Nuclear'],
    datasets:[{
      label:'coste por kwh',
      backgroundColor: 'rgba(0,200,0,0.6)',
      borderColor: 'black',
      borderWidth:1,
      hoverBackgroundColor: 'rgba(0,200,0,0.2)',
      hoverBorderColor:'#FF0000',
      data:[1.32, 1.5 , 0.32 , 1.9 ]
    }]
  };
    const opciones={
      maintainAspectRatio: false,
      responsive: true
    }
  return (
    <div className="App" style={{width: '100%', height:'500px'}}>

        <Inicio/>
        {/* <Bar data={data} options={opciones}/> */}
    </div>
  );
}

export default App;
