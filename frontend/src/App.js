
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Admin from './pages/Admin';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Navbar/>
      <div className="pages">
        <Routes>
          <Route
            path='/'
            element = {<Home/>}
          />
          <Route
          path='/admin'
           element = {<Admin/>}/>
        </Routes>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
