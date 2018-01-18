import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react'
import isNil from 'lodash/isNil';
import map from 'lodash/map';

import FhirConstant from '../../Constants/FhirConstant';
import Expandable_Table from '../Reusable/Table/Expandable_Table';
import WebLink from '../Reusable/WebLink/WebLink';

class RestParametersComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const renderSubHeading = () => {
            return(
                <Table.Row>
                    <Table.HeaderCell width='4'>Name</Table.HeaderCell>
                    <Table.HeaderCell width='4'>FHIR Type</Table.HeaderCell>
                    <Table.HeaderCell width='8'>Description</Table.HeaderCell>
                </Table.Row>
            )
        };

        const renderParameterRows = () => {
            if (isNil(this.props.parameters)) {
                return null;
            } else {
                return (
                    map(this.props.parameters, (Parameter, Index) => {
                        const name = Parameter.name;
                        const type = Parameter.type;
                        const FhirTypeWebLink = `${FhirConstant.STU3_SpecWebsiteUrl}/search.html#${type}`;
                        const documentation = Parameter.documentation;
                        return (
                            <Table.Row key={Index}>
                                <Table.Cell width='4' verticalAlign='top'>
                                    <span><p>{name}</p></span>
                                </Table.Cell>
                                <Table.Cell width='4' verticalAlign='top' >
                                
                                    <p><WebLink newTab={true} url={FhirTypeWebLink} display={type}/></p>
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

        const renderParametersRowsBody = (Expand) => {
            if (isNil(this.props.parameters)) {
                return null;
            } else {
                if (Expand) {
                    return (
                        <Table.Body>
                          {renderParameterRows()}
                        </Table.Body>
                    )
                } else {
                    return null;
                }                                    
            }
        };

        return (
            <Expandable_Table
                tableHeadingTitle='Search Parameters'
                tableHeadingIconType='search'
                tableSubHeadingComponent={renderSubHeading}
                tableRowsFunction={renderParametersRowsBody}
                tableColorType={this.props.color}
            />
        )     
        
    }
}

RestParametersComponent.propTypes = {
    parameters: PropTypes.array.isRequired,
    color: PropTypes.string,
}

export default RestParametersComponent;  
