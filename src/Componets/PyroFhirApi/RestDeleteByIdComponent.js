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

import FhirConstant from '../../Constants/FhirConstant';
import HttpConstant from '../../Constants/HttpConstant';
import FormatSupport from '../../SupportTools/FormatSupport';
import UuidSupport from '../../SupportTools/UuidSupport'


export default class RestDeleteByIdComponent extends React.Component {

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

        const VerbName = 'DELETE';
        const VerbColor = 'red';
        const Description = `Delete a ${this.props.resourceName} resource with the resource id of [id]`;
        const GUID = UuidSupport.createGUID();
        const DeletedResourceVersion = 5; //do not set lower than 1.
        

        // const _Path = this.props.resourceName;

        // ================= Request Setup ===========================================================

        const getRequestExampleURL = () => {
            return (
                <code>
                    <p>{`[Endpoint]/${this.props.resourceName}/${GUID}`}</p>
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

        // ================= Response Setup ===========================================================

        const getStatusNoContentComponent = () => {
            const HttpStatus = HttpConstant.getStatusCodeByNumber('204');
            return (
                <RestHttpStatusComponent
                    userMessage={<div>
                        <p>The deletion has been successful as either the resource with the requested [id] has been
                            deleted from the FHIR server or it never existed in the first place.</p>
                        <p>If a resource did exsist, and was deleted, then an ETag header will be returned indicating
                            the current resource version. As seen in this example. The version given in the ETag is the
                            deleted version that contains no resource instance. If you wished to retrive the resource
                            before it was deleted, you would need to perform a GET request one version number back, 
                            version {(DeletedResourceVersion - 1).toString()} in this example.</p>
                    </div>}
                    statusNumber={HttpStatus.number}
                    statusText={HttpStatus.description}
                    statusColor={HttpStatus.color}
                    headerComponent={getResponseNoContentHeadersComponent(HttpStatus.color)}
                    // bodyComponent={getResponseBodyBadRequestComponent(HttpStatus.color)}
                />
            )

        }

        const getResponseNoContentHeadersComponent = (Color) => {            
            return (
                <RestHttpHeadersComponent
                    httpHeaders={FhirConstant.responseNoContentHeaders(DeletedResourceVersion.toString())}
                    contentTypeElement={this.props.acceptResponseElement}
                    acceptElement={null}
                    color={Color}
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
            const Bad = getStatusBadRequestComponent()

            return { NoContent, Bad }
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
                                    // SearchParametersComponent={getRequestSearchParametersComponent()}
                                    // bodyComponent={getRequestBodyComponent()}
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
