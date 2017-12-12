import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react'
import isNil from 'lodash/isNil';

class MetadataHeaderTableRow extends React.Component {
    constructor(props) {
        super(props);
    }

    

    render() {
    
        const detectType = (value) => {
            switch (typeof value) {
                case 'string':
                    return value;          
                case 'number':
                    return value.toString();          
                case 'object':
                    return value;          
                case 'boolean':
                    return value.toString();          
                default:
                    return value;
            }
        };
    
        if (isNil(this.props.RowValue)) {
            return null;
        } else {
            return (
                <Table.Row>
                    <Table.Cell colSpan='1'><b>{this.props.RowLabel}</b></Table.Cell>
                    <Table.Cell colSpan='2' textAlign='left' >{detectType(this.props.RowValue)}</Table.Cell>
                </Table.Row>
            )
        }    
    }

}
//Type Checking
MetadataHeaderTableRow.propTypes = {
    RowLabel: PropTypes.string.isRequired,
    RowValue: PropTypes.any,
    
}


export default MetadataHeaderTableRow;  
