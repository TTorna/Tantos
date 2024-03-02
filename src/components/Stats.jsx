import PropTypes from 'prop-types';

function State ({ toDoList }) {
    let countList = toDoList.length
    return (
        <div className="stats">
            <p className="notify">
                {countList === 0 ? "No tasks left" : `${countList} tasks left`}
            </p>
        </div>
    );
}

State.propTypes = {
    toDoList: PropTypes.array.isRequired
};

export default State