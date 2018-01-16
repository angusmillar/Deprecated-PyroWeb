import React from 'react';
import PropTypes from 'prop-types';
import DateTimeSupport from '../../SupportTools/DateTimeSupport'
import { Table, Label, Flag } from 'semantic-ui-react'
import map from 'lodash/map';
import isNil from 'lodash/isNil';
//import filter from 'lodash/filter'
import upperFirst from 'lodash/upperFirst';
import toLower from 'lodash/toLower';


import MetadataHeaderTableRow from './MetadataHeaderTableRow'
import ContactDetails_Table from '../FhirComponent/ComplexType/ContactPoint/ContactDetails_Table'
import FhirCodeableConcept from '../FhirComponent/ComplexType/CodeableConcept/CodeableConcept'
import Formats_Table from './Formats_Table'
import Implementation_Table from './Implementation_Table'
import Software_Table from './Software_Table'
import Rest_Table from './Rest_Table'


class MetadataHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const dateTimeFormated = (Value) => {
            return (
                Value &&
                DateTimeSupport.dateTimeHumanReadable(this.props.Date)
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

        const renderContact = (Contacts) => {
            if (isNil(Contacts)) {
                return null
            }
            else {
                return (
                    map(Contacts, (Contact, Index) => {
                        return (
                            <ContactDetails_Table key={Index} Telecom={Contact.telecom} Name={`Contact: ${Contact.name}`} />
                        )
                    }
                    ))
            }
        };

        const renderRest = (Rest) => {
            if (isNil(Rest)) {
                return null;
            } else {
                return (
                    map(Rest, (RestItem, Index) => {
                        return (
                            <Rest_Table key={Index} rest={RestItem} />
                        )
                    })
                )
            }
        };

        return (
            <div>
                <Table singleLine >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell><h3>Server Name</h3></Table.HeaderCell>
                            <Table.HeaderCell><b><h3>{this.props.Name}</h3></b></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
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
                        {tableRow('AcceptUnknown', this.props.AcceptUnknown)}
                        {jurisdictionRows(this.props.Jurisdiction)}
                    </Table.Body>
                </Table>
                {renderContact(this.props.Contact)}
                <Software_Table software={this.props.Software} />
                <Implementation_Table Implementation={this.props.Implementation} />
                <Formats_Table Format={this.props.Format} />
                {renderRest(this.props.Rest)}
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
    AcceptUnknown: PropTypes.string,
    Contact: PropTypes.array,
    Jurisdiction: PropTypes.array,
    Software: PropTypes.object,
    Implementation: PropTypes.object,
    Format: PropTypes.array,
    Rest: PropTypes.array
}



export default MetadataHeader;  
