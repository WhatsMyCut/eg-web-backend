import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Table as SUITable } from 'semantic-ui-react';
import to from 'to-case';
import { colors } from '../../constants/colors';
import { lib } from '../../lib/Lib';
import { withRouter } from 'react-router-dom';

import { maxWidthMediaQuery } from '../../constants/responsive';

const Table = styled(SUITable)`
  /* https://css-tricks.com/responsive-data-tables/ */

  ${({ collapsable }) => collapsable && maxWidthMediaQuery.tablet`
      table, thead, tbody, th, td, tr { 
        display: block; 
      }
      
      thead tr { 
        position: absolute;
        top: -9999px;
        left: -9999px;
      }
      
      tr { border: 1px solid #ccc; }
      
      td { 
        display: flex;
        justify-content: space-between;
        border: none;
        border-bottom: 1px solid #eee; 
        position: relative;
        padding-left: 50%; 
      }

      td.mobile-center {
        justify-content: center;
      }

      td:before { 
        width: 45%; 
        padding-right: 10px; 
        white-space: nowrap;
      }
      
      ${({ cellHeaderTitles }) => cellHeaderTitles.map((title, i) => `
        td:nth-of-type(${i + 1}):before {
          content: "${to.title(title)}";
          font-weight: bold;
        }
      `)}
  `}
`;

@withRouter
class EGTable extends React.Component {
  static propTypes = {
    collapsable: PropTypes.bool,
    editable: PropTypes.bool,
    edit: PropTypes.func,
  }
  
  componentWillReceiveProps(nextProps){
    this.setState({
      data: nextProps.data
    })
  }

  render() {
    const {
      headings,
      data,
      style,
      leftAlignColumns,
      editable,
      edit,
      collapsable
    } = this.props;
    return (
      <div
        className="container"
        style={{ ...styles.container, ...style }}
      >
        <Table celled unstackable collapsable={collapsable} /*cellHeaderTitles={headings}*/>
          <Table.Header>
            <Table.Row>
              {headings.map(heading => (
                <Table.HeaderCell
                  style={{ color: colors.darkBlue }}
                  key={`${heading.replace(/\s/g, '')}-heading`}
                >
                  {heading}
                </Table.HeaderCell>
              ))}
              {editable && <Table.HeaderCell />}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((rowItem, rowIndex) => (
              <Table.Row key={`row-${rowIndex}`}>
                {headings.map((fieldName, columnIndex) => {
                  return (
                    <Table.Cell
                      style={{
                        textAlign: lib.arrayIncludes(
                          leftAlignColumns,
                          columnIndex
                        )
                          ? 'left'
                          : 'right'
                      }}
                      key={`${fieldName}-${columnIndex}`}
                    >
                      {this.getContent(rowItem, fieldName, columnIndex)}
                    </Table.Cell>
                  );
                })}
                {editable && (
                  <Table.Cell
                    className="mobile-center"
                    style={{ color: colors.darkBlue, cursor: 'pointer' }}
                    onClick={() => edit(rowItem.ID)}
                  >
                    Edit
                  </Table.Cell>
                )}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }

  handleHyperlinkClick = (rowItem, columnIndex) => {
    const hyperlinkFunction = this.getColumnFunction(
      this.props.hyperlinkFunctions,
      columnIndex
    );
    if (hyperlinkFunction) {
      hyperlinkFunction(rowItem);
    }
  };

  //Returns either a hyperlink or plain text to the cell depending
  //on whether or not this column has been specified as a
  //hyperlink. Hyperlinks will be given the onClick function that
  //was passed in.
  getContent = (rowItem, fieldName, index) => {
    const { history } = this.props;
    //Is this a hyperlink column?
    if(lib.arrayIncludes(this.props.hyperlinkColumns, index)){
      return (
        <a
          style={{ cursor: 'pointer' }}
          onClick={() => {
            this.handleHyperlinkClick(rowItem, index);
          }}
        >
          {this.getText(rowItem, fieldName, index)}
        </a>
      )

    } else{
      return (
        this.getText(rowItem, fieldName, index)
      )
    }
  };

  //Checks to see if this cell's column has been specified for
  //special formatting. If so, it applies it using the formatting
  //function that was passed in.
  getText = (rowItem, fieldName, columnIndex) => {
    const value = rowItem[fieldName.replace(/\s/g, '')];
    let formatFunction;
    
    if (lib.arrayIncludes(this.props.formatColumns, columnIndex)) {
      
      formatFunction = this.getColumnFunction(
        this.props.formatFunctions,
        columnIndex
      );
      if (formatFunction) {
        return formatFunction(value);
      } else {

        return value;
      }
    } else {
        if(typeof value === 'boolean'){
            return lib.trueFalseToYesNo(value);
        } else{
            return value;
        }
    }
  };

  //Returns the passed in function for the specific cell index
  //from the array of handlerObjects passed in.
  getColumnFunction = (handlerObjects, cellIndex) => {
    
    const getHandlerObj = cellObj => {
      return cellObj.index === cellIndex;
    };

    const handlerObj = handlerObjects.filter(getHandlerObj)[0];
    return handlerObj ? handlerObj.fn : null;
  };
}

const styles = {
  container: {
    width: '100%',
    height: 'auto'
  },
  header: {
    fontFamily: ['Open Sans', 'sans-serif'],
    fontSize: '0.9rem',
    lineHeight: '24px',
    letterSpacing: '1.5%',
    color: colors.darkBlue
  }
};

export default EGTable;
