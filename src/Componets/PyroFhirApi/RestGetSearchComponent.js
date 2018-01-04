import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'semantic-ui-react'

import Expandable_Table from '../Reusable/Table/Expandable_Table';
import RestVerbHeaderComponent from './RestVerbHeaderComponent';
import RestRequestComponent from './RestRequestComponent';
// import RestResponsesComponent from './RestResponsesComponent';
import FhirConstant from '../../Constants/FhirConstant';

export default class RestGetSearchComponent extends React.Component {

    static propTypes = {
        resourceName: PropTypes.string.isRequired,
        acceptElement: PropTypes.element.isRequired,
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
                                <RestRequestComponent
                                    resourceName={this.props.resourceName}
                                    exampleRequests={_exampleRequests}
                                    httpHeaders={FhirConstant.GetRequestHeaders}
                                    searchParameters={this.props.searchParameters}
                                    acceptElement={this.props.acceptElement}
                                    includeHttpBody={false} />
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
                tableHeadingComponent={renderTableHeader(VerbGetName, _VerbGetColor, this.props.resourceName)}
                tableHeadingTitle={VerbGetName}
                tableColorType={_VerbGetColor}
                tableColorInverted={false}
                tableRowsFunction={renderGetSearchTableBody}
            />
        )
    }

}
