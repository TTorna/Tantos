//import { useState, useEffect } from "react";
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {MdAddCircle} from 'react-icons/md'
import PropTypes from 'prop-types';

export function EditNotas({ nota, editNota }) {
  const [hora, setHora] = useState(nota.hora);
  const [actividad, setActividad] = useState(nota.actividad);
  const [info, setInfo] = useState(nota.info);
  const [descripcion, setDescripcion] = useState(nota.descripcion);
  
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
    if(actividad.trim() === '') return
    if(hora.trim() === '') {
      editNota([nota.id, " ##:## ", actividad, descripcion, info])}
    else {
      editNota([nota.id, hora, actividad, descripcion, info])
    }
  })

return(
        <form onSubmit={onSubmit}>
            <div className='nota'>
                <div className='items-create'>
                    <input type="time" value={hora} name="hora" onChange={handleInputValueHora}/>
                    <input type="text" placeholder='Actividad' value={actividad} name="actividad" onChange={handleInputValueAct}/>
                    <a className="info" onClick={() => setInfo(!info)} name='info' href='#'>Info.</a>
                    <button>
                        <MdAddCircle className='add-icon' type="submit"/>
                    </button>
                </div>
                {info &&
                <div className='descripcion'>
                    <input type="text" placeholder='Descripcion' value={descripcion} name="info" onChange={handleInputValueInfo}/>
                </div>}
            </div>
        </form>)
}

EditNotas.propTypes = {
    nota: PropTypes.shape({
    id: PropTypes.number.isRequired,
    hora: PropTypes.string.isRequired,
    actividad: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    info: PropTypes.bool.isRequired
    }).isRequired,
    editNota: PropTypes.func.isRequired
};