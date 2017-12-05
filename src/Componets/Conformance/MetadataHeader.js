import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'
import { Table, Label, Flag } from 'semantic-ui-react'
import map from 'lodash/map';
import isNil from 'lodash/isNil';
//import filter from 'lodash/filter'
import upperFirst from 'lodash/upperFirst';
import toLower from 'lodash/toLower';


import MetadataHeaderTableRow from './MetadataHeaderTableRow'
import ContactDetails_Table from '../FhirComponent/ComplexType/ContactPoint/ContactDetails_Table'
import FhirCodeableConcept from '../FhirComponent/ComplexType/CodeableConcept/CodeableConcept'

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
            if (isNil(Value)) {
                return null
            }
            else {
                return <MetadataHeaderTableRow RowLabel={upperFirst(Label)} RowValue={Value} />
            }
        };

        const jurisdictionRows = (JurisdictionList) => {
            if (isNil(JurisdictionList)) {
                return null
            }
            else {
                return (
                    map(JurisdictionList, (Jurisdiction, Index) => {
                        const CodeableConcept = new FhirCodeableConcept(Jurisdiction);
                        const flagCode = CodeableConcept.getCodeBySystem('urn:iso:std:iso:3166');
                        const getFlag = () => {
                            if (!isNil(flagCode)) {
                                return <Flag name={toLower(flagCode)} />
                            }
                            else {
                                return null;
                            }                            
                        }                        
                        const getJurisdictionText = CodeableConcept.getText;

                        return (
                            <Table.Row key={Index}>
                                <Table.Cell><b>Jurisdiction</b></Table.Cell>
                                <Table.Cell textAlign='left' >{getFlag()} {getJurisdictionText}</Table.Cell>
                            </Table.Row>
                        )
                    }
                    ))
            }
        };

        const renderContact = () => {
            if (isNil(this.props.Contact)) {
                return null
            }
            else {
                return (
                    map(this.props.Contact, (Contact, Index) => {
                        return (
                            <ContactDetails_Table key={Index} Telecom={Contact.telecom} Name={Contact.name} />
                        )
                    }
                    ))
            }
        };

        return (
            <div>
                <Label as='a' color='black' ribbon><h4>Server Name</h4></Label>
                <span><b>{this.props.Name}</b></span>
                <Table singleLine >
                    <Table.Body>
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
                        {jurisdictionRows(this.props.Jurisdiction)}
                    </Table.Body>
                </Table>
                {renderContact()}
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
    Contact: PropTypes.array,
    Jurisdiction: PropTypes.array,
}



export default MetadataHeader;  
