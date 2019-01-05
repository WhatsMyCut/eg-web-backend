import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { lib } from '../../../lib/Lib';

@withRouter
class EGDropdown extends React.Component {
    state = {
        options: convertToUsableObject(this.props.options),
        currentValues: this.props.currentValues || [],
        addingOption: false
    }

    //Handles a newly selected value.
    handleChange = (e, { value }) => {
        let time = 0;
        const optionAdditionCheck = setInterval(() => {
            if(!this.state.addingOption){
                const { multiple } = this.props;
                clearInterval(optionAdditionCheck);
                const valueChange = multiple ? getValueChange(this.state.currentValues, value, this.props.id) : {'action': 'change', 'value' : value};
                
                this.setState({ currentValues: value }, () => {
                //If a callback to update values was given, call it.
                if (this.props.onChange) {
                    this.props.onChange(valueChange);
                }
                });
            }
        }, 50);
    }

    //Always update with the next props.
    componentWillReceiveProps(nextProps){
        this.setState({
            options: convertToUsableObject(nextProps.options),
            currentValues: nextProps.currentValues
        })
    }

    render() {
        const { currentValues, options, addingOption } = this.state
        const { label, multiple } = this.props;
        return (
            <div className="ui fluid labeled input" style={{display: 'flex', flexDirection: 'row', marginBottom: '5px'}}>
				<strong className="ui label label" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>{label}</strong>
                {multiple ? 
                <Dropdown
                    options={options}
                    placeholder={label || 'Select an Option'}
                    search
                    selection
                    fluid
                    multiple
                    value={currentValues}
                    onChange={this.handleChange}
                    disabled={addingOption}
                    style={styles.dropdown}
                /> :
                <Dropdown
                    options={options}
                    placeholder={label || 'Select an Option'}
                    search
                    selection
                    fluid
                    value={currentValues}
                    onChange={this.handleChange}
                    disabled={addingOption}
                    style={styles.dropdown}
                />}
            </div>
        )
    }
}

//Options must have a key, text, and value. If the object doesn't
//have either of the three, it will use the value to populate the others.
//Good for arrays of strings.
const convertToUsableObject = values => {
    if(Array.isArray(values) && values[0]){
      if(values[0].key && values[0].text && values[0].value){
          return values;
      } else{
          return values.map(value => {
              return {
                  key: value.key || value,
                  text: value.text || value,
                  value: value.value || value
              }
          })
      }
    } else{
        return [];
    }
}

//Finds the diff between two arrays and returns an object with
//what occurred. Example: (action: 'add', value: 'cool', id: 5)
const getValueChange = (array1, array2, id) => {

    var array = []

    for (var i = 0; i < array1.length; i++) {
        array[array1[i]] = true;
    }

    for (var i = 0; i < array2.length; i++) {
        if (array[array2[i]]) {
            delete array[array2[i]];
        } else {
            array[array2[i]] = true;
        }
    }

    const newValue = Object.keys(array)[0]

    if(lib.arrayIncludes(array1, newValue)){
        return {action: 'remove', value : newValue, id: id};
    } else{
        return {action: 'add', value: newValue, id: id}
    }
}

export default EGDropdown;

const styles = {
    dropdown: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        border: "1px solid rgba(34,36,38,.15)",
        borderLeftColor: "transparent",
        borderBottomRightRadius: ".28571429rem",
        borderTopRightRadius: ".28571429rem",
        paddingTop: '0.22619em',
        paddingRight: '2.1em',
        paddingBottom: '0.22619em',
        paddingLeft: '0.357143em'
      }
}