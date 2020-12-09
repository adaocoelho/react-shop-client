import axios from 'axios';


class AuthService {
    constructor() {
        let service = axios.create({
            baseURL: `${process.env.REACT_APP_PROJECTS_API}/api`,
            //send authenticated encripted ino back to the server
            //this is setting set-cookie on the header request
            withCredentials: true
        });
        this.service = service;
    }

    signup = (username, password) => {
      //  console.log(process.env.REACT_APP_PROJECTS_API)
      return this.service.post('/signup', {username, password});
    }

    login =(username, password) => {
        return this.service.post('/login', {username, password})
    }

    logout = () => {
        return this.service.post('/logout');
     }

    //this return if the user is either with an active session or not 
    loggedin = () => {
         return this.service.get('/loggedin');
     }
}

export default AuthService;