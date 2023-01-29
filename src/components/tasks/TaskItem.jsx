import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import moment from 'moment';
import classes from './TaskItem.module.scss';

function TaskItem({ task, deleteItem }) {
  const [isCompleted, setIsCompleted] = useState(task.completed);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxClick = async () => {
    try {
      setIsLoading(true);
      await axios.put(`/api/tasks/${task._id}`, {
        completed: !isCompleted,
      });
      setIsCompleted(!isCompleted);
      toast.success('task updated successfully');
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <tr className={classes.task_item}>
      <td className={classes.task_name}>
        <div className={classes.checkbox} onChange={handleCheckboxClick} role="checkbox" aria-checked disabled={isLoading}>
          <input type="checkbox" checked={isCompleted} tabIndex={-1} readOnly disabled={isLoading} />
        </div>
        <p>{task.title}</p>
      </td>
      <td>{isCompleted ? 'completed' : 'incomplete'}</td>
      <td>{moment(task.createdAt).format('MM Do YY')}</td>
      <td>
        <button className={classes.deleteBtn} type="button" onClick={() => deleteItem(task._id)}>Delete</button>
      </td>
    </tr>
  );
}

export default TaskItem;
