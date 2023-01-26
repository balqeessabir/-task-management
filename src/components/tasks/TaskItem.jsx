import React, { useState } from 'react';
import classes from './TaskItem.module.scss';

function TaskItem({ task, deleteItem }) {
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);

  return (
    <tr className={classes.task_item}>
      <td className={classes.task_name}>
        <div className={classes.checkbox}>
          <input type="checkbox" checked={isCompleted} tabIndex={-1} readOnly />
        </div>
        <p>{task.title}</p>
      </td>
      <td>{isCompleted ? 'completed' : 'incomplete'}</td>
      <td>
        <button className={classes.deleteBtn} type="button" onClick={() => deleteItem(task._id)}>Delete</button>
      </td>
    </tr>
  );
}

export default TaskItem;
