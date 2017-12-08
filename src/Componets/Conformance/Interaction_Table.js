import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import isNil from 'lodash/isNil';
import { Table } from 'semantic-ui-react'

import Expandable_Table from '../Reusable/Table/Expandable_Table'
import MetadataHeaderTableRow from './MetadataHeaderTableRow'

class Interaction_Table extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {

        const renderRows = () => {
            return (
            map(this.props.interactions, (InteractionRow, Index) => {
                    return (
                        <MetadataHeaderTableRow key={Index}RowLabel='Interaction' RowValue={InteractionRow.code} />
                                              
                )
                })
            )    
        }
        const renderTableBody = (Expand) => {
            if (Expand) {
                //The user has expanded the full list so show all soretd by Rank if found
                return (
                    <Table.Body>
                        {renderRows()}
                    </Table.Body>
                )
            }
            else {
                return null;
            }
        };


        if (isNil(this.props.interactions)) {
            return null;
        } else {
            return (
                <Expandable_Table tableHeadingTitle='Interactions' tableHeadingIconType='database' tableRowsFunction={renderTableBody}/>
            )
        }
    }

}
//Type Checking
Interaction_Table.propTypes = {
    interactions: PropTypes.array,
}

export default Interaction_Table
