/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/
/**
 * This component is the name of a component and a pin that will pin that component to all toolbars.
 *
 */
import React from "react";

const Tag = props => {
	const remove = () => {
		props.removeTag(props.name);
	}

	return (
		<div className='app-tag'>
			<div className='tag-content'>
				<div className='tag-name'>{props.name}</div>
				<div className='tag-delete' onClick={remove}>x</div>
			</div>
		</div>
	);
}

export default Tag;