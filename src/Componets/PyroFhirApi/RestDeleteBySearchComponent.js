import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import { Table, List } from 'semantic-ui-react'

import Expandable_Table from '../Reusable/Table/Expandable_Table';
import RestVerbHeaderComponent from './RestVerbHeaderComponent';
import RestHttpStatusComponent from './RestHttpStatusComponent'
import FhirResourceExampleGenerator from './FhirResourceExampleGenerator'
import ResponseComponent from './ResponseComponent'
import RequestComponent from './RequestComponent'
import RestHttpHeadersComponent from './RestHttpHeadersComponent'
import RestBodyComponent from './RestBodyComponent'
import RestParametersComponent from './RestParametersComponent'

import FhirConstant from '../../Constants/FhirConstant';
import HttpConstant from '../../Constants/HttpConstant';
import FormatSupport from '../../SupportTools/FormatSupport';

export default class RestDeleteBySearchComponent extends React.Component {

    static propTypes = {
        resourceName: PropTypes.string.isRequired,
        endpointUrl: PropTypes.string.isRequired,
        contentTypeElement: PropTypes.element.isRequired,
        acceptElement: PropTypes.element.isRequired,
        acceptResponseElement: PropTypes.element.isRequired,
        searchParameters: PropTypes.array
    }

    static defaultProps = {
    }

    constructor(props) {
        super(props);
    }

    render() {

        const VerbName = 'DELETE';
        const VerbColor = 'red';
        const VerbPath = `/${this.props.resourceName}?{search}`;
        
        // ================= Request Setup ===========================================================

        const getRequestExampleURL = () => {
            return (
                <code>
                    <p>{`[Endpoint]/${this.props.resourceName}?name=value&name=value`}</p>
                </code>
            )
        }

        const getRequestHttpHeadersComponent = () => {
            if (!isNil(FhirConstant.DeleteRequestHeaders) && FhirConstant.DeleteRequestHeaders.length != 0) {
                return (
                    <RestHttpHeadersComponent
                        httpHeaders={FhirConstant.DeleteRequestHeaders}
                        contentTypeElement={this.props.contentTypeElement}
                        acceptElement={this.props.acceptElement}
                        color={'violet'} />
                )
            } else {
                return null;
            }
        };

        const getRequestSearchParametersComponent = () => {
            if (!isNil(this.props.searchParameters) && this.props.searchParameters.length != 0) {
                return (
                    <RestParametersComponent
                        parameters={this.props.searchParameters}
                        color={'violet'}
                    />
                )
            } else {
                return null;
            }
        };
       

        // ================= Response Setup ===========================================================

        const getStatusNoContentComponent = () => {
            const HttpStatus = HttpConstant.getStatusCodeByNumber('204');
            return (
                <RestHttpStatusComponent
                    userMessage={<div>
                        <p>The deletion has been successful and none, one or more resources have been deleted from the server.</p>                        
                    </div>}
                    statusNumber={HttpStatus.number}
                    statusText={HttpStatus.description}
                    statusColor={HttpStatus.color}
                    // headerComponent={getResponseNoContentHeadersComponent(HttpStatus.color)}                    
                />
            )

        }

        
        const getBodyBadRequestExampleResource = (FormatType) => {
            if (FormatType === FormatSupport.FormatType.JSON) {
                return FhirResourceExampleGenerator.getJsonOperationOutcome();
            } else if (FormatType === FormatSupport.FormatType.XML) {
                return FhirResourceExampleGenerator.getXmlOperationOutcome();
            } else {
                return `SyntaxLanguage was ${FormatType.toString()}, can not create example ${FhirConstant.OperationOutcomeResourceNam} resource`;
            }
        }

        const getResponseBodyBadRequestComponent = (Color) => {
            const FormatRequired = FormatSupport.resolveFormatFromString(this.props.acceptResponseElement.props.value)
            return (
                <RestBodyComponent
                    userMessage={<p>{`An ${FhirConstant.OperationOutcomeResourceName} resource containing information about the error that has occured.`}</p>}
                    resourceName={FhirConstant.OperationOutcomeResourceName}
                    isBundleResource={true}
                    formatType={FormatRequired}
                    resourceData={getBodyBadRequestExampleResource(FormatRequired)}
                    color={Color}
                />
            )

        }
        
        const getResponseBadRequestHeadersComponent = (Color) => {
            return (
                <RestHttpHeadersComponent
                    httpHeaders={FhirConstant.responseOperationOutcomeHeaders()}
                    contentTypeElement={this.props.acceptResponseElement}
                    acceptElement={null}
                    color={Color}
                />
            )
        }
       
        const getStatusPreconditionFailedComponent = () => {
            const HttpStatus = HttpConstant.getStatusCodeByNumber('412');
            return (
                <RestHttpStatusComponent
                    userMessage={<div>
                        <p>No resources are deleted as either no search parameters were supplied or a supplied search parameters was not understood by the server.</p>
                    </div>}
                    statusNumber={HttpStatus.number}
                    statusText={HttpStatus.description}
                    statusColor={HttpStatus.color}                    
                />
            )

        }

        const getStatusBadRequestComponent = () => {
            const HttpStatus = HttpConstant.getStatusCodeByNumber('400');
            return (
                <RestHttpStatusComponent
                    userMessage={<div>
                        <p>Some form of error has occured with the request. An {FhirConstant.OperationOutcomeResourceName} resource
                        will be return indicating what went wrong.</p>
                    </div>}
                    statusNumber={HttpStatus.number}
                    statusText={HttpStatus.description}
                    statusColor={HttpStatus.color}
                    headerComponent={getResponseBadRequestHeadersComponent(HttpStatus.color)}
                    bodyComponent={getResponseBodyBadRequestComponent(HttpStatus.color)}
                />
            )

        }

        const getStatusComponentArray = () => {
            const NoContent = getStatusNoContentComponent();
            const PreconditionFailed = getStatusPreconditionFailedComponent();
            const Bad = getStatusBadRequestComponent()

            return { NoContent, PreconditionFailed, Bad }
        }



        // ================= Render Table Body Setup ===========================================================

        const getDeleteSearchTableDescription = () => {
            return (
                <Table.Row>
                    <Table.Cell colSpan='16'>
                        <p>Delete an existing resource based on some selection criteria, rather than by a specific logical id.
                            To accomplish this, the client issues an HTTP DELETE as shown:</p>
                        <p><code><b>DELETE:</b>{`/${this.props.resourceName}?{search parameters}`}</code></p>
                        <p>When the server processes this delete, it performs a search as specified using the standard search
                            facilities for the resource type. The action it takes depends on how many matches are found:</p>
                        <List bulleted>
                            <List.Item><b>No matches or One match:</b> The server performs an ordinary delete on the matching resource</List.Item>                            
                            <List.Item><b>Multiple matches:</b> The servers deletes all the matching resources.</List.Item>
                        </List>
                        <p>This server also has a extra rule not documented in the FHIR specification. This delete operation must be given at least one
                            resource defined search parameter to work and all parameters must be understood by the server. If not a HTTP status code
                            of 412 Precondition Failed will be returned.<br /></p>                            
                    </Table.Cell>
                </Table.Row>
            )
        }

        const renderDeleteSearchTableBody = (Expand) => {
            if (Expand) {
                const StatusComponentArray = getStatusComponentArray();
                return (
                    <Table.Body>
                        {getDeleteSearchTableDescription()}
                        <Table.Row>
                            <Table.Cell colSpan='16'>
                                <RequestComponent
                                    exampleComponet={getRequestExampleURL()}
                                    headersComponent={getRequestHttpHeadersComponent()}
                                    SearchParametersComponent={getRequestSearchParametersComponent()}                                    
                                />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell colSpan='16'>
                                <ResponseComponent
                                    statusComponentArray={StatusComponentArray}
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
                tableHeadingComponent={renderTableHeader(VerbName, VerbColor, VerbPath)}
                tableHeadingTitle={VerbName}
                tableColorType={VerbColor}
                tableColorInverted={false}
                tableRowsFunction={renderDeleteSearchTableBody}
            />
        )
    }

}
