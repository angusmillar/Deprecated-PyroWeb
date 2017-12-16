import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react'
import isNil from 'lodash/isNil';
import map from 'lodash/map';

import FhirConstant from '../../Constants/FhirConstant';

class RestParametersComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {


        const renderParameters = () => {
            if (isNil(this.props.parameters)) {
                return null;
            } else {
                return (
                    map(this.props.parameters, (Parameter, Index) => {
                        const name = Parameter.name;
                        const type = Parameter.type;
                        const FhirTypeWebLink = `${FhirConstant.STU3_SpecWebsite}/search.html#${type}`;
                        const documentation = Parameter.documentation;
                        return (
                            <Table.Row key={Index}>
                                <Table.Cell width='4' verticalAlign='top'>
                                    <span><code>{name}</code></span>
                                </Table.Cell>
                                <Table.Cell width='4' verticalAlign='top' >
                                    <code><a as='a' href={FhirTypeWebLink} rel="noopener noreferrer" target='_blank'>{type}</a></code>                                    
                                </Table.Cell>
                                <Table.Cell width='8' verticalAlign='top' >
                                    <p>{documentation}</p>
                                </Table.Cell>
                            </Table.Row>
                        )
                    }
                    )
                )
            }
        };



        return (
            <Table color={this.props.color}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan='3' size='tiny'>Parameters</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell width='4'>Name</Table.HeaderCell>
                        <Table.HeaderCell width='4'>FHIR Type</Table.HeaderCell>
                        <Table.HeaderCell width='8'>Description</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {renderParameters()}
                </Table.Body>
            </Table>
        )
    }
}

RestParametersComponent.propTypes = {
    parameters: PropTypes.array.isRequired,
    color: PropTypes.string,
}

export default RestParametersComponent;  
