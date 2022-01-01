import React,{useState} from "react";
import { useHistory } from "react-router-dom";

function Login(props) {


    const [credentials, setCedentials] = useState({email:"",password:""})

    let history = useHistory()

    const onChange = (e) => {
        // e.target.name means 'name' attribute of the input tag becomes equals to the value of that input tag that we are entering . for eg. if name="title" than title :"value we are entering in the input tag" .
        // this is for getting the value of the input tag entered by user inorder to send it to the body through a state.
        setCedentials({ ...credentials, [e.target.name]: e.target.value });
        
      };

    const handleOnLogin = async (e)=>{
        e.preventDefault();
        // fetch("http://localhost/api/auth/login")
        const response = await fetch(`http://localhost/api/auth/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json' 
            },
            // {title,description,tag} is an object title:title , desc:desc ...... so on .
            body: JSON.stringify({email:credentials.email,password:credentials.password}) 
          });
  
          const json = await response.json();
          console.log(json)
          if(json.success){
            // save the authtoken & redirect to home page using useHistory hook.
            localStorage.setItem('token',json.authToken)
            history.push("/")
            props.showAlert("Logged in Successfuly" , "success")
          }
          else{
            props.showAlert("Invalid details" , "danger")
          }
    }

  return (
    <div className="container my-3">
      <h2>This is login page</h2>
      <form onSubmit={handleOnLogin}>
        <div className="mb-3">
          <label for="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label for="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
