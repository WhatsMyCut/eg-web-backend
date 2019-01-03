import React from "react";
import { Input } from "semantic-ui-react/dist/commonjs";

const EGTextBox = props => (
	<Input
		fluid
		value={props.value}
		label={props.label}
		placeholder={props.label}
		onChange={event => {props.onChange(event)}}
		style={{ marginBottom: "5px" }}
	/>
)
  
export default EGTextBox;