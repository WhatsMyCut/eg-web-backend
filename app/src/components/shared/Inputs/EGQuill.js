import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class EGQuill extends Component {
  
    handleChange = (value) => {
		const { onChange } = this.props;
		onChange({target: {value: value}})
    }
  
    render() {
		const {label, value} = this.props;
      	return (
			<div className="ui fluid labeled input" style={{ display: "flex", flexDirection: "row", marginBottom: "5px" }}>
				<strong className="ui label label">{label}</strong>
				<ReactQuill value={value} onChange={this.handleChange} style={styles.quill} />
			</div>
      )
    }
  }

  export default EGQuill;

  const styles = {
	quill: {
		width: '100%',
		height: '100%',
		border: "1px solid rgba(34,36,38,.15)",
		borderLeftColor: "transparent",
		borderBottomRightRadius: ".28571429rem",
		borderTopRightRadius: ".28571429rem",
	  },
}