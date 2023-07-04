import './App.css';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Todo from './pages/Todo';
import Register from './pages/Register';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <Router>
        <div className="App">
            <div className='flex flex-col min-h-[100vh] w-full items-center justify-center h-[100vh]'>
                <Routes>
                    <Route exact={false} path={'/'} element={ <Todo /> }/>
                    <Route exact={true} path={'/login'} element={ <Login /> }/>
                    <Route exact={true} path={'/register'} element={ <Register /> }/>
                    <Route exact={false} path={'*'} element={ <ErrorPage /> }/>
                </Routes>
            </div>
        </div>
    </Router>
  );
}

export default App;
