import React from 'react';
import AuthService from '../utils/auth';
import {Link, withRouter} from 'react-router-dom';


class Login extends React.Component {
    state = {
        username: '',
        password: ''
    }

    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const {username, password} = this.state;
        const authService = new AuthService();
        authService.login(username, password)
        .then((response) => {
            //Lifting the state up to app.js
            //setCurrentUser comes as a prop from app.js
            this.props.setCurrentUser(response.data);
            //save user id browser local storage
            localStorage.setItem('loggedInUser', response.data._id);
            this.props.history.push('/projects');

        })

        .catch(() => {
          console.log('Invalid Login');
        })
    }


    render() {
        return(
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Username:</label>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    <label>Password:</label>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button>Login</button>
                </form>
                <p>Don't have account? 
                    <Link to={"/signup"}> Signup</Link>
                </p>
            </div>
        )
    }

}



export default withRouter(Login);