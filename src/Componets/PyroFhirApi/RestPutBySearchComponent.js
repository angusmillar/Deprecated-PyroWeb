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
import UuidSupport from '../../SupportTools/UuidSupport'
import DateTimeSupport from '../../SupportTools/DateTimeSupport'

export default class RestPutBySearchComponent extends React.Component {

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

        const VerbName = 'PUT';
        const VerbColor = 'orange';
        const VerbPath = `${this.props.resourceName}?{search}`;
        const Description = `Create or Update an ${this.props.resourceName} resource in the FHIR server with the resource [id] provided in the request URL. The resource must also contain the same resource id as found in the URL.`;
        const GUID = UuidSupport.createGUID();
        const LastModified = DateTimeSupport.NowMomentDefault;

        // const _Path = this.props.resourceName;

        // ================= Request Setup ===========================================================

        const getRequestExampleURL = () => {
            return (
                <code>
                    <p>{`[Endpoint]/${this.props.resourceName}?SearchParameterName=value&SearchParameterName=value`}</p>
                </code>
            )
        }

        const getRequestHttpHeadersComponent = () => {
            if (!isNil(FhirConstant.PutRequestHeaders) && FhirConstant.PutRequestHeaders.length != 0) {
                return (
                    <RestHttpHeadersComponent
                        httpHeaders={FhirConstant.PutRequestHeaders}
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

        const getRequestExampleResource = (FormatType) => {
            if (FormatType === FormatSupport.FormatType.JSON) {
                return FhirResourceExampleGenerator.getJsonResource(this.props.resourceName, GUID, null, null);
            } else if (FormatType === FormatSupport.FormatType.XML) {
                return FhirResourceExampleGenerator.getXmlResource(this.props.resourceName, GUID, null, null);
            } else {
                return `SyntaxLanguage was ${FormatType.toString()}, can not create example resource`;
            }
        }

        const getRequestBodyComponent = () => {
            const FormatRequired = FormatSupport.resolveFormatFromString(this.props.contentTypeElement.props.value)
            return (
                <RestBodyComponent
                    userMessage={<p>{`The ${this.props.resourceName} resource that is to be added or updated in the FHIR server`}</p>}
                    resourceName={this.props.resourceName}
                    isBundleResource={false}
                    formatType={FormatRequired}
                    resourceData={getRequestExampleResource(FormatRequired)}
                    color={'violet'}
                />
            )

        }

        // ================= Response Setup ===========================================================

        const getBodyOkExampleResource = (FormatType, ResourceVersion) => {
            if (FormatType === FormatSupport.FormatType.JSON) {
                return FhirResourceExampleGenerator.getJsonResource(this.props.resourceName, GUID, ResourceVersion, LastModified);
            } else if (FormatType === FormatSupport.FormatType.XML) {
                return FhirResourceExampleGenerator.getXmlResource(this.props.resourceName, GUID, ResourceVersion, LastModified);
            } else {
                return `SyntaxLanguage was ${FormatType.toString()}, can not create example resource`;
            }
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

        const getResponseBodyComponent = (Color, ResourceVersion) => {
            const FormatRequired = FormatSupport.resolveFormatFromString(this.props.acceptResponseElement.props.value)
            return (
                <RestBodyComponent
                    userMessage={<p>{`The ${this.props.resourceName} resources as added to the server`}</p>}
                    resourceName={this.props.resourceName}
                    isBundleResource={true}
                    formatType={FormatRequired}
                    resourceData={getBodyOkExampleResource(FormatRequired, ResourceVersion)}
                    color={Color}
                />
            )
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

        const getResponseHeadersComponent = (Color, ResourceVersion) => {
            return (
                <RestHttpHeadersComponent
                    httpHeaders={FhirConstant.postResponseHeaders(this.props.endpointUrl, this.props.resourceName, GUID, LastModified, ResourceVersion)}
                    contentTypeElement={this.props.acceptResponseElement}
                    acceptElement={null}
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

        const getStatusOKComponent = () => {
            const HttpStatus = HttpConstant.getStatusCodeByNumber('200');
            const UpdatedResourceVersionNumber = '3';
            return (
                <RestHttpStatusComponent
                    userMessage={<div>
                        <p>The request was successful and the {this.props.resourceName} resource has been updated in the FHIR server and assigned the next sequential version number relative to the server.</p>
                        <p>The updated {this.props.resourceName} resource is echoed back in the response body with a newly assigned version number.
                        The resource version and location can also be found in the returned headers</p>
                    </div>}
                    statusNumber={HttpStatus.number}
                    statusText={HttpStatus.description}
                    statusColor={HttpStatus.color}
                    headerComponent={getResponseHeadersComponent(HttpStatus.color, UpdatedResourceVersionNumber)}
                    bodyComponent={getResponseBodyComponent(HttpStatus.color, UpdatedResourceVersionNumber)}
                />
            )

        }

        const getStatusCreatedComponent = () => {
            const HttpStatus = HttpConstant.getStatusCodeByNumber('201');
            const CreatedResourceVersionNumber = '1';
            return (
                <RestHttpStatusComponent
                    userMessage={<div>
                        <p>The request was successful. As there was no {this.props.resourceName} resource in the FHIR server with the [id] provided,
                        the server has added the resource as new using the resource [id] provided. The server will have set the version to 1</p>
                        <p>The {this.props.resourceName} resource is echoed back in the response body with the assigned [id] as provided in the request URL and resource. The version is set to 1.
                        The resource version and location can also be found in the returned headers</p>
                    </div>}
                    statusNumber={HttpStatus.number}
                    statusText={HttpStatus.description}
                    statusColor={HttpStatus.color}
                    headerComponent={getResponseHeadersComponent(HttpStatus.color, CreatedResourceVersionNumber)}
                    bodyComponent={getResponseBodyComponent(HttpStatus.color, CreatedResourceVersionNumber)}
                />
            )

        }

        const getStatusBadRequestComponent = () => {
            const HttpStatus = HttpConstant.getStatusCodeByNumber('400');
            return (
                <RestHttpStatusComponent
                    userMessage={<div>
                        <p>Some form of error has occured with the request. An {FhirConstant.OperationOutcomeResourceName} resource will be return indicating what went wrong.</p>
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
            const OK = getStatusOKComponent();
            const Created = getStatusCreatedComponent();
            const Bad = getStatusBadRequestComponent()

            return { Created, OK, Bad }
        }

        const getSearchTableDescription = () => {
            return (
                <Table.Row>
                    <Table.Cell colSpan='16'>
                        <p>Update an existing resource based on some identification criteria, rather than by logical id.</p>
                        <p>When the server processes this update, it performs a search using its standard search facilities for the resource type, with the goal of resolving a single logical id for this request. The action it takes depends on how many matches are found:</p>
                        <List bulleted>
                            <List.Item><b>No matches:</b> The server performs a create interaction</List.Item>
                            <List.Item><b>One Match:</b> The server performs the update against the matching resource</List.Item>
                            <List.Item><b>Multiple matches:</b> The server returns a 412 Precondition Failed error indicating the client's criteria were not selective enough</List.Item>
                        </List>
                        <p>This variant can be used to allow a stateless client (such as an interface engine) to submit updated results to a server, without having to remember the logical ids that the server has assigned. For example, a client updating the status of a lab result from &quot;preliminary&quot; to &quot;final&quot; might submit the finalized result using <code><b>PUT:</b>/Observation?identifier=http://my-lab-system|123</code></p>
                    </Table.Cell>
                </Table.Row>
            )
        }


        // ================= Render Table Body Setup ===========================================================


        const renderGetSearchTableBody = (Expand) => {
            if (Expand) {
                const StatusComponentArray = getStatusComponentArray();
                return (
                    <Table.Body>
                        {getSearchTableDescription()}
                        <Table.Row>
                            <Table.Cell colSpan='16'>
                                <RequestComponent
                                    exampleComponet={getRequestExampleURL()}
                                    headersComponent={getRequestHttpHeadersComponent()}
                                    SearchParametersComponent={getRequestSearchParametersComponent()}
                                    bodyComponent={getRequestBodyComponent()}
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
                tableRowsFunction={renderGetSearchTableBody}
            />
        )
    }

}
