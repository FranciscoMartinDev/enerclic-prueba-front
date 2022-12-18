// Realizo todos los import necesarios para la funcionalidad del componente
import { CategoryScale } from 'chart.js';
import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import {options} from '../data/data'
import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import estilos from './estilos.css'

const categories = Object.keys(options);

// Aquí se iran introduciendo los valores sacados del select para ser posteriormente enviados al componente de inicio
let initialValue= {
language:"",
category:"",
widget:"",
timeTrunc:""
}



// Declaro todos los useState y funciones necesarios para la información con la que voy a trabajar 
function Formulario({setUrl}) {
const [peticion, setPeticion] = useState(initialValue);
const [widget, setWidget] = useState(options["demanda"]);
const [idiomaSeleccionadoFinalmente, setIdiomaSeleccionadoFinalmente] = useState("el idioma elegido es: ");

const handleChange = (e)=>{
  const {name, value} = e.target;
  
  setPeticion({...peticion, [name]:value})
  if (name === "category"){
    setWidget(options[value])
  }
}


// Aquí modifico el enlace desde el que se requerirá información a la API para que sea dinámico según que selecciones en el formulario
const handleSubmit = () => {
  setUrl(`https://apidatos.ree.es/${peticion.language}/datos/${peticion.category}/${peticion.widget}?start_date=2018-01-01T00:00&end_date=2019-01-31T23:59&time_trunc=month`)
}


  return (
    <div>
      



{/* FORMULARIO SELECT EN MATERIAL UI (con algunas opciones comentadas que eran funcionales en la mayoría de casos)*/}

<div className="selects">
  <h2>Seleccione sus preferencias</h2>
<FormControl className='estiloSelect'  sx={{ m: 1, minWidth: 110 }} >
  <InputLabel  id="demo-simple-select-label">Idioma</InputLabel>
  <Select
    name  = "language" 
    labelId="language"
    id="language"
    label="language"
    value={peticion.language}
    onChange={handleChange}>
     <MenuItem value="es">Español</MenuItem>
    <MenuItem value="en">Ingles</MenuItem>
  </Select>
 </FormControl>
{/* <br />
 <FormControl className='estiloSelect'  sx={{ m: 1, minWidth: 170 }} >
  <InputLabel id="demo-simple-select-label">Tramo Temporal</InputLabel>
  <Select
    name  = "timeTrunc" 
    labelId="timeTrunc"
    id="timeTrunc"
    label="timeTrunc"
    value={peticion.timeTrunc}
    onChange={handleChange}>
    <MenuItem value="month">Mensual</MenuItem>
    <MenuItem value="year">Anual</MenuItem>
  </Select>
  </FormControl> */}
  
  <br />

<FormControl className='estiloSelect' sx={{ m: 1, minWidth: 110 }} >
  <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
  <Select
    name  = "category" 
    labelId="category"
    id="category"
    label="category"
    value={peticion.category}
    onChange={handleChange}>
    {categories.map((element)=>
    <MenuItem value={element}>{element}</MenuItem>)}
  </Select>
</FormControl>
<br />
<FormControl className='estiloSelect' sx={{ m: 1, minWidth: 110 }}>
  <InputLabel id="demo-simple-select-label">Widget</InputLabel>
  <Select
     name  = "widget" 
    labelId="widget"
    id="widget"
    label="Widget"
    onChange={handleChange}>
    {widget.map((element)=>
    <MenuItem value={element}>{element}</MenuItem>)}
  </Select>
</FormControl>
<br />
<div className="botones">
<Button variant="contained" onClick={handleSubmit} >aceptar</Button>
 </div>  
</div>

 {/* <h2>El idioma elegido es: {peticion.language}</h2>
    <h2>La categoria seleccionada es: {peticion.category}</h2>
    <h2>El widget elegido es: {peticion.widget}</h2> */}
</div>
  );
  

}
 ;

export default Formulario;
