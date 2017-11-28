import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react'

class MetadataHeaderTableRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Table.Row>
                <Table.Cell><b>{this.props.RowLabel}</b></Table.Cell>
                <Table.Cell textAlign='left' >{this.props.RowValue}</Table.Cell>
            </Table.Row>
        )
    }

}
//Type Checking
MetadataHeaderTableRow.propTypes = {
    RowLabel: PropTypes.string.isRequired,
    RowValue: PropTypes.string.isRequired,
    
}


export default MetadataHeaderTableRow;  
