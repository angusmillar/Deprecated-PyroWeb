import React from 'react';
import PropTypes from 'prop-types';
import MetadataHeaderTableRow from './MetadataHeaderTableRow'
import moment from 'moment'
import { Table, Label} from 'semantic-ui-react'

class MetadataHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const dateTimeFormated = (Value) => {
            return (
                Value &&
                moment(this.props.Date).format('DD-MMM-YYYY hh:mm:ss (Z)')
            )
        };


        const tableRow = (Label, Value) => {
            return (
                Value &&
                <MetadataHeaderTableRow RowLabel={Label} RowValue={Value} />
            )
        };

        

        return (
            <div>
                <Label as='a' color='black' ribbon><h4>Server Name</h4></Label>
                <span><b>{this.props.Name}</b></span>
                <Table singleLine >
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <Label ribbon color='blue'>Overview</Label>
                            </Table.Cell>
                        </Table.Row>
                        {tableRow('Description', this.props.Description)}
                        {tableRow('Publisher', this.props.Publisher)}
                        {tableRow('Copyright', this.props.Copyright)}                         
                        {tableRow('URL', this.props.Url)}     
                        {tableRow('Date', dateTimeFormated(this.props.Date))}
                        {tableRow('Server Version', this.props.Version)}                        
                        {tableRow('FHIR Version', this.props.FhirVersion)}
                        {tableRow('Status', this.props.Status)}
                        {tableRow('Experimental', this.props.Experimental.toString())}  
                        {tableRow('Purpose', this.props.Purpose)}                           
                        {tableRow('Kind', this.props.Kind)}  
                        
                    </Table.Body>
                </Table>
            </div>
        )
    }

}
//Type Checking
MetadataHeader.propTypes = {
    Name: PropTypes.string.isRequired,
    Date: PropTypes.string,
    Version: PropTypes.string.isRequired,
    FhirVersion: PropTypes.string.isRequired,
    Publisher: PropTypes.string,
    Description: PropTypes.string,
    Status: PropTypes.string,
    Experimental: PropTypes.bool,
    Url: PropTypes.string,
    Purpose: PropTypes.string,
    Copyright: PropTypes.string,
    Kind: PropTypes.string,
}



export default MetadataHeader;  
