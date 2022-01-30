
import './App.css';
import Homepage from './components/homepage/homepage';
import Login from './components/login/login';
import Register from './components/register/register';

import {
  BrowserRouter as Router,
  Routes,
  Route, 
  Navigate
} from "react-router-dom";
import {useState, useEffect} from 'react';

function App() {

const [user, setLoginUser] = useState({})

// updation for user logged-in, in local storage (from line 19-30)

// checking the setLoginUser detail from stored data which are stored in "MyUser"
useEffect(() => {
  setLoginUser(JSON.parse(localStorage.getItem("MyUser")))
}, [])

// creating a myUser in local storage for storing tha data after login
const updateUser = (user) => {
  localStorage.setItem("MyUser", JSON.stringify(user))
  setLoginUser(user)
}
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* updating setLoginUser to updateUser for checking, That user previously Login or not */}
          <Route exact path='/' element={user && user._id ? <Homepage updateUser={updateUser}/> : <Login updateUser={updateUser}/>} />
          <Route path='/login' element={<Login updateUser={updateUser}/>}/>
          <Route path='/register' element={<Register/>}/> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
