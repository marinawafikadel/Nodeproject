import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./styles/style.css";
import axios from 'axios'
import { useNavigate} from "react-router-dom"; 

function App() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userData, setuserData] = useState([]);

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();
    let user=[]
    var { uname, pass } = document.forms[0];
    console.log(uname.value)
    console.log(pass.value)
  let result= await axios.post('http://localhost:9000/user', {
  username: uname.value,
  password: pass.value
})
console.log(result.data.data)
    // Find user login info
    //const userData = database.find((user) => user.username === uname.value);
    setuserData(result.data.data)
    let dataobj=result.data.data
    // Compare user info
    if (dataobj!=undefined) {
      let password=dataobj.password
      if (password !== pass.value) {
        // Invalid password
        console.log(password)
        console.log(pass.value)
        setErrorMessages({ name: "pass", message: errors.pass });
        console.log("error")
      } else {
        setIsSubmitted(true);
        console.log("trueee")
        navigate('/Home',{ state:{role: dataobj.role}});
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

    let navigate=useNavigate()
  const navigateToDevice = () => {
    // 👇️ navigate to /Device
    if(isSubmitted){
      console.log(userData)
      console.log(userData.role)
      navigate('/Home',{ state:{role: userData.role}});
    }
    else{
    navigate('/');
    }
  };

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
  

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {renderForm}
      </div>
    </div>
  );
}

export default App;