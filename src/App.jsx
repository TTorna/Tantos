import { useState, useEffect } from 'react';
import './App.css'
import TaskItem from './components/TaskItem';
import { FormCreate } from './components/notaCreadora';
import { EditNotas } from './components/EditNotas';
import { MdHelpOutline } from "react-icons/md";

function App() {
const [notas, setNotas] = useState([])
const [contNotas, setContNotas] = useState(0)
const [explicacion, setExplicacion] = useState(false)

useEffect (() => {
    if (!notas) return
    const notasAux = [...notas]
    notasAux.sort((a, b) => a.hora.localeCompare(b.hora))
    setNotas(notasAux)

}, [contNotas])

function addNota ([hora, actividad, descripcion]) {
  
  const diaActual = new Date()
  let horaActual = diaActual.getHours()
  let minActual = diaActual.getMinutes()

  if(horaActual < 10){
    horaActual = '0'+diaActual.getHours()
  }
  if(minActual < 10){
    minActual = '0'+diaActual.getMinutes()
  }

  let relojActual = horaActual+':'+minActual
  console.log(relojActual)
  
  let programmedAux = false
  if(hora>relojActual){
    programmedAux = true
  }

  const newTask = {id: (notas.length+1), hora, actividad, descripcion, isEditing: false, info: false, checked: false, programmed: programmedAux}
  //console.log(newTask)
  setNotas([...notas, newTask])
  setContNotas(contNotas+1)
}

function deleteNota(deleteId){
  setNotas(notas.filter(nota=> nota.id !== deleteId))
}

function deleteAll(){
  setNotas([])
}

function toggleCheck (idAux, checkedAux) {
  setNotas((prevToDoList)=>
      prevToDoList.map(nota => nota.id===idAux ? {
          ...nota,
          checked: checkedAux
      }: nota),
  )
}

function editNotaCheck (idAux, infoBool) {
  setNotas((prevToDoList)=>
      prevToDoList.map(nota => nota.id===idAux ? {
          ...nota,
          info: infoBool,
          isEditing: !nota.isEditing
      }: nota),
  )
}

function editNota ([id, hora, actividad, descripcion]) {
  setNotas((prevToDoList)=>
      prevToDoList.map(nota => nota.id===id ? {
          ...nota,
          hora,
          actividad,
          descripcion
      }: nota),
  )
  console.log(notas)
}

  return (
    <>
    <main>
      <h1>Registro</h1>
      <section className='container'>
          
                      
            {notas.map((nota) => (
                nota.isEditing ? (
                  <EditNotas nota={nota} editNota={editNota} editNotaCheck={editNotaCheck} />
                ) : (
                <TaskItem nota={nota} deleteNota={deleteNota} toggleCheck={toggleCheck} editNotaCheck={editNotaCheck}/>
              )))}
            
            {notas.length === 0 ? (<p className="notify">No tasks to do</p>) : null}
          
          {/*<Stats toDoList={notas}/>*/}
          <div className='nota creadora'>
            <FormCreate addNota={addNota}/>
          </div>
          <button className='deleteAll' onClick={() => {deleteAll()}}>Reset</button>
      </section>
    </main>
    <a href="#modal-container" className="modal-trigger"><MdHelpOutline className='help-icon'/></a>

    <div className="modal-container" id="modal-container">
        <div className="modal">
            <a href="#" className="close">&times;</a>
            <div className="modal-header">
                <h1>Funcionalidades</h1>
            </div>
            <div className="modal-body">
                <p>
                  El notero tiene las sigientes functiones: <br/>
                  <br/>
                  - Crear notas <br/> /(todas las notas se ordenan de menor a mayor)/ <br/><br/>
                  - Eliminar notas <br/><br/>
                  - Editar notas <br/><br/>
                  - Eliminar todas las notas <br/> /(reset)/ <br/><br/>
                  - Marcar como completadas <br/> /(tachando el titulo)/ <br/><br/>
                  - Programar tareas a futuro <br/> /(creandolas con una hora mayor a la actual)/ <br/><br/>
                </p>
            </div>
            <div className="modal-footer">
                <p>Gracias por haber leido</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default App
