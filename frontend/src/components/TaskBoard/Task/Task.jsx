import React from 'react';

import './Task.scss';

const Task = ({ task, index }) => {
  return (
    <div className="task">
      {task.task}
    </div>
  )
}

export default Task;