import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'semantic-ui-react'

import isNil from 'lodash/isNil';
import Expandable_Table from '../Reusable/Table/Expandable_Table';
import RestHttpStatusHeaderComponent from './RestHttpStatusHeaderComponent';

export default class RestHttpStatusComponent extends React.Component {

    static propTypes = {
        statusNumber: PropTypes.string.isRequired,
        statusText: PropTypes.string.isRequired,
        statusColor: PropTypes.string.isRequired,
        headerComponent: PropTypes.element,
        bodyComponent: PropTypes.element,
        userMessage: PropTypes.element,
    }

    static defaultProps = {
    }

    constructor(props) {
        super(props);
    }

    render() {

        const getUserMessage = () => {
            if (!isNil(this.props.userMessage)) {
                return (
                    <Table.Row>
                    <Table.Cell colSpan='16'>
                        {this.props.userMessage}
                    </Table.Cell>
                </Table.Row>
                )                    
            }
            return null;
        }

        const getHeaderComponent = () => {
            if (!isNil(this.props.headerComponent)) {
                return (
                    <Table.Row>
                    <Table.Cell colSpan='16'>
                        {this.props.headerComponent}
                    </Table.Cell>
                </Table.Row>
                )                    
            }
            return null;
        }

        const getBodyComponent = () => {
            if (!isNil(this.props.bodyComponent)) {
                return (
                    <Table.Row>
                    <Table.Cell colSpan='16'>
                        {this.props.bodyComponent}
                    </Table.Cell>
                </Table.Row>
                )                    
            }
            return null;
        }

        const renderTableBody = (Expand) => {
            if (Expand) {
                return (
                    <Table.Body>
                        {getUserMessage()}
                        {getHeaderComponent()}
                        {getBodyComponent()}
                    </Table.Body>
                )
            } else {
                return null;
            }
        };

        const renderTableHeader = () => {
            return (
                <RestHttpStatusHeaderComponent
                    number={this.props.statusNumber}
                    text={this.props.statusText}
                    color={this.props.statusColor}
                />
            )
        };

        return (
            <Expandable_Table
                tableHeadingComponent={renderTableHeader()}
                tableHeadingTitle={this.props.statusText}
                tableColorType={this.props.statusColor}
                tableColorInverted={false}
                tableRowsFunction={renderTableBody}
            />
        )
    }
}
