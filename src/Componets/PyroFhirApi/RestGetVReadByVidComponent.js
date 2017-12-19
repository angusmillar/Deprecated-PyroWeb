import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'semantic-ui-react'

import Expandable_Table from '../Reusable/Table/Expandable_Table';
import RestVerbHeaderComponent from './RestVerbHeaderComponent';
import RestRequestComponent from './RestRequestComponent';
import RestResponsesComponent from './RestResponsesComponent';
import FhirConstant from '../../Constants/FhirConstant';

class RestGetVReadByVidComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {    
        const VerbGetName = 'GET';
        const _VerbGetColor = 'blue';                
        const _Description = `Return a ${this.props.resourceName} resource history instance by resource id of [id] and version of [vid]`;                
        const _RequestHttpHeaders = [
            { name: 'Content-Type', value: 'application/fhir+xml', moreInfo: `${FhirConstant.STU3_SpecWebsite}/http.html#mime-type` },
            { name: 'Accept', value: 'application/fhir+xml', moreInfo: `${FhirConstant.STU3_SpecWebsite}/http.html#mime-type` }
        ];
        const _exampleRequests = [
            '/[id]/_history/[vid]'
        ];
        const renderGetByIdTableBody = (Expand) => {
            if (Expand) {                
                return (
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell colSpan='16'>{_Description}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell colSpan='16'>
                                <RestRequestComponent
                                    resourceName={this.props.resourceName}
                                    httpHeaders={_RequestHttpHeaders}
                                    searchParameters={this.props.searchParameters}
                                    exampleRequests={_exampleRequests}
                                    color={_VerbGetColor} />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell colSpan='16'>
                                <RestResponsesComponent color={_VerbGetColor} />
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                )
            } else {
                return null;
            }
        };

        const renderTableHeader = (Verb, Color, Path) => {
            return (
                <RestVerbHeaderComponent
                    verb={Verb}
                    color={Color}
                    path={Path}
                />
            )
        };

        return (
            <Expandable_Table
                tableHeadingComponent={renderTableHeader(VerbGetName, _VerbGetColor, `${this.props.resourceName}/[id]/_history/[vid]`)}
                tableHeadingTitle={VerbGetName}
                tableColorType={_VerbGetColor}
                tableColorInverted={false}
                tableRowsFunction={renderGetByIdTableBody}
            />
        )
    }
}

//Type Checking
RestGetVReadByVidComponent.propTypes = {    
    resourceName: PropTypes.string.isRequired,
    searchParameters: PropTypes.array
}

RestGetVReadByVidComponent.defaultProps = {
}

export default RestGetVReadByVidComponent;  
