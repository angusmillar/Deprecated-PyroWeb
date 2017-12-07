import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import isNil from 'lodash/isNil';
import { Table } from 'semantic-ui-react'

import Expandable_Table from '../Reusable/Table/Expandable_Table'

class Formats_Table extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {

        const renderRows = () => {
            return (
            map(this.props.Format, (FormatRow, Index) => {
                return (
                    <Table.Row key={Index}>
                        <Table.Cell><b>Format</b></Table.Cell>
                        <Table.Cell textAlign='left' >{FormatRow}</Table.Cell>
                    </Table.Row>                            
                )

                })
            )    
        }
        const renderFormats = (Expand) => {
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


        if (isNil(this.props.Format)) {
            return null;
        } else {
            return (
                <Expandable_Table tableHeadingTitle='Supported Formats' tableHeadingIconType='code' tableRowsFunction={renderFormats}/>
            )
        }
    }

}
//Type Checking
Formats_Table.propTypes = {
    Format: PropTypes.array,

}

export default Formats_Table
