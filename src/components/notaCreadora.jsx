//import { useState, useEffect } from "react";
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {MdAddCircle} from 'react-icons/md'
import PropTypes from 'prop-types';


/*const initialState = {
    'id': null,
    'hora':'',
    'actividad':'',
    'info':''
}const [form,serForm] = useState(initialState)*/

/*let data ={
    'id': null,
    'hora':'',
    'actividad':'',
    'info':''
}

function pushNotas(notas, estado) {
    const [newNota, setNewNotas] = useState(data)
    if (estado) {
        setNewNotas(data)
        return
    }
    notas.push(newNota)
    return notas
}*/

export function FormCreate({ addNota }) {
  const [hora, setHora] = useState('');
  const [actividad, setActividad] = useState('');
  const [info, setInfo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  
  function handleInputValueHora(event){
    setHora(event.target.value)
  }

  function handleInputValueAct(event){
    setActividad(event.target.value)
  }

  function handleInputValueInfo(event){
    setDescripcion(event.target.value)
  }

  const {
    handleSubmit
  } = useForm()
  
  const onSubmit = handleSubmit(() => {
    if(hora.trim() === '' || actividad.trim() === '') return
    addNota([hora, actividad, descripcion])    

    setActividad('')
    setHora('')
    setDescripcion('')
  })

return(
        <form onSubmit={onSubmit}>
          <div className='items-create'>
            <input type="time" value={hora} name="hora" onChange={handleInputValueHora}/>
            <input type="text" placeholder='Actividad' value={actividad} name="actividad"onChange={handleInputValueAct}/>
            <a className="info" onClick={() => setInfo(!info)} name='info' href='#'>Info.</a>
            <button>
            <MdAddCircle className='add-icon' type="submit"/>
            </button>
          </div>
          {info &&
          <div className='descripcion'>
            <input type="text" placeholder='Descripcion' value={descripcion} name="info" onChange={handleInputValueInfo}/>
          </div>}
        </form>)
}

FormCreate.propTypes = {
  addNota: PropTypes.func.isRequired
};