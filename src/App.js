// import logo from './logo.svg';
import './App.css';
// 首先我们需要导入一些组件...

import { BrowserRouter ,Routes, Route, Link } from 'react-router-dom'
import Home from './routes/Home'
import Manager from './routes/Manager'



const App = ()=>(
  <BrowserRouter>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/manager">Manager</Link>
        </li>
      </ul>

      <hr />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/manager" element={<Manager/>} />
      </Routes>
      
    </div>
  </BrowserRouter>
)

export default App;
