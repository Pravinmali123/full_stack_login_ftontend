
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/login';
import Admin from './components/admin';
import Home from './components/home';
import Subadmin from './components/subadmin';

function App() {
  return (
   <BrowserRouter>

<Routes>
<Route path="/subadmin" element={<Subadmin/>}/>
<Route path="/register" element={<Register/>}/>
<Route path="/" element={<Login/>}/>
<Route path="/dashbord" element={<Admin/>}/>
<Route path="/home" element={<Home/>}/>

</Routes>

</BrowserRouter>
  );
}

export default App;
