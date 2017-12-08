import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import { Table } from 'semantic-ui-react'

import Expandable_Table from '../Reusable/Table/Expandable_Table'
import MetadataHeaderTableRow from './MetadataHeaderTableRow'

class SearchParam_Table extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        const renderTableBody = (Expand) => {
            if (Expand) {
                //The user has expanded the full list so show all soretd by Rank if found
                return (
                    <Table.Body>
                        <MetadataHeaderTableRow RowLabel='Name' RowValue={this.props.searchParam.name} />
                        <MetadataHeaderTableRow RowLabel='Type' RowValue={this.props.searchParam.type} />
                        <MetadataHeaderTableRow RowLabel='Documentation' RowValue={this.props.searchParam.documentation} />
                        <MetadataHeaderTableRow RowLabel='Definition' RowValue={<a href={'http:'.concat(this.props.searchParam.definition)}>{this.props.searchParam.definition}</a>} />
                    </Table.Body>
                )
            }
            else {
                return null;
            }
        };


        if (isNil(this.props.searchParam)) {
            return null;
        } else {
            const SearchParamName = this.props.searchParam.name;
            const Title = (SearchParamName).concat(' (Search Parameter)');
            return (
                <Expandable_Table tableColorType='teal' tableHeadingTitle={Title} tableHeadingIconType='search' tableRowsFunction={renderTableBody} />
            )
        }
    }

}
//Type Checking
SearchParam_Table.propTypes = {
    searchParam: PropTypes.object,

}

export default SearchParam_Table
