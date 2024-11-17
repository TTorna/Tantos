import useState from "react";
import PropTypes from 'prop-types';

function TaskInput ({ addTask }) {
    const [task, setTask] = useState('');
    
    console.log(task);
    function handleInputValue(event){
        setTask(event.target.value)
    }

    function handleAddTask(event){
        event.preventDefault();
        if(task.trim() === '') return
        addTask(task)
        setTask('')
    }

    return(
    <form className="inputField" onSubmit={handleAddTask}>
    <input type="text"  value={task} placeholder="Add a new task" onChange={handleInputValue}/>
    <button>+</button>
  </form>);
}

TaskInput.propTypes = {
    addTask: PropTypes.func.isRequired,
  };

export default TaskInput