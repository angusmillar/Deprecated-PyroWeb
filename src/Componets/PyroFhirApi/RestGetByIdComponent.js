import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'semantic-ui-react'

import Expandable_Table from '../Reusable/Table/Expandable_Table';
import RestVerbHeaderComponent from './RestVerbHeaderComponent';
import RestRequestComponent from './RestRequestComponent';
import RestResponsesComponent from './RestResponsesComponent';
import FhirConstant from '../../Constants/FhirConstant';

class RestGetByIdComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {    
        const VerbGetName = 'GET';
        const _VerbGetColor = 'blue';                
        const _RequestHttpHeaders = [
            { name: 'Content-Type', value: 'application/fhir+xml', moreInfo: `${FhirConstant.STU3_SpecWebsite}/http.html#mime-type` },
            { name: 'Accept', value: 'application/fhir+xml', moreInfo: `${FhirConstant.STU3_SpecWebsite}/http.html#mime-type` },
            { name: 'If-Modified-Since', value: 'Wed, 21 Oct 2015 07:28:00 GMT', moreInfo: `${FhirConstant.STU3_SpecWebsite}/http.html#cread` },
            { name: 'If-None-Match', value: 'W/"5"', moreInfo: `${FhirConstant.STU3_SpecWebsite}/http.html#cread` }
        ];
        const _exampleRequests = [
            '/[id]'
        ];
        // const _ResponseHttpHeaders = [
        //     { name: 'ETag', value: 'my etag' },
        //     { name: 'LastModified', value: 'bla bla bla' }
        // ];

        const renderGetByIdTableBody = (Expand) => {
            if (Expand) {
                const description = `Return a ${this.props.resourceName} resource with the resource id of [id]`;
                return (
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell colSpan='16'>{description}</Table.Cell>
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
                tableHeadingComponent={renderTableHeader(VerbGetName, _VerbGetColor, `${this.props.resourceName}/[id]`)}
                tableHeadingTitle={VerbGetName}
                tableColorType={_VerbGetColor}
                tableColorInverted={false}
                tableRowsFunction={renderGetByIdTableBody}
            />
        )
    }
}

//Type Checking
RestGetByIdComponent.propTypes = {    
    resourceName: PropTypes.string.isRequired,
    searchParameters: PropTypes.array
}

RestGetByIdComponent.defaultProps = {
}

export default RestGetByIdComponent;  
