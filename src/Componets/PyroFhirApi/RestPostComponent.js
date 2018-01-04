import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'semantic-ui-react'

import Expandable_Table from '../Reusable/Table/Expandable_Table';
import RestVerbHeaderComponent from './RestVerbHeaderComponent';
import RestRequestComponent2 from './RestRequestComponent2';
import RestResponsesComponent from './RestResponseComponent';

import FhirConstant from '../../Constants/FhirConstant';

export default class RestPostComponent extends React.Component {

    static propTypes = {
        resourceName: PropTypes.string.isRequired,
        endpointUrl: PropTypes.string.isRequired,
        contentTypeElement: PropTypes.element.isRequired,
        selectedContentType: PropTypes.string.isRequired,
        acceptElement: PropTypes.element.isRequired,
        searchParameters: PropTypes.array
    }

    static defaultProps = {
    }

    constructor(props) {
        super(props);
    }

    render() {
        const VerbGetName = 'POST';
        const _VerbColor = 'green';
        const _Description = `Add a ${this.props.resourceName} resource to the server. The server will assign a new GUID as the resource id`;
        const _Path = this.props.resourceName;

        const renderGetSearchTableBody = (Expand) => {            
            if (Expand) {
                return (
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell colSpan='16'>{_Description}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell colSpan='16'>
                                <RestRequestComponent2
                                    resourceName={this.props.resourceName}
                                    httpHeaders={FhirConstant.PostRequestHeaders}
                                    searchParameters={this.props.searchParameters}
                                    contentTypeElement={this.props.contentTypeElement}
                                    selectedContentType={this.props.selectedContentType}
                                    acceptElement={this.props.acceptElement}
                                    includeHttpBody={true}
                                />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell colSpan='16'>
                                <RestResponsesComponent
                                    resourceName={this.props.resourceName}
                                    endpointUrl={this.props.endpointUrl}
                                    httpHeaders={FhirConstant.postResponseHeaders(this.props.endpointUrl, this.props.resourceName)}
                                    // For the response we switch the ContentType to be the Accept Type as the server returns us content as per what we asked 
                                    // for with the Accept header on the request.
                                    // While this is technical correct it may confuse users as when they change the dropdown for Content-Type within the response
                                    // Headers section they might not relise or understand that what they are actualy also changing it the request's Accept type.
                                    // For now I will leave this like this becasue it is correct. If this is a problem then maybe I will have to do work to 
                                    // make the Content-Type in the response header not a dropdown so they can not chnage it there.
                                    contentTypeElement={this.props.acceptElement}
                                    selectedContentType={this.props.acceptElement.props.value}
                                    acceptElement={this.props.acceptElement}
                                />
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
                tableHeadingComponent={renderTableHeader(VerbGetName, _VerbColor, _Path)}
                tableHeadingTitle={VerbGetName}
                tableColorType={_VerbColor}
                tableColorInverted={false}
                tableRowsFunction={renderGetSearchTableBody}
            />
        )
    }

}