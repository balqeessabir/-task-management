import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import TaskItem from './TaskItem';
import classes from './TaskList.module.scss';

function TaskList() {
  const [taskList, setTaskList] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTask, setNewTask] = useState('');

  const addNewTask = async (e) => {
    e.preventDefault();
    if (newTask.lenth <= 0) {
      toast.error('Task is empty');
      return;
    }
    try {
      const { data } = await axios.post('/api/tasks', {
        title: newTask,
      });
      toast.success('New task created');
      setTaskList([{ ...data }, ...taskList]);
      setNewTask('');
      setIsAddingNew(false);
    } catch (err) {
      console.log(err);
    }
  };

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

  const addNewButtonClick = async () => {
    setIsAddingNew(true);
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
      {isAddingNew && (
        <form className={classes.addNewForm} onSubmit={addNewTask}>
          <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Task Title" />
          <button type="submit">Add</button>
        </form>
      )}
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
