import React from 'react';
import PropTypes from 'prop-types';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';


import { Table } from 'semantic-ui-react'

import Expandable_Table from '../Reusable/Table/Expandable_Table';
import RestVerbHeaderComponent from './RestVerbHeaderComponent';
import RestRequestComponent2 from './RestRequestComponent2';
import RestResponsesComponent from './RestResponseComponent';
import FhirResourceExampleGenerator from './FhirResourceExampleGenerator'
import RestBodyComponent from './RestBodyComponent'
import UuidSupport from '../../SupportTools/UuidSupport'
import DateTimeSupport from '../../SupportTools/DateTimeSupport'

import FhirConstant from '../../Constants/FhirConstant';

export default class RestPostComponent extends React.Component {

    static propTypes = {
        resourceName: PropTypes.string.isRequired,
        endpointUrl: PropTypes.string.isRequired,
        contentTypeElement: PropTypes.element.isRequired,
        // selectedContentType: PropTypes.string.isRequired,
        acceptElement: PropTypes.element.isRequired,
        acceptResponseElement: PropTypes.element.isRequired,
        searchParameters: PropTypes.array
    }

    static defaultProps = {
    }

    constructor(props) {
        super(props);

        this.ExampleResourceType = {
            Request: 0,
            Response: 1,
        }
    }



    render() {
        const VerbGetName = 'POST';
        const _VerbColor = 'green';
        const _Description = `Add a ${this.props.resourceName} resource to the server. The server will assign a new GUID as the resource id`;
        const _Path = this.props.resourceName;

        const resolveSyntaxLanguage = (FormatRequired) => {
            if (includes(toLower(FormatRequired), RestBodyComponent.SupportedSyntaxLanguages.json)) {
                return RestBodyComponent.SupportedSyntaxLanguages.json;
            } else if (includes(toLower(FormatRequired), RestBodyComponent.SupportedSyntaxLanguages.xml)) {
                return RestBodyComponent.SupportedSyntaxLanguages.xml;
            } else {
                return `selectedContentType was ${FormatRequired}`;
            }
        }

        const resolveResourceExample = (SyntaxLanguage, ExampleResourceType, GUID, LastModified) => {
            if (SyntaxLanguage === RestBodyComponent.SupportedSyntaxLanguages.json) {
                if (ExampleResourceType == this.ExampleResourceType.Request) {
                    return FhirResourceExampleGenerator.getJsonResource(this.props.resourceName, null, null, null);
                } else {
                    return FhirResourceExampleGenerator.getJsonResource(this.props.resourceName, GUID, '1', LastModified);
                }
            } else if (SyntaxLanguage === RestBodyComponent.SupportedSyntaxLanguages.xml) {
                if (ExampleResourceType == this.ExampleResourceType.Request) {
                    return FhirResourceExampleGenerator.getXmlResource(this.props.resourceName, null, null, null);
                } else {
                    return FhirResourceExampleGenerator.getXmlResource(this.props.resourceName, GUID, '1', LastModified);
                }
            } else {
                return `SyntaxLanguage was ${SyntaxLanguage}, can not create example resource`;
            }
        }

        const resolveExampleBody = (ExampleResourceType, FormatRequired, GUID, LastModified) => {
            const SyntaxLanguage = resolveSyntaxLanguage(FormatRequired);            
            return {
                syntaxLanguage: SyntaxLanguage,
                resource: resolveResourceExample(SyntaxLanguage, ExampleResourceType, GUID, LastModified),
                message: `The ${this.props.resourceName} that is to be added to the FHIR server`,
                isBundleResource: false
            }
        }

        const renderGetSearchTableBody = (Expand) => {
            if (Expand) {
                const GUID = UuidSupport.createGUID();
                const LastModified = DateTimeSupport.NowMomentDefault;
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
                                    // selectedContentType={this.props.selectedContentType}
                                    acceptElement={this.props.acceptElement}
                                    includeHttpBody={true}
                                    exampleRequests={[' ']}
                                    exampleBody={resolveExampleBody(this.ExampleResourceType.Request, this.props.contentTypeElement.props.value)}
                                />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell colSpan='16'>
                                <RestResponsesComponent
                                    resourceName={this.props.resourceName}
                                    endpointUrl={this.props.endpointUrl}
                                    httpHeaders={FhirConstant.postResponseHeaders(this.props.endpointUrl, this.props.resourceName, GUID, LastModified)}
                                    // For the response we switch the ContentType to be the Accept Type as the server returns us content as per what we asked 
                                    // for with the Accept header on the request.
                                    // While this is technical correct it may confuse users as when they change the dropdown for Content-Type within the response
                                    // Headers section they might not relise or understand that what they are actualy also changing it the request's Accept type.
                                    // For now I will leave this like this becasue it is correct. If this is a problem then maybe I will have to do work to 
                                    // make the Content-Type in the response header not a dropdown so they can not chnage it there.
                                    contentTypeElement={this.props.acceptResponseElement}
                                    selectedContentType={this.props.acceptResponseElement.props.value}
                                    acceptElement={this.props.acceptResponseElement}
                                    exampleBody={resolveExampleBody(this.ExampleResourceType.Response, this.props.acceptElement.props.value, GUID, LastModified)}
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