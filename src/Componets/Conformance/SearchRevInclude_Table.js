import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import { Table } from 'semantic-ui-react';
import map from 'lodash/map';

import Expandable_Table from '../Reusable/Table/Expandable_Table';
import MetadataHeaderTableRow from './MetadataHeaderTableRow';

class SearchRevInclude_Table extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        
        const renderRow = () => {
            if (isNil(this.props.searchRevInclude)) {
                return null
            }
            else {
                return (
                    map(this.props.searchRevInclude, (RevInclude, Index) => {
                        return (
                            <MetadataHeaderTableRow key={Index} RowLabel={'Search RevInclude'} RowValue={RevInclude} />
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



        if (isNil(this.props.searchRevInclude)) {
            return null;
        } else {
            return (
                <Expandable_Table tableHeadingTitle='Search RevInclude' tableHeadingIconType='arrow left' tableRowsFunction={renderTableBody} />
            )
        }
    }

}
//Type Checking
SearchRevInclude_Table.propTypes = {
    searchRevInclude: PropTypes.array,

}

export default SearchRevInclude_Table
