import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import isNil from 'lodash/isNil';

import { Table, Divider } from 'semantic-ui-react'

import RestParametersComponent from './RestParametersComponent'
import RestHttpHeadersComponent from './RestHttpHeadersComponent'
import Expandable_Table from '../Reusable/Table/Expandable_Table'
import RestBodyComponent from './RestBodyComponent'
import FormatSupport from '../../SupportTools/FormatSupport'


export default class RestRequestAndResponseComponent extends React.Component {

    static propTypes = {
        tableTitle: PropTypes.string.isRequired,
        tableTitleIcon: PropTypes.string.isRequired,
        resourceName: PropTypes.string.isRequired,
        httpHeaders: PropTypes.array.isRequired,
        color: PropTypes.string.isRequired,

        contentTypeElement: PropTypes.element,
        // selectedContentType: PropTypes.string,
        acceptElement: PropTypes.element,
        searchParameters: PropTypes.array,
        exampleRequests: PropTypes.array,

        exampleBody: PropTypes.object,

        includeHttpBody: PropTypes.bool,
        includeHeaders: PropTypes.bool,
        includeSearchParameters: PropTypes.bool,
    }

    static defaultProps = {
        color: 'black',
        tableTitle: 'No title set',
        tableTitleIcon: 'question',
        exampleBody: {formatType: FormatSupport.FormatType.JSON, resource: 'Example Resource Not Set', message: 'User Message has not been set', isBundleResource: false},
        includeHttpBody: false,
        includeHeaders: false,
        includeSearchParameters: false
    }

    constructor(props) {
        super(props);
    }

    render() {

        const renderHttpHeaders = () => {
            if (this.props.includeHeaders && this.props.httpHeaders.length != 0) {
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

        const renderSearchParameters = () => {
            if (this.props.includeSearchParameters && this.props.searchParameters.length != 0) {
                return (
                    <Table.Row >
                        <Table.Cell colSpan='3' width='16' verticalAlign='top'>
                            <RestParametersComponent parameters={this.props.searchParameters} color={this.props.color} />
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
            if (this.props.includeHttpBody && this.props.includeHttpBody) {
                return (
                    <Table.Row>
                        <Table.Cell colSpan='3' width='16' verticalAlign='top'>
                            <RestBodyComponent
                                exampleMessage={this.props.exampleBody.message}    
                                resourceName={this.props.resourceName}
                                isBundleResource={this.props.exampleBody.isBundleResource}
                                formatType={this.props.exampleBody.formatType}        
                                resourceData={this.props.exampleBody.resource}                                
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
                        {renderSearchParameters()}
                        {renderHttpBody()}
                    </Table.Body>
                )
            } else {
                return null;
            }
        };

        return (
            <Expandable_Table
                tableHeadingTitle={this.props.tableTitle}
                tableHeadingIconType={this.props.tableTitleIcon}
                tableRowsFunction={renderParametersRowsBody}
                tableColorType={this.props.color}
                tableColorInverted={false}
            />
        )
    }
}
