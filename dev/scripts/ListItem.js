import React from 'react';

export default function ListItem(props) {
	return(
		<div className="wrapper">
		<div className="uniqueListContainer">
			<li className="listItem">
				<div className="postedItem">{props.data.item}</div>
				<div className="postedNotes">{props.data.notes}</div>
			<button className="removeListItem" onClick={() => props.remove(props.data)}><i className="fa fa-times" aria-hidden="true"> remove</i>
			</button>
			</li>
		</div>
		</div>
	)
}


