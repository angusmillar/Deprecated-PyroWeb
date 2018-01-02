import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import isNil from 'lodash/isNil';

import { Table, Divider } from 'semantic-ui-react'

import RestParametersComponent from './RestParametersComponent'
import RestHttpHeadersComponent from './RestHttpHeadersComponent'
import Expandable_Table from '../Reusable/Table/Expandable_Table'
import RestRequestBodyComponent from './RestRequestBodyComponent'

export default class RestRequestComponent extends React.Component {

    static propTypes = {
        resourceName: PropTypes.string.isRequired,        
        httpHeaders: PropTypes.array.isRequired,
        
        color: PropTypes.string,
        contentTypeElement: PropTypes.element,
        selectedContentType: PropTypes.string,
        acceptElement: PropTypes.element,
        searchParameters: PropTypes.array,        
        exampleRequests: PropTypes.array,
        includeHttpBody: PropTypes.bool,
    }

    static defaultProps = {
        wireframeParagraphImage: require('../../Images/wireframe/paragraph.png'),
        color: 'violet',
        includeHttpBody: false
    }

    constructor(props) {
        super(props);
    }

    render() {

        const renderHttpHeaders = () => {
            if (this.props.httpHeaders.length != 0) {
                return (
                    <Table.Row >
                        <Table.Cell colSpan='3' width='16' verticalAlign='top'>
                            <RestHttpHeadersComponent
                                httpHeaders={this.props.httpHeaders}
                                contentTypeElement={this.props.contentTypeElement}  
                                acceptElement={this.props.acceptElement}
                                color={this.props.color} />
                        </Table.Cell>
                    </Table.Row>
                )
            } else {
                return null;
            }

        };


        const renderExampleRequests = (ExampleRequests, ResourceName) => {
            return (
                map(ExampleRequests, (Example, Index) => {
                    //Only add a devider between each but not on the end.
                    const divider = () => {
                        if (Index != ExampleRequests.length - 1) {
                            return <Divider horizontal >Or</Divider>
                        }
                    }

                    return (
                        <div key={Index}>
                            <code>
                                <p>{`[Endpoint URL]/${ResourceName}${Example}`}</p>
                            </code>
                            {divider()}
                        </div>
                    )
                })
            )
        };

        const renderExampleRequestRow = () => {
            if (!isNil(this.props.exampleRequests)) {
                return (
                    <Table.Row >
                        <Table.Cell colSpan='3' width='16' verticalAlign='top'>
                            <b>Example:</b><br />
                            {renderExampleRequests(this.props.exampleRequests, this.props.resourceName)}
                        </Table.Cell>
                    </Table.Row>
                )
            }
        };

        const renderHttpBody = () => {
            if (this.props.includeHttpBody) {
                return (
                    <Table.Row>
                        <Table.Cell colSpan='3' width='16' verticalAlign='top'>
                            <RestRequestBodyComponent
                                resourceName={this.props.resourceName}
                                selectedContentType={this.props.selectedContentType}
                                color={this.props.color} />
                        </Table.Cell>
                    </Table.Row>
                )
            }
        };


        const renderParametersRowsBody = (Expand) => {
            if (Expand) {
                return (
                    <Table.Body>
                        {renderExampleRequestRow()}
                        {renderHttpHeaders()}
                        <Table.Row >
                            <Table.Cell colSpan='3' width='16' verticalAlign='top'>
                                <RestParametersComponent parameters={this.props.searchParameters} color={this.props.color} />
                            </Table.Cell>
                        </Table.Row>
                        {renderHttpBody()}
                    </Table.Body>
                )
            } else {
                return null;
            }
        };

        return (
            <Expandable_Table
                tableHeadingTitle='Requests'
                tableHeadingIconType='cloud upload'
                tableRowsFunction={renderParametersRowsBody}
                tableColorType={this.props.color}
                tableColorInverted={false}
            />


        )
    }
}
