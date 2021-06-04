import './Login.css';
import Register from './Register';
import { useState, useEffect } from "react";
import Axios from "axios";
//import { Link, Route } from 'react-router-dom';

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const[loggedIn, setLoggedIn] = useState(false);
  const[loginStatus, setLoginStatus] = useState("null");

  const [isRegistering, setIsRegistering] = useState(false);

    /*const saveRegistrationDataHandler = (enteredExpenseData) => {
        const expenseData = {
            ...enteredExpenseData,
            id: Math.random().toString()
        };
        //props.onAddExpense(expenseData); //lifting state up
    };*/

  const startRegistrationHandler = () => {
      setIsRegistering(true);
  }

  const stopRegistrationHandler = () => {
      setIsRegistering(false);

  }

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username, password: password
    }).then((response) => {
      if(response.data.message){
        setLoginStatus(response.data.message);
      }else{
        setLoginStatus(response.data[0].username);
        setLoggedIn(true);
      }

    });
  };

  const logout = () => {
    setLoginStatus(false); 
    localStorage.setItem("token", "null");
  }

  useEffect (() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      
      if (response.data.loggedIn === true){
        
      setLoginStatus(response.data.user[0].username);
      }
    }); 
  }, []);



  return (

    <div className="login-register-container">
        <div className="text-center">
            <h2 className="login-register-header">Sign in</h2>
        </div>
    
      <div className="login-register-form">

        <div className="form-group row">
          <label className="col-sm-3 col-form-label" >Username</label>
            <div className="col-sm-9">
              <input
                type="text"
                placeholder="Username..."
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
        </div> 

        <div className="form-group row">
          <label className="col-sm-3 col-form-label" >Password</label>
            <div className="col-sm-9">
              <input
                type="password"
                placeholder="Password..."
                onChange={(e) => {
                  setPassword(e.target.value);
                }} 
              />
            </div>   
        </div>

        {(loggedIn === true) && <button className="login-btn" onClick={logout}>LogOut</button> }
        <button className="login-btn" onClick={login}> Login </button>
    
      </div>

      <div >
      
            {!isRegistering && <button className="login-btn" onClick={startRegistrationHandler}>Register</button>}
            
            {isRegistering && <Register onCancel={stopRegistrationHandler}/>}
            
        </div>

        
        
    </div>


  );
}

export default Login;