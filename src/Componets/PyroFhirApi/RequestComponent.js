import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react'
import isNil from 'lodash/isNil';

import Expandable_Table from '../Reusable/Table/Expandable_Table';

export default class RequestComponent extends React.Component {

    static propTypes = {
        exampleComponet: PropTypes.element,
        headersComponent: PropTypes.element,
        SearchParametersComponent: PropTypes.element,
        bodyComponent: PropTypes.element,
    }

    static defaultProps = {
    }

    constructor(props) {
        super(props);
    }

    render() {


        const renderExample = () => {
            if (!isNil(this.props.exampleComponet)) {
                return (
                    <Table.Row>
                        <Table.Cell
                            colSpan='3'
                            width='16'
                            verticalAlign='top'>
                            {this.props.exampleComponet}
                        </Table.Cell>
                    </Table.Row>
                )
            } else {
                return null;
            }
        };

        const renderheadersComponent = () => {
            if (!isNil(this.props.headersComponent)) {
                return (
                    <Table.Row>
                        <Table.Cell
                            colSpan='3'
                            width='16'
                            verticalAlign='top'>
                            {this.props.headersComponent}
                        </Table.Cell>
                    </Table.Row>
                )
            } else {
                return null;
            }
        };

        const renderSearchParametersComponent = () => {
            if (!isNil(this.props.SearchParametersComponent)) {
                return (
                    <Table.Row>
                        <Table.Cell
                            colSpan='3'
                            width='16'
                            verticalAlign='top'>
                            {this.props.SearchParametersComponent}
                        </Table.Cell>
                    </Table.Row>
                )
            } else {
                return null;
            }
        };

        const renderbodyComponent = () => {
            if (!isNil(this.props.bodyComponent)) {
                return (
                    <Table.Row>
                        <Table.Cell
                            colSpan='3'
                            width='16'
                            verticalAlign='top'>
                            {this.props.bodyComponent}
                        </Table.Cell>
                    </Table.Row>
                )
            } else {
                return null;
            }
        };

        const renderTableBody = (Expand) => {
            if (Expand) {
                return (
                    <Table.Body>
                        {renderExample()}
                        {renderheadersComponent()}
                        {renderSearchParametersComponent()}
                        {renderbodyComponent()}
                    </Table.Body>
                )
            } else {
                return null;
            }
        };

        return (
            <Expandable_Table
                tableHeadingTitle='Request'
                tableHeadingIconType='cloud upload'
                tableColorType='violet'
                tableColorInverted={false}
                tableRowsFunction={renderTableBody}
            />
        )
    }
}
