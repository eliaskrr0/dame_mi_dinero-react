import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavbarView from './vista/NavbarView';
import InicioView from './vista/InicioView';

function App() {
  return (
    <div className="App">
      <Router>
        <NavbarView/>
        <Routes>
          <Route path='/' element={<InicioView/>}/>

        </Routes>

      </Router>      
    </div>
  );
}

export default App;
