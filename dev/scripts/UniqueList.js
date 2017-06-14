import React from 'react';
import NewListInformation from './NewListInformation.js';
import ListItem from './ListItem.js';
 import {
    BrowserRouter as Router,
    NavLink as Link,
    Route 
} from 'react-router-dom';


export default class UniqueList extends React.Component {
	constructor(){
		super();
		this.state = {
			item: "",
			items: [],
			notes: ""
		}

		this.handleChange = this.handleChange.bind(this);
		this.addItem = this.addItem.bind(this);
		this.removeItem = this.removeItem.bind(this);
		this.logout = this.logout.bind(this);
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value  
		});
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

	componentDidMount() {
		const dbRef = firebase.database().ref();
		firebase.auth().onAuthStateChanged((user) => {
			if(user) {

		firebase.database().ref(`${this.props.match.params.list_key}`).on('value',(res) => {
			const dataFromFirebase = res.val();
			const eventTitle = dataFromFirebase.listName;
			const eventInstructions = dataFromFirebase.listDescription;
			const eventList = dataFromFirebase['items'];
			const listArray = [];

			for(let itemKey in eventList) {
				const individualItemKey = eventList[itemKey];
				individualItemKey.key = itemKey;
				listArray.push(individualItemKey);
			}

			this.setState ({
				listName: eventTitle,
				listDescription: eventInstructions,
				items: listArray
			})
		})
		}
             
    })

}
		addItem(e) {
			e.preventDefault();
			const listItem = {
				item: this.state.item,
				notes: this.state.notes
			};

			const dbRef = firebase.database().ref();
			firebase.database().ref(`${this.props.match.params.list_key}/items`).push(listItem);

			this.setState({
				item: "",
				notes: ""
			})
		}
		removeItem(itemToRemove) {
			const dbRef = firebase.database().ref(`${this.props.match.params.list_key}/items/${itemToRemove.key}`);
			dbRef.remove();
		}
		render() {
		return(
			<div className="uniqueList wrapper">
			<button className="logOut" onClick={this.logout}>Log Out</button>
				<h1 className="uniqueListTitle">{this.state.listName}</h1>
				<h2 className="uniqueListInfo">{this.state.listDescription}</h2>
					<div className="formContainer">
						<form className="toDoList" onSubmit={this.addItem}>
							<label className="labelItem" htmlFor="item">Item:</label>
							<input className="inputItem" type="text" name="item" onChange={this.handleChange} value={this.state.item} required autoComplete="off" placeholder="e.g Cheese"/>

							<label className="labelNote" htmlFor="note">Notes:</label>
							<input className="inputNote" type="text" name="notes" onChange={this.handleChange} value={this.state.notes} autoComplete="off" placeholder="e.g parmesan"/>

							<button className="listButton">Add Item</button>

							<ul className="ulList">

							{this.state.items.map((item)=>{
								return <ListItem data={item} remove={this.removeItem} key={item.key} />
							})}

							</ul>

						</form>	
					</div>
			</div>
		)
	}
}

		
