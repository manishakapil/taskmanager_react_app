import { useState, useEffect } from 'react';
import AddTask from './AddTask';
import ShowTask from './ShowTask';
import Header from './Header';
import '../App.css'
import { useLocation } from 'react-router-dom';


function TaskList(props) {
  const location = useLocation();
  const { firstName, lastName } = location.state;
  const [task, setTask] = useState("");
  const [tasklist, setTasklist] = useState(JSON.parse(localStorage.getItem('tasklist')) || []);
  const [editid, setEditid] = useState(0);
  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('theme')) || "medium");
 
  const handleSubmit = (event) => {
    event.preventDefault();    

    if(editid){
      const date = new Date();
      const selectedTask = tasklist.find(task => task.id === editid);
      const updateTask = tasklist.map((e) => (e.id === selectedTask.id ? (e = {id: e.id, name: task, time: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`}) : {id: e.id, name: e.name, time: e.time}));
      setTasklist(updateTask);
      setEditid(0);
      setTask("");
      return;
    }

    if(task){
      const date = new Date();
      setTasklist([...tasklist, {id: date.getTime(), name: task, time: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`}]);
      setTask("");
    }

  }

  const handleEdit = (id) => {
    const selectedTask = tasklist.find(task => task.id === id);
    setTask(selectedTask.name);
    setEditid(id);
  }

  const handleDelete = (id) => {
    const updatedTasklist = tasklist.filter(task => task.id !== id);
    setTasklist(updatedTasklist);
  }

  useEffect(() => {
    localStorage.setItem('tasklist', JSON.stringify(tasklist));
  }, [tasklist]);

  

  return (
    <div className={"App " + theme}>
      <div className="container">
        <Header setTheme={setTheme} theme={theme}>
          TASK MANAGER
        </Header>
        <h2 className='welcome_msg' >Welcome {firstName} {lastName} to your task manager.</h2>
        <AddTask handleSubmit={handleSubmit} editid={editid} task={task} setTask={setTask}/>
        <ShowTask tasklist={tasklist} setTasklist={setTasklist} handleEdit={handleEdit} handleDelete={handleDelete}/>
      </div>
    </div>
  );
}

export default TaskList ;
