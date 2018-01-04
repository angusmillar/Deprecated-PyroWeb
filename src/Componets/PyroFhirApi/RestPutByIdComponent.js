import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'semantic-ui-react'

import Expandable_Table from '../Reusable/Table/Expandable_Table';
import RestVerbHeaderComponent from './RestVerbHeaderComponent';
import RestRequestComponent from './RestRequestComponent';
// import RestResponsesComponent from './RestResponsesComponent';
import FhirConstant from '../../Constants/FhirConstant';

export default class RestPutByIdComponent extends React.Component {

    static propTypes = {
        resourceName: PropTypes.string.isRequired,
        searchParameters: PropTypes.array,
        acceptElement: PropTypes.element.isRequired
    }

    static defaultProps = {        
    }

    constructor(props) {
        super(props);
    }

    render() {    
        const VerbGetName = 'PUT';
        const _VerbColor = 'orange';                
        
        const _exampleRequests = [
            '/[id]'
        ];
        // const _ResponseHttpHeaders = [
        //     { name: 'ETag', value: 'my etag' },
        //     { name: 'LastModified', value: 'bla bla bla' }
        // ];

        const renderGetByIdTableBody = (Expand) => {
            if (Expand) {
                const description = `Update or Add a ${this.props.resourceName} resource with the resource id of [id]. If a resource does not exsist with the [id] given then this request will add the resource with the [id] given.`;
                return (
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell colSpan='16'>{description}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell colSpan='16'>
                                <RestRequestComponent
                                    resourceName={this.props.resourceName}
                                    httpHeaders={FhirConstant.GetRequestByIdHeaders}
                                    searchParameters={this.props.searchParameters}
                                    exampleRequests={_exampleRequests}
                                    acceptElement={this.props.acceptElement}                                    
                                    includeHttpBody={false}/>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell colSpan='16'>
                                {/* <RestResponsesComponent /> */}
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
                tableHeadingComponent={renderTableHeader(VerbGetName, _VerbColor, `${this.props.resourceName}/[id]`)}
                tableHeadingTitle={VerbGetName}
                tableColorType={_VerbColor}
                tableColorInverted={false}
                tableRowsFunction={renderGetByIdTableBody}
            />
        )
    }
}

