 import React from 'react';
 import {
    BrowserRouter as Router,
    NavLink as Link,
    Route 
} from 'react-router-dom';

export default function NewListInformation(props) {
    if(props.data.listKey !== "") {
        return (
            <div className="listInfo wrapper">
                <p>You've created a new list called: <span className="listURL">{props.data.listName}</span></p>
                <p className="clickLink">Share this link with your friends to collaborate:</p>
                <Link className="uniqueLink" to={`/list/${props.data.listKey}`}>http://localhost:3000/{props.data.listKey}</Link>
            </div>   
        )    
    }   else {
            return <div></div>
        }
}

