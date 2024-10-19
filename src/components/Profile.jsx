import { useState, useEffect } from 'react';
import { EditNotas } from './EditNotas';
import TaskItem from './TaskItem';

function Profile () {

    const [notas, setNotas] = useState([])

    const getData = () => {
        return localStorage.getItem('notas')
    }

    useEffect(() => {
        setNotas(JSON.parse(getData()))
    }, [])

    return (
        <div className="profile">
            {notas.map((nota) => (
                nota.isEditing ? (
                  <EditNotas nota={nota} editNota={editNota} editNotaCheck={editNotaCheck} />
                ) : (
                <TaskItem nota={nota} deleteNota={deleteNota} toggleCheck={toggleCheck} editNotaCheck={editNotaCheck}/>
              )))}
        </div>
    );
}

export default Profile