import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import TaskItem from './TaskItem';
import classes from './TaskList.module.scss';

function TaskList() {
  const [taskList, setTaskList] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTask, setNewTask] = useState('');

  const getTasks = async () => {
    try {
      const { data } = await axios.get('/api/tasks/myTasks');
      setTaskList(
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      await axios.delete(`api/tasks/${id}`);
      toast.success('Task deleted');
      setTaskList(taskList.filter((task) => task._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className={classes.topBar}>
        <button type="button" className={classes.addNew} onClick={addNewButtonClick}>Add new</button>
      </div>
      {taskList.length > 0 ? (
        <table className={classes.taskList_table}>
          <tbody>
            {taskList.map((task) => (
              <TaskItem task={task} key={task._id} deleteItem={deleteTask} />
            ))}
          </tbody>
        </table>
      ) : 'No task found'}

    </div>
  );
}

export default TaskList;
