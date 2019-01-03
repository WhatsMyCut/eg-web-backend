import React from "react";
import { Checkbox } from "semantic-ui-react/dist/commonjs";

const EGCheckbox = props => (
	<div style={{display: 'flex', flexDirection: 'row', marginBottom: '5px'}}>
		<strong>{props.label}</strong>
		<Checkbox
			checked={props.value}
			onChange={event => {props.onChange(event)}}
			style={{marginLeft: '5px'}}
			label=''
		/>
	</div>
)
  
export default EGCheckbox;