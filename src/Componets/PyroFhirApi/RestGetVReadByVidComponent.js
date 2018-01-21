import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import { Table } from 'semantic-ui-react';

import Expandable_Table from '../Reusable/Table/Expandable_Table';
import RestVerbHeaderComponent from './RestVerbHeaderComponent';
import RestHttpStatusComponent from './RestHttpStatusComponent';
import FhirResourceExampleGenerator from './FhirResourceExampleGenerator';
import ResponseComponent from './ResponseComponent';
import RequestComponent from './RequestComponent';
import RestHttpHeadersComponent from './RestHttpHeadersComponent';
import RestBodyComponent from './RestBodyComponent';

import UuidSupport from '../../SupportTools/UuidSupport';
import DateTimeSupport from '../../SupportTools/DateTimeSupport';
import FhirConstant from '../../Constants/FhirConstant';
import HttpConstant from '../../Constants/HttpConstant';
import FormatSupport from '../../SupportTools/FormatSupport';


export default class RestGetVReadByVidComponent extends React.Component {

    static propTypes = {
        resourceName: PropTypes.string.isRequired,
        endpointUrl: PropTypes.string.isRequired,
        contentTypeElement: PropTypes.element.isRequired,
        acceptElement: PropTypes.element.isRequired,
        acceptResponseElement: PropTypes.element.isRequired,
    }

    static defaultProps = {
    }

    constructor(props) {
        super(props);
    }

    render() {

        const VerbGetName = 'GET';
        const _VerbGetColor = 'blue';
        const PathSyntax = `${this.props.resourceName}/[id]/_history/[vid]`
        const GUID = UuidSupport.createGUID();
        const LastModified = DateTimeSupport.NowMomentDefault;
        const ResourceResponseVersion = 1;
        // ================= Request Setup ===========================================================

        const getRequestExampleURL = () => {
            return (
                <code>
                    <p>{`[Endpoint URL]/${this.props.resourceName}/${GUID}/_history/${ResourceResponseVersion}`}</p>
                </code>
            )
        }

        const getRequestHttpHeadersComponent = () => {
            if (!isNil(FhirConstant.GetRequestHeaders) && FhirConstant.GetRequestHeaders.length != 0) {
                return (
                    <RestHttpHeadersComponent
                        httpHeaders={FhirConstant.GetRequestHeaders}
                        contentTypeElement={this.props.contentTypeElement}
                        acceptElement={this.props.acceptElement}
                        color={'violet'} />
                )
            } else {
                return null;
            }
        };


        // ================= Response Setup ===========================================================

        const getBodyOkExampleResource = (FormatType) => {
            if (FormatType === FormatSupport.FormatType.JSON) {
                return FhirResourceExampleGenerator.getJsonResource(this.props.resourceName, GUID, ResourceResponseVersion.toString(), LastModified);
            } else if (FormatType === FormatSupport.FormatType.XML) {
                return FhirResourceExampleGenerator.getXmlResource(this.props.resourceName, GUID, ResourceResponseVersion.toString(), LastModified);
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
                return `SyntaxLanguage was ${FormatType.toString()}, can not create example ${FhirConstant.OperationOutcomeResourceName} resource`;
            }
        }

        const getResponseBodyOkComponent = (Color) => {
            const FormatRequired = FormatSupport.resolveFormatFromString(this.props.acceptResponseElement.props.value)
            return (
                <RestBodyComponent
                    userMessage={<p>{`The history ${this.props.resourceName} resource instance for the resource id and version number requested`}</p>}
                    resourceName={this.props.resourceName}
                    isBundleResource={false}
                    formatType={FormatRequired}
                    resourceData={getBodyOkExampleResource(FormatRequired)}
                    color={Color}
                />
            )

        }

        const getResponseBodyBadRequestComponent = (Color) => {
            const FormatRequired = FormatSupport.resolveFormatFromString(this.props.acceptResponseElement.props.value)
            return (
                <RestBodyComponent
                    exampleMessage={<p>{`An ${FhirConstant.OperationOutcomeResourceName} resource containing information about the error that has occured.`}</p>}
                    resourceName={FhirConstant.OperationOutcomeResourceName}
                    isBundleResource={false}
                    formatType={FormatRequired}
                    resourceData={getBodyBadRequestExampleResource(FormatRequired)}
                    color={Color}
                />
            )

        }

        const getResponseOkHeadersComponent = (Color) => {
            return (
                <RestHttpHeadersComponent
                    httpHeaders={FhirConstant.postResponseHeaders(this.props.endpointUrl, this.props.resourceName, GUID, LastModified, ResourceResponseVersion)}
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
            return (
                <RestHttpStatusComponent
                    userMessage={<div>
                        <p>The request was successful and a history {this.props.resourceName} resource instance with the resource [id] and [vid] requested is returned.</p>
                    </div>}
                    statusNumber={HttpStatus.number}
                    statusText={HttpStatus.description}
                    statusColor={HttpStatus.color}
                    headerComponent={getResponseOkHeadersComponent(HttpStatus.color)}
                    bodyComponent={getResponseBodyOkComponent(HttpStatus.color)}
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

        const getStatusNotFoundRequestComponent = () => {
            const HttpStatus = HttpConstant.getStatusCodeByNumber('404');
            return (
                <RestHttpStatusComponent
                    userMessage={<div>
                        <p>The resource with the requested <code>[id]</code> and <code>[vid]</code>is not found in the FHIR server.</p>
                        <p>This could occur due to either the [id] or the [vid] not being found in the FHIR server</p>
                    </div>}
                    statusNumber={HttpStatus.number}
                    statusText={HttpStatus.description}
                    statusColor={HttpStatus.color}
                />
            )
        }

        const getStatusComponentArray = () => {
            const OK = getStatusOKComponent();
            const NotFound = getStatusNotFoundRequestComponent();            
            const Bad = getStatusBadRequestComponent();
            return { OK, NotFound, Bad }
        }



        // ================= Render Table Body Setup ===========================================================


        const renderGetByIdComponentBody = (Expand) => {
            if (Expand) {
                const StatusComponentArray = getStatusComponentArray();
                const description = `Return a history ${this.props.resourceName} resources instance with the resource [id] and version [vid] equal to the id and vid given in the request URL `;
                return (
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell colSpan='16'>{description}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell colSpan='16'>
                                <RequestComponent
                                    exampleComponet={getRequestExampleURL()}
                                    headersComponent={getRequestHttpHeadersComponent()}
                                    bodyComponent={null}
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
                tableHeadingComponent={renderTableHeader(VerbGetName, _VerbGetColor, PathSyntax)}
                tableHeadingTitle={VerbGetName}
                tableColorType={_VerbGetColor}
                tableColorInverted={false}
                tableRowsFunction={renderGetByIdComponentBody}
            />
        )
    }

}
