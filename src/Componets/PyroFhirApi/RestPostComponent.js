import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'semantic-ui-react'

import Expandable_Table from '../Reusable/Table/Expandable_Table';
import RestVerbHeaderComponent from './RestVerbHeaderComponent';
import RestRequestComponent from './RestRequestComponent';
import RestResponsesComponent from './RestResponsesComponent';

import FhirConstant from '../../Constants/FhirConstant';

export default class RestPostComponent extends React.Component {

    static propTypes = {
        resourceName: PropTypes.string.isRequired,
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
                                <RestRequestComponent
                                    resourceName={this.props.resourceName}
                                    httpHeaders={FhirConstant.PostRequestHeaders}
                                    searchParameters={this.props.searchParameters}
                                    contentTypeElement={this.props.contentTypeElement}
                                    selectedContentType={this.props.selectedContentType}
                                    acceptElement={this.props.acceptElement}
                                    includeHttpBody={true}/>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell colSpan='16'>
                                <RestResponsesComponent
                                    // color={_VerbColor}
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