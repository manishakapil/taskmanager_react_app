import './App.css';
import { Routes, Route } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import TaskList from './components/TaskList';
import UserForm from './components/UserForm';

function App() {
  return (
    <div  >
      <div >
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/add-task" element={<TaskList />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
