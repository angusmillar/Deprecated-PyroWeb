import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'semantic-ui-react'

import Expandable_Table from '../Reusable/Table/Expandable_Table';
import RestVerbHeaderComponent from './RestVerbHeaderComponent';
import RestRequestComponent2 from './RestRequestComponent2';
import RestResponsesComponent from './RestResponseComponent'
import FhirResourceExampleGenerator from './FhirResourceExampleGenerator'

import FhirConstant from '../../Constants/FhirConstant';
import FormatSupport from '../../SupportTools/FormatSupport';

export default class RestGetSearchComponent extends React.Component {

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
    }

    render() {
        const VerbGetName = 'GET';
        const _VerbGetColor = 'blue';
        //Example string must be post the Resource Name
        const _exampleRequests = [
            '?searchParameterName=value&searchParameterName=value',
            ' '
        ];
        
        // const resolveExampleBody = () => {            
        //     return {
        //         // syntaxLanguage: 'xml',
        //         // resource: FhirResourceExampleGenerator.getXmlSearchBundleResource(this.props.resourceName),
        //         formatType: FormatSupport.FormatType.JSON,
        //         resource: FhirResourceExampleGenerator.getJsonSearchBundleResource(this.props.resourceName),
        //         message: `A search Bundle resource containing ${this.props.resourceName} resources as entries which match the search criteria.`,
        //         isBundleResource: true
        //     }
        // }


        // const resolveResourceExample = (FormatType) => {
        //     if (FormatType === FormatSupport.FormatType.JSON) {
        //         return FhirResourceExampleGenerator.getJsonSearchBundleResource(this.props.resourceName);
        //     } else if (FormatType === FormatSupport.FormatType.XML) {
        //         return FhirResourceExampleGenerator.getXmlSearchBundleResource(this.props.resourceName);
        //     } else {
        //         return `SyntaxLanguage was ${FormatType.toString()}, can not create example resource`;
        //     }
        // }

        const resolveExampleBody = (FormatRequired) => {
            const FormatType = FormatSupport.resolveFormatFromString(FormatRequired);     
            if (FormatType === FormatSupport.FormatType.JSON) {
                return {
                    formatType: FormatType,
                    resource: FhirResourceExampleGenerator.getJsonSearchBundleResource(this.props.resourceName),
                    message: `The ${this.props.resourceName} that is to be added to the FHIR server`,
                    isBundleResource: false
                }                
            } else if (FormatType === FormatSupport.FormatType.XML) {
                return {
                    formatType: FormatType,
                    resource: FhirResourceExampleGenerator.getXmlSearchBundleResource(this.props.resourceName),
                    message: `The ${this.props.resourceName} that is to be added to the FHIR server`,
                    isBundleResource: false
                }                
            } else {
                return `SyntaxLanguage was ${FormatType.toString()}, can not create example resource`;
            }
        }

        const renderGetSearchTableBody = (Expand) => {
            if (Expand) {
                const description = `Return all ${this.props.resourceName} resources or filter ${this.props.resourceName} resources by a set of serach parameters. A search Bundle resource will be retunred with ${this.props.resourceName} resources as its entries.`;
                return (
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell colSpan='16'>{description}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell colSpan='16'>
                            <RestRequestComponent2
                                    resourceName={this.props.resourceName}
                                    httpHeaders={FhirConstant.GetRequestHeaders}
                                    searchParameters={this.props.searchParameters}
                                    contentTypeElement={this.props.contentTypeElement}                                   
                                    acceptElement={this.props.acceptElement}
                                    includeHttpBody={false}
                                    exampleRequests={_exampleRequests}                                    
                                />                                
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell colSpan='16'>
                            <RestResponsesComponent
                                    resourceName={this.props.resourceName}
                                    endpointUrl={this.props.endpointUrl}
                                    httpHeaders={FhirConstant.getResponseSearchHeaders()}
                                    // For the response we switch the ContentType to be the Accept Type as the server returns us content as per what we asked 
                                    // for with the Accept header on the request.
                                    // While this is technical correct it may confuse users as when they change the dropdown for Content-Type within the response
                                    // Headers section they might not relise or understand that what they are actualy also changing it the request's Accept type.
                                    // For now I will leave this like this becasue it is correct. If this is a problem then maybe I will have to do work to 
                                    // make the Content-Type in the response header not a dropdown so they can not chnage it there.
                                    contentTypeElement={this.props.acceptResponseElement}
                                    selectedContentType={this.props.acceptResponseElement.props.value}
                                    acceptElement={this.props.acceptResponseElement}
                                    exampleBody={resolveExampleBody(this.props.acceptResponseElement.props.value)}
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
                tableHeadingComponent={renderTableHeader(VerbGetName, _VerbGetColor, this.props.resourceName)}
                tableHeadingTitle={VerbGetName}
                tableColorType={_VerbGetColor}
                tableColorInverted={false}
                tableRowsFunction={renderGetSearchTableBody}
            />
        )
    }

}
