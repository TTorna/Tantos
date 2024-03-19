import { useState, useEffect } from 'react';
import './App.css'
import TaskItem from './components/TaskItem';
import { FormCreate } from './components/notaCreadora';
import { EditNotas } from './components/EditNotas';
import { MdHelpOutline } from "react-icons/md";

function App() {
const [notas, setNotas] = useState([])
const [contNotas, setContNotas] = useState(0)

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
                  <h3>El notero tiene las sigientes functiones:</h3>
                  <details>
                    <summary>Crear notas </summary>
                    <p><img src="CreateNota.jpg" alt="Imagen de la creacion de notas "/><br/>
                    Al apretar el boton (+) se creara una nota con la informacion dada.<br/><br/>
                    /(todas las notas se ordenan de menor a mayor)/<br/>
                    /(al apretar "info." se muestra la informacion)/ </p>
                  </details>
                  <br />
                  <details>
                    <summary>Eliminar notas</summary>
                    <p><img src="EliminarNota.jpg" alt="Imagen de la eliminacion de notas "/><br/>
                    Al apretar el boton (X) se eliminara la nota.</p>
                  </details><br/>
                  <details>
                    <summary>Editar notas</summary>
                    <p><img src="EditarNota.jpg" alt="Imagen de la edicion de notas "/><br/>
                    Al apretar el boton (lapiz) se podra editar la nota<br/><br/>
                    Aparecera de la sigiente manera para cambiar los campos:<br/>
                    <img src="EditarNota2.jpg" alt="Imagen de la edicion de notas "/>
                    </p>
                  </details><br/>
                  <details>
                    <summary>Eliminar todas las notas</summary>
                    <p><img src="BotonReset.jpg" alt="Imagen del boton reset"/><br/>
                    Al apretar el boton reset se eliminaran todas las notas.</p>
                  </details><br/>
                  <details>
                    <summary>Marcar como completadas</summary>
                    <p><img src="NotaCompletada.jpg" alt="Imagen de la nota completada"/><br />
                    Al apretar el titulo de la nota se marcara como completada tachandolo.</p>
                  </details><br/>
                  <details>
                    <summary>Programar tareas a futuro</summary>
                    <p>Se pueden crear tareas programadas creandolas con una hora mayor a la actual.<br />
                    Por Ejemplo, si son las 20:15, y creo esta nota:<br />
                    <img src="NotaProgramada.jpg" alt="Imagen de la creacion de una nota programada "/><br /><br />
                    Se creara la nota programada a las 21:00, que se distinguirá de las otras notas por su borde.<br />
                    <img src="NotaProgramadaRoja.jpg" alt="Imagen de una nota programada por hacer"/><br /><br />
                    Y al "Marcar como completada" la nota cambiara de color el borde para asi identificar si la "tarea programada" se hizo o no.<br />
                    <img src="NotaProgramadaVerde.jpg" alt="Imagen de la creacion de una nota programada hecha"/><br />
                    </p>
                  </details><br/>
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
