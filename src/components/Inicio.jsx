// Realizo todos las importaciones necesarias para la funcionalidad del componente
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CsvDownload from "react-json-to-csv";
import Form from 'react-bootstrap/Form';
import Formulario  from '../components/formulario'
import peticion  from '../components/formulario'
import estilos from './estilos.css'
import { borderColor } from '@mui/system';


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {Bar} from "react-chartjs-2";

// Declaro los componentes que voy a utilizar de las charts
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);


// Declaro todos los useState necesarios para la información con la que voy a trabajar
export const Inicio = () => {
  const [data1, setData1] = useState({})  
  const [name, setName] = useState("")  
  const [color, setColor] = useState("")  
  const [fechas, setFechas] = useState([])
  const [valores, setValores] = useState([])
  const [url, setUrl] = useState("")
  const [chartData, setChartData] = useState({
    datasets: [],
  })
  const [tableData, setTableData] = useState({
    datasets: [],
  })
  const [chartOptions, setChartOptions] = useState({})

const fechasManuales = ["01/2018", "02/2018", "03/2018", "04/2018", "05/2018", "06/2018", "07/2018", "08/2018", "09/2018", "10/2018", "11/2018", "12/2018", "01/2019"];
 


// Relleno los parámetros de la tabla con valores dinámicos y valores a mano ( sus datos y sus ajustes)
useEffect(() => {


    setChartData({
      labels: fechasManuales, // "fechas" sería la opcion automatica pero preferi realizarla a mano para un mejor acabado
      datasets : [
       {
       label: name,
       data: valores,
       borderColor: "rgb(53, 162, 235, 0.1)",
       backgroundColor: color,
       hoverBackgroundColor:"rgb(0, 0, 0, 0.1)",
     },
      ],
    });
   
    setChartOptions({
     responsive: true,
     plugins: {
       legend: {
         position: "top"
       },
       title: {
         display: true,
         text: "Tabla datos API",
       }
     }
    })
    }, [fechas, valores, name, color])

// Extraigo todos los datos necesarios del end point seteandolos en los diferentes valores solicitados por la gráfica

  useEffect(() => {
   axios
    .get(url)
    .then(res => {
      setColor(res.data.included[0].attributes.color)
      setName(res.data.included[0].attributes.title)
      setData1(res.data.included[0].attributes.values)
      setFechas(res.data.included[0].attributes.values.map((e)=> e.datetime))  
      setValores(res.data.included[0].attributes.values.map((e)=> e.value))  
    })
  

  }, [url])
  
    return (
    <div>
        <div className="top">
         <div className='cabezera'></div>
         <div className='cabezeraMobile'></div>
        </div>
       
        <div className='mainContent'>
        
       
            <div className='formSide'>
              <Formulario setUrl={setUrl}/>
            <br />
            <br/>
            <CsvDownload data={data1} className="boton-csv btn-wrap">DESCARGAR DATOS</CsvDownload></div>
           
            <div className='chartSide'>
             
            <Bar className='Grafica' options={chartOptions} data={chartData}/>
            
            </div>
          
        </div>
   <footer>
     <h4>Desarrollado por <a target="_blank" href="https://www.linkedin.com/in/francisco-martin-lopez/">Francisco Martín Dev</a>.</h4>        
   </footer>
        
         
    </div>
  )
}
