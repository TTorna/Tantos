import {MdClose, MdEdit} from 'react-icons/md'
import {useState} from 'react'
import PropTypes from 'prop-types';

const TaskItem = ({ nota, deleteNota, editNotaCheck }) => {
    const [showInfo, setShowInfo] = useState(nota.info)
    
    return (
        <>
        <div className="nota">
            <div className='items'>
                <span>{nota.hora}</span>
                <span>{nota.actividad}</span>
                <a href='#' onClick={() => {setShowInfo(!showInfo)}}>info.</a>
                <div className='icons'>
                    <MdClose className='delete-icon' onClick={()=>deleteNota(nota.id)}/>
                    <MdEdit className='delete-icon' onClick={()=>{editNotaCheck(nota.id, showInfo)}}/>
                </div>
            </div>            
            {showInfo &&
            <div className='descripcion'>
                <p>{nota.descripcion || 'Sin descripcion'}</p>
            </div>}
        </div>
        </>
    );
};

TaskItem.propTypes = {
    nota: PropTypes.shape({
        id: PropTypes.number.isRequired,
        hora: PropTypes.string.isRequired,
        actividad: PropTypes.string.isRequired,
        descripcion: PropTypes.string.isRequired,
        info: PropTypes.bool.isRequired
    }).isRequired,
    deleteNota: PropTypes.func.isRequired,
    editNotaCheck: PropTypes.func.isRequired
};

export default TaskItem