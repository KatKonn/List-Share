import React from 'react';
import ReactDOM from 'react-dom';
import { ajax } from 'jquery';
import {
    BrowserRouter as Router,
    NavLink as Link,
    Route 
} from 'react-router-dom';
import NewListInformation from './NewListInformation.js';
import UniqueList from './UniqueList.js';
import ListItem from './ListItem.js';

 let config = {
    apiKey: "AIzaSyAd3qETcHkQ50n-07Bm4QrAxmQHP0quuks",
    authDomain: "listshare-22a9e.firebaseapp.com",
    databaseURL: "https://listshare-22a9e.firebaseio.com",
    projectId: "listshare-22a9e",
    storageBucket: "listshare-22a9e.appspot.com",
    messagingSenderId: "657375983121"
  };

firebase.initializeApp(config); 

const auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();


class App extends React.Component {
    	constructor () {
    		super();
    		this.state = {
    			listName: '',
    			listDescription: '',
    			listKey: '',
                loggedIn: false,
                user: null
    		}
            this.signup = this.signup.bind(this);
            this.login = this.login.bind(this);
            this.logout = this.logout.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
    		this.handleChange = this.handleChange.bind(this);
    	}
        componentDidMount() {
           const dbRef = firebase.database().ref();
           firebase.auth().onAuthStateChanged((user) => {
            console.log(user);
                if(user) {
                    this.setState({
                        loggedIn: true,
                        user:user
                    });
                }
            })
        }
        handleChange(e) {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
        handleSubmit(e) {
            e.preventDefault();
            const newList = {
                listName: this.state.listName,
                listDescription: this.state.listDescription,
                listKey: this.state.listKey 
            };
            const dbRef = firebase.database().ref();
            const reference = dbRef.push(newList);
            const listKey = reference.getKey();
            this.setState({
                listKey: listKey 
            })
        }
      
        signup(e) {
            e.preventDefault();
            if(this.state.password === this.state.confirm) {
                firebase.auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((data) => {
                    console.log(data);
                });
            }
        }
        login(e) {
            e.preventDefault();
            firebase.auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((data) => {
                console.log(data);
            }) 

        }

        logout(e){
        auth.signOut()
            .then(() =>{
                this.setState({
                    user: null,
                    loggedIn: false
                });
            });
    }

    render()  {
        let newList = (
            <div className="wrapper dashboard">
             <button className="logOut" onClick={this.logout}>Log Out</button>
             <main>
                <h1 className="titleTwo">List Collab <i className="fa fa-pencil-square-o" aria-hidden="true"></i></h1>
                <h2 className="subTitle">Fill in the informaiton below and create a new list:</h2>

                    <form className="createList" onSubmit={this.handleSubmit}  action="">

                        <label className="titleLabel">Create a name for your list</label>
                        <input className="titleInput" type="text" name="listName" onChange={this.handleChange} placeholder="Kat's list" required autoComplete="off"/>

                        <label className="descriptionLabel">Write a description about your list</label>
                        <input className="descriptionInput" type="text" name="listDescription" onChange={this.handleChange} placeholder="eg. groceries" autoComplete="off" />

                        <button className="createButton">Create list</button>

                    </form>

                    <NewListInformation data={this.state} />
                </main>
                </div>
        )
        let loggedOut = (
            <div className="wrapper authForms">
            <header>
                <h1 className="titleTwo">List Collab <i className="fa fa-pencil-square-o" aria-hidden="true"></i></h1>
               <h2 className="subTitle">Sign up for an account or log-in to an existing one to begin using <span className="title">List Collab</span>.</h2>
            </header>
            <div className="formsContainer">
            <form onSubmit={this.signup} className="user-form">
                <p>New here? Sign up below:</p>
                            <label htmlFor="email">Email:</label>
                            <input type="email" name="email" onChange={this.handleChange}/>
                            <label htmlFor="password">Password: </label>
                            <input type="password" name="password" onChange={this.handleChange} />
                            <label htmlFor="confirm">Confirm Password: </label>
                            <input type="password" name="confirm" onChange={this.handleChange} />
                            <button>Sign Up</button>
                </form>
                <form onSubmit={this.login} className="user-form user-form2">
                    <p>Have an account? Log in below:</p>
                            <label htmlFor="email">Email: </label>
                            <input type="email" name="email" onChange={this.handleChange} />
                            <label htmlFor="password">Password: </label>
                            <input type="password" name="password" onChange={this.handleChange} />
                            <button>Log In</button>
                </form>
                </div>
            </div>
        )
        return (
            this.state.loggedIn === true ? newList : loggedOut
        )   
    }
}

ReactDOM.render (
    <Router>
        <div>
            <Route exact path="/" component={App}/>
            <Route path="/list/:list_key" component={UniqueList} />
        </div>
    </Router>,
   document.getElementById('app')
);
