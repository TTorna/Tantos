import {MdClose, MdEdit} from 'react-icons/md'
import {useState} from 'react'
import PropTypes from 'prop-types';

const TaskItem = ({ nota, deleteNota, editNotaCheck, toggleCheck }) => {
    const [showInfo, setShowInfo] = useState(nota.info)
    const [check, setCheck] = useState(nota.checked)

    function checkAll () {
        const checkAux = !check
        setCheck(checkAux),
        toggleCheck(nota.id, checkAux)
    }
    
    return (
        <>
        {}
        <div className={ nota.programmed ? (check ? 'nota programmed check' : 'nota programmed') : "nota"}>
            <div className='items'>
                <span>{nota.hora}</span>
                <span className={check ? 'actOn' : 'actOff'} onClick={() => {checkAll()}}>{nota.actividad.length > 15 ? `${nota.actividad.substring(0, 14)}...` : nota.actividad}</span>
                <a href='#' onClick={() => {setShowInfo(!showInfo)}}>info.</a>
                <div className='icons'>
                    <MdClose className='icon' onClick={()=>deleteNota(nota.id)}/>
                    <MdEdit className='icon' onClick={()=>{editNotaCheck(nota.id, showInfo)}}/>
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
        info: PropTypes.bool.isRequired,
        programmed: PropTypes.bool.isRequired
    }).isRequired,
    deleteNota: PropTypes.func.isRequired,
    editNotaCheck: PropTypes.func.isRequired,
    toggleCheck: PropTypes.func.isRequired
};

export default TaskItem