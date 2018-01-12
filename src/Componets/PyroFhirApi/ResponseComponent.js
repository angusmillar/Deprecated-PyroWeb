import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react'
import map from 'lodash/map';

import Expandable_Table from '../Reusable/Table/Expandable_Table';

export default class ResponseComponent extends React.Component {

    static propTypes = {
        statusComponentArray: PropTypes.object.isRequired,
    }

    static defaultProps = {
    }

    constructor(props) {
        super(props);
    }

    render() {

        const renderRows = () => {
            return (
                map(this.props.statusComponentArray, (StatusComponent, Index) => {
                    return (
                        <Table.Row key={Index} >
                            <Table.Cell
                                colSpan='3'
                                width='16'
                                verticalAlign='top'>
                                {StatusComponent}
                            </Table.Cell>
                        </Table.Row>
                    )
                }))
        }

        const renderTableBody = (Expand) => {
            if (Expand) {
                return (
                    <Table.Body>
                        {renderRows()}
                    </Table.Body>
                )
            } else {
                return null;
            }
        };

        return (
            <Expandable_Table
                tableHeadingTitle='Response'
                tableHeadingIconType='cloud download'
                tableColorType='pink'
                tableColorInverted={false}
                tableRowsFunction={renderTableBody}
            />
        )
    }
}
