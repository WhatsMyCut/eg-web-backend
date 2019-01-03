import React from "react";
import { TextArea } from "semantic-ui-react/dist/commonjs";

const EGTextArea = props => (
	<div className="ui fluid labeled input" style={{ display: "flex", flexDirection: "row", marginBottom: "5px" }}>
		<strong className="ui label label">{props.label}</strong>
		<TextArea
			onChange={event => {props.onChange(event)}}
			value={props.value}
			label={props.label}
			style={styles.textArea}
		/>
	</div>
);
  
export default EGTextArea;

const styles = {
	textArea: {
		flex: 1,
		border: "1px solid rgba(34,36,38,.15)",
		borderLeftColor: "transparent",
		borderBottomRightRadius: ".28571429rem",
		borderTopRightRadius: ".28571429rem",
		paddingTop: "0.678571em",
		paddingRight: "1em",
		paddingBottom: "0.678571em",
		paddingLeft: "1em"
	  },
}