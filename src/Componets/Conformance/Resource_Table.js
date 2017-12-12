import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import isNil from 'lodash/isNil';
import { Table } from 'semantic-ui-react'


import MetadataHeaderTableRow from './MetadataHeaderTableRow'
import Expandable_Table from '../Reusable/Table/Expandable_Table'
import Interaction_Table from './Interaction_Table'
import SearchInclude_Table from './SearchInclude_Table'
import SearchRevInclude_Table from './SearchRevInclude_Table'
import SearchParam_Table from './SearchParam_Table'


class Resource_Table extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {        


        const rendersearchParamTables = (SearchParams) => {
            return (
            map(SearchParams, (SearchParam, Index) => {
                    return (
                        <SearchParam_Table key={Index} searchParam={SearchParam} />                                                                      
                )
                })
            )    
        }
        
        const renderTables = (Interactions, SearchInclude, SearchRevInclude, SearchParams ) => {
            return (
                <Table.Row>
                    <Table.Cell colSpan='3'>
                        <div>
                            <Interaction_Table interactions={Interactions} />
                            <SearchInclude_Table searchInclude={SearchInclude} />
                            <SearchRevInclude_Table searchRevInclude={SearchRevInclude} />
                            {rendersearchParamTables(SearchParams)}
                            
                        </div>
                    </Table.Cell>
                </Table.Row>
            )
        };
        
        const renderRows = (Expand) => {
            if (Expand) {
                //The user has expanded the full list so show all soretd by Rank if found
                const Resource = this.props.resource;
                return (
                    <Table.Body>
                        <MetadataHeaderTableRow RowLabel='Versioning' RowValue={Resource.versioning} />
                        <MetadataHeaderTableRow RowLabel='Read History' RowValue={Resource.readHistory} />
                        <MetadataHeaderTableRow RowLabel='Update Create' RowValue={Resource.updateCreate} />
                        <MetadataHeaderTableRow RowLabel='Conditional Create' RowValue={Resource.conditionalCreate} />
                        <MetadataHeaderTableRow RowLabel='Conditional Read' RowValue={Resource.conditionalRead} />
                        <MetadataHeaderTableRow RowLabel='Conditional Update' RowValue={Resource.conditionalUpdate} />
                        <MetadataHeaderTableRow RowLabel='Conditional Delete' RowValue={Resource.conditionalDelete} />
                        {renderTables(Resource.interaction, Resource.searchInclude, Resource.searchRevInclude, Resource.searchParam )}
                    </Table.Body>
                )
            }
            else {
                return null;
            }
        };


        if (isNil(this.props.resource)) {
            return null;
        } else {
            const ResourceType = this.props.resource.type;
            const Title = 'Resource: '.concat(ResourceType);
            return (
                <Expandable_Table tableColorType='green' tableHeadingTitle={Title} tableHeadingIconType='file' tableRowsFunction={renderRows} />
            )
        }
    }

}
//Type Checking
Resource_Table.propTypes = {
    resource: PropTypes.object,
}

export default Resource_Table
