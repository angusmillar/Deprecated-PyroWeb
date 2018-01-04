import React from 'react';
import PropTypes from 'prop-types';
import DateTimeSupport from '../../SupportTools/DateTimeSupport'
import isNil from 'lodash/isNil';
import { Table } from 'semantic-ui-react'
import upperFirst from 'lodash/upperFirst';

import Expandable_Table from '../Reusable/Table/Expandable_Table'
import MetadataHeaderTableRow from './MetadataHeaderTableRow'

class Software_Table extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        const dateTimeFormated = (Value) => {
            return (
                Value &&
                DateTimeSupport.dateTimeHumanReadable(Value)                
            )
        };

        const renderRows = (Expand) => {
            if (Expand) {
                const name = this.props.software.name;
                const version = this.props.software.version;
                const releaseDate = this.props.software.releaseDate;
                return (
                    <Table.Body>
                        <MetadataHeaderTableRow RowLabel={upperFirst('Name')} RowValue={name} />                                      
                        <MetadataHeaderTableRow RowLabel={upperFirst('Version')} RowValue={version} />        
                        <MetadataHeaderTableRow RowLabel={upperFirst('Release Date')} RowValue={dateTimeFormated(releaseDate)} />  
                    </Table.Body>
                )
            } else {
                return null;
            }
        };

        if (isNil(this.props.software)) {
            return null;
        } else {
            return (
                <Expandable_Table tableHeadingTitle='Software' tableHeadingIconType='gift' tableRowsFunction={renderRows} />
            )
        }
    }

}
//Type Checking
Software_Table.propTypes = {
    software: PropTypes.object,

}

export default Software_Table
