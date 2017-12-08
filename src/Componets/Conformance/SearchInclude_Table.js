import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import { Table } from 'semantic-ui-react'
import map from 'lodash/map';

import Expandable_Table from '../Reusable/Table/Expandable_Table'
import MetadataHeaderTableRow from './MetadataHeaderTableRow'

class SearchInclude_Table extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        
        const renderRow = () => {
            if (isNil(this.props.searchInclude)) {
                return null
            }
            else {
                return (
                    map(this.props.searchInclude, (Include, Index) => {
                        return (
                            <MetadataHeaderTableRow key={Index} RowLabel={'Search Include'} RowValue={Include} />
                        )
                    }
                    )
                )
            }        
        };
        

        const renderTableBody = (Expand) => {
            if (Expand) {                
                return (
                    <Table.Body>                        
                      {renderRow()}
                    </Table.Body>
                )
            } else {
                return null;
            }
        };



        if (isNil(this.props.searchInclude)) {
            return null;
        } else {
            return (
                <Expandable_Table tableHeadingTitle='Search Include' tableHeadingIconType='arrow right' tableRowsFunction={renderTableBody} />
            )
        }
    }

}
//Type Checking
SearchInclude_Table.propTypes = {
    searchInclude: PropTypes.array,

}

export default SearchInclude_Table
