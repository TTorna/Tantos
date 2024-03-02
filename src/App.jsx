import { useState } from 'react';
import './App.css'
import TaskItem from './components/TaskItem';
import { FormCreate } from './components/notaCreadora';
import { EditNotas } from './components/EditNotas';

let notas = [
  {
  'id':1,
  'hora':'7:15',
  'actividad':'Me levante',
  'info':'La hora de levantarme es de 7:15'},
  {
  'id':2,
  'hora':'7:25',
  'actividad':'Tome las gotas',
  'info':'Tome las gotas de la mañana',},
  {
  'id':3,
  'hora':'8:00',
  'actividad':'Empece a trabajar',
  'info':'Empece a trabajar en el proyecto del dia',},
  {
  'id':4,
  'hora':'12:15',
  'actividad':'Descanso',
  'info':'Momento para ir a almorzar',}
]

function App() {
const [notas, setNotas] = useState([])
//formState: { errors }, watch, setValue,

function addNota ([hora, actividad, descripcion]) {
  const newTask = {id: (notas.length+1), hora, actividad, descripcion, isEditing: false, info: false, checked: false}
  setNotas([...notas, newTask])
  console.log(notas)
}

function deleteNota(deleteId){
  setNotas(notas.filter(nota=> nota.id !== deleteId))
}

function toggleInfo (idAux, checked) {
  setNotas((prevToDoList)=>
      prevToDoList.map(nota => nota.id===idAux ? {
          ...nota,
          info: checked
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
    <h1>Registro</h1>
    <section className='container'>
        
                    
          {notas.map((nota) => (
              nota.isEditing ? (
                <EditNotas nota={nota} editNota={editNota} editNotaCheck={editNotaCheck} />
              ) : (
              <TaskItem nota={nota} deleteNota={deleteNota} toggleInfo={toggleInfo} editNotaCheck={editNotaCheck}/>
            )))}
          
          {notas.length === 0 ? (<p className="notify">No tasks to do</p>) : null}
        
        {/*<Stats toDoList={notas}/>*/}
        <div className='nota creadora'>
          <FormCreate addNota={addNota}/>
        </div>
    </section>
    </>
  )
}

export default App
