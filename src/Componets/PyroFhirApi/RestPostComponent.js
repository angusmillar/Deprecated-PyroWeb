import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import { Table } from 'semantic-ui-react'

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

export default class RestPostComponent extends React.Component {

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

        const VerbName = 'POST';
        const VerbColor = 'green';
        const Description = `Add a new ${this.props.resourceName} resource to the server. The server will assign a new GUID as the resource id`;
        const GUID = UuidSupport.createGUID();
        const LastModified = DateTimeSupport.NowMomentDefault;

        // const _Path = this.props.resourceName;

        // ================= Request Setup ===========================================================

        const getRequestExampleURL = () => {
            return (
                <code>
                    <p>{`[Endpoint]/${this.props.resourceName}`}</p>
                </code>
            )
        }

        const getRequestHttpHeadersComponent = () => {
            if (!isNil(FhirConstant.PostRequestHeaders) && FhirConstant.PostRequestHeaders.length != 0) {
                return (
                    <RestHttpHeadersComponent
                        httpHeaders={FhirConstant.PostRequestHeaders}
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
                return FhirResourceExampleGenerator.getJsonResource(this.props.resourceName, null, null, null);
            } else if (FormatType === FormatSupport.FormatType.XML) {
                return FhirResourceExampleGenerator.getXmlResource(this.props.resourceName, null, null, null);
            } else {
                return `SyntaxLanguage was ${FormatType.toString()}, can not create example resource`;
            }
        }

        const getRequestBodyComponent = () => {
            const FormatRequired = FormatSupport.resolveFormatFromString(this.props.contentTypeElement.props.value)
            return (
                <RestBodyComponent
                    userMessage={<p>{`The new ${this.props.resourceName} resource that is to be added to the FHIR server`}</p>}
                    resourceName={this.props.resourceName}
                    isBundleResource={false}
                    formatType={FormatRequired}
                    resourceData={getRequestExampleResource(FormatRequired)}
                    color={'violet'}
                />
            )

        }

        // ================= Response Setup ===========================================================

        const getBodyCreatedExampleResource = (FormatType) => {
            if (FormatType === FormatSupport.FormatType.JSON) {
                return FhirResourceExampleGenerator.getJsonResource(this.props.resourceName, GUID, '1', LastModified);
            } else if (FormatType === FormatSupport.FormatType.XML) {
                return FhirResourceExampleGenerator.getXmlResource(this.props.resourceName, GUID, '1', LastModified);
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

        const getResponseBodyCreatedComponent = (Color) => {
            const FormatRequired = FormatSupport.resolveFormatFromString(this.props.acceptResponseElement.props.value)
            return (
                <RestBodyComponent
                    userMessage={<p>{`The new ${this.props.resourceName} resources as it was added to the server. The server will have assigned it a new resource id and marked it as version 1.`}</p>}
                    resourceName={this.props.resourceName}
                    isBundleResource={true}
                    formatType={FormatRequired}
                    resourceData={getBodyCreatedExampleResource(FormatRequired)}
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

        const getResponseCreatedHeadersComponent = (Color) => {
            return (
                <RestHttpHeadersComponent
                    httpHeaders={FhirConstant.postResponseHeaders(this.props.endpointUrl, this.props.resourceName, GUID, LastModified)}
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

        const getStatusCreatedComponent = () => {
            const HttpStatus = HttpConstant.getStatusCodeByNumber('201');
            return (
                <RestHttpStatusComponent
                    userMessage={<div>
                        <p>The request was successful and a new {this.props.resourceName} resource is added to the FHIR server with a newly assigned GUID as it&#39;s resource id and version set to 1.</p>
                        <p>The {this.props.resourceName} resource is echoed back in the response body with it&#39;s newly assigned resource id and version set to 1.
                        The resource version and location including assigned resource id can also be found in the returned headers</p>
                    </div>}
                    statusNumber={HttpStatus.number}
                    statusText={HttpStatus.description}
                    statusColor={HttpStatus.color}
                    headerComponent={getResponseCreatedHeadersComponent(HttpStatus.color)}
                    bodyComponent={getResponseBodyCreatedComponent(HttpStatus.color)}
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
            const Created = getStatusCreatedComponent();
            const Bad = getStatusBadRequestComponent()

            return { Created, Bad }
        }



        // ================= Render Table Body Setup ===========================================================


        const renderGetSearchTableBody = (Expand) => {
            if (Expand) {
                const StatusComponentArray = getStatusComponentArray();
                return (
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell colSpan='16'>{Description}</Table.Cell>
                        </Table.Row>
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
                tableHeadingComponent={renderTableHeader(VerbName, VerbColor, this.props.resourceName)}
                tableHeadingTitle={VerbName}
                tableColorType={VerbColor}
                tableColorInverted={false}
                tableRowsFunction={renderGetSearchTableBody}
            />
        )
    }

}
