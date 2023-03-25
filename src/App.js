import logo from './logo.svg';
import './App.css';
import Home from './Home'
import Device from './DeviceDetails'
import Login from './login'
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/Home" element={<Home/>}/>
          <Route exact path="/device" element={<Device/>}/>
        </Routes>
    </div>
  );
}

export default App;
