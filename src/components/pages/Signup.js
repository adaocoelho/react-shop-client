import React from 'react';
import AuthService from '../utils/auth';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';


class Signup extends React.Component {
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
        const authService = new AuthService();
        authService.signup(this.state.username, this.state.password)
            .then(() => {
                this.props.history.push('/success'); //redirecionar apos signup
            })
            .catch(() => {
                
            })
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Username:</label>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    <label>Password:</label>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <Button type="submit">Signup</Button>
                </form>
                <p>Already have account? 
                    <Link to={"/login"}> Login</Link>
                </p>
          </div>
        )
      }
}

export default withRouter(Signup);