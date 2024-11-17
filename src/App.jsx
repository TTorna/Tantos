import { useState, useEffect } from 'react';
import './App.css'
import TaskItem from './components/TaskItem';
import { FormCreate } from './components/notaCreadora';
import { EditNotas } from './components/EditNotas';
import { MdHelpOutline, MdDarkMode, MdLightMode } from "react-icons/md";
import { TiChevronRight, TiChevronLeft } from "react-icons/ti";


function App() {

const [notas, setNotas] = useState([])
const [contNotas, setContNotas] = useState(0)
const [darkMode, setDarkMode] = useState(false)
const [ord, setOrd] = useState(false)
const [hoja, setHoja] = useState(1)

useEffect (() => {
    if (!notas) return
    const notasAux = [...notas]
    notasAux.sort((a, b) => a.hora.localeCompare(b.hora))
    setNotas(notasAux)
    
}, [contNotas, ord])

useEffect (() => {
  const hojaActual = parseInt(localStorage.getItem('hojaAcual'))

  if (localStorage.getItem('notas'+ hoja)) {
    const notasLS = (JSON.parse(getData(hoja))).sort((a, b) => a.hora.localeCompare(b.hora))
    setNotas(notasLS)
  } else {
    setNotas([])
  }

  localStorage.setItem('hojaAcual', hojaActual)
}, [hoja])

const getData = (hoja) => {
  return localStorage.getItem('notas'+ hoja)
}

useEffect(() => {
  let hojaActual = 1

  // Verifica la hoja actual
  if (!isNaN(localStorage.getItem('hojaAcual'))) {
    hojaActual = parseInt(localStorage.getItem('hojaAcual'))
    setHoja(hojaActual)}
  
  // Carga la lista de notas1
  if (localStorage.getItem('notas'+ hojaActual)) {
    const notasLS = (JSON.parse(localStorage.getItem('notas'+ hoja))).sort((a, b) => a.hora.localeCompare(b.hora))
    setNotas(notasLS)
  }

  // Verifica si el modo oscuro está activado en el almacenamiento local
  if (localStorage.getItem('darkMode')) {
    darkModeFunc()}
    
}, [])

function darkModeFunc() {

const body = document.body;
const darkModeAux = !darkMode

  if (darkModeAux){
  body.classList.add('dark-mode');
  localStorage.setItem('darkMode', true);
  } else {
    body.classList.remove('dark-mode');
    localStorage.removeItem('darkMode');
  }
  setDarkMode(darkModeAux)

  console.log(notas)
  console.log(localStorage.getItem('notas'+hoja))
  console.log(hoja)

}

function addNota ([hora, actividad, descripcion]) {
  
  const diaActual = new Date()
  let horaActual = diaActual.getHours()
  let minActual = diaActual.getMinutes()
  let secActual = diaActual.getSeconds()

  if(horaActual < 10){
    horaActual = '0'+diaActual.getHours()
  }
  if(minActual < 10){
    minActual = '0'+diaActual.getMinutes()
  }
  if(secActual < 10){
    secActual = '0'+diaActual.getSeconds()
  }

  let relojActual = horaActual+':'+minActual+':'+secActual
  
  let programmedAux = false
  if(hora>relojActual){
    programmedAux = true
  }

  //ordenar por id NOTAS
  const notasOrdXId = notas.sort((a, b) => a.id - b.id)
  const ultimaNota = notasOrdXId[notas.length-1]
  const idAux = (ultimaNota === undefined) ? contNotas : ultimaNota.id >= contNotas ? ultimaNota.id+1 : (contNotas+1)

  const newTask = {id: idAux, hora, actividad, descripcion, isEditing: false, info: false, checked: false, programmed: programmedAux}
  const notasAux = [...notas, newTask]
  
  setNotas(notasAux)
  setContNotas(idAux)

  //hoja === 1 ? localStorage.setItem('notas1', JSON.stringify(notasAux)) : localStorage.setItem('notas2', JSON.stringify(notasAux))
  localStorage.setItem('notas' + hoja, JSON.stringify(notasAux))
}

function deleteNota(deleteId){
  const notasAux = notas.filter(nota=> nota.id !== deleteId)
  setNotas(notasAux)
  localStorage.setItem('notas'+ hoja, JSON.stringify(notasAux))
}

function deleteAll(){
  setNotas([])
  localStorage.removeItem('notas' + hoja)
}


function toggleCheck (idAux, checkedAux) {
  const notasAux = notas.map(nota => nota.id===idAux ? {
    ...nota,
    checked: checkedAux
  }: nota)

  setNotas(notasAux)
  localStorage.setItem('notas' + hoja, JSON.stringify(notasAux))
}

function editNotaCheck (idAux, infoBool) {
  const notasAux = notas.map(nota => nota.id===idAux ? {
    ...nota,
    info: infoBool,
    isEditing: !nota.isEditing
}: nota)
  setNotas(notasAux)
  localStorage.setItem('notas'+hoja, JSON.stringify(notasAux))
}

function editNota ([id, hora, actividad, descripcion, infoBool]) {
  const notasAux = notas.map(nota => nota.id===id ? {
        ...nota,
        hora,
        actividad,
        descripcion,
        info: infoBool,
        isEditing: !nota.isEditing
    }: nota)
  setNotas(notasAux)
  setOrd(!ord)
  localStorage.setItem('notas'+hoja, JSON.stringify(notasAux))
}

function contadorHojas (n) {
  const hojasAux = parseInt(hoja) + n
  setHoja(hojasAux)
  localStorage.setItem('hojaAcual', hojasAux)
}

  return (
    <>
    <header>
        <div className="toggle">
          <button className="iconToggle" onClick={darkModeFunc}>{darkMode ? <MdLightMode className='light-icon'/> : <MdDarkMode className='dark-icon'/>}</button>
        </div>
    </header>
    <main>
      <h1>Registro</h1>
      <section className='container'>
                  
            {notas.length !== 0 ? (notas.map((nota) => (
                nota.isEditing ? (
                  <EditNotas key={nota.id} nota={nota} editNota={editNota} />
                ) : (
                <TaskItem key={nota.id} nota={nota} deleteNota={deleteNota} toggleCheck={toggleCheck} editNotaCheck={editNotaCheck}/>
              )))): (<p className="notify">No tasks to do</p>)}
            
          {/*<Stats toDoList={notas}/>*/}
          <div className='nota creadora'>
            <FormCreate addNota={addNota}/>
          </div>
          <div className='buttom-bottoms'>
          <button className={hoja === 1 ? 'izqNota disabled' : 'izqNota'} onClick={() => {parseInt(hoja) - 1 > 0 && contadorHojas(-1)}}><TiChevronLeft /></button>
          <button className='deleteAll' onClick={() => {deleteAll()}}>Reset</button>
          <button className={hoja === 2 ? 'derNota disabled' : 'derNota'} onClick={() => {parseInt(hoja) + 1 <= 2 && contadorHojas(1)}}><TiChevronRight /></button>
          </div>
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
