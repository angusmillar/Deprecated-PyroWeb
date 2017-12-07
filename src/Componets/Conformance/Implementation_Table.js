import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import { Table } from 'semantic-ui-react'
import upperFirst from 'lodash/upperFirst';

import Expandable_Table from '../Reusable/Table/Expandable_Table'
import MetadataHeaderTableRow from './MetadataHeaderTableRow'

class Implementation_Table extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        
        const tableUrl = (Label, Value) => {
            if (isNil(Value)) {
                return null
            }
            else {
                return (
                    <Table.Row>
                        <Table.Cell><b>URL</b></Table.Cell>
                        <Table.Cell textAlign='left' ><a href={'http:'.concat(Value)}>{Value}</a> </Table.Cell>
                    </Table.Row>
                )
            }
        };

        const renderRows = (Expand) => {
            const description = this.props.Implementation.description;
            const url = this.props.Implementation.url;
            if (Expand) {
                return (
                    <Table.Body>
                        {tableUrl('URL', url)}
                        <MetadataHeaderTableRow RowLabel={upperFirst('Description')} RowValue={description} />                        
                    </Table.Body>
                )
            }
            else {
                return null;
            }
        };


        if (isNil(this.props.Implementation)) {
            return null;
        } else {
            return (
                <Expandable_Table tableHeadingTitle='Implementation' tableHeadingIconType='setting' tableRowsFunction={renderRows} />
            )
        }
    }

}
//Type Checking
Implementation_Table.propTypes = {
    Implementation: PropTypes.object,

}

export default Implementation_Table
