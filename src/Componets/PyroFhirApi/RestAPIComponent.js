import React from 'react';
import PropTypes from 'prop-types';
// import moment from 'moment'
import { Table, Segment, Header } from 'semantic-ui-react'
// import map from 'lodash/map';
// import isNil from 'lodash/isNil';
//import filter from 'lodash/filter'
// import upperFirst from 'lodash/upperFirst';
// import toLower from 'lodash/toLower';
import Expandable_Table from '../Reusable/Table/Expandable_Table';
import RestVerbHeaderComponent from './RestVerbHeaderComponent';
import RestParametersComponent from './RestParametersComponent';

class RestAPIComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const _resourceName = this.props.resource.type;
        const _searchParameters = this.props.resource.searchParam;
        const _VerbGetColor = 'blue';

        const renderGetTableBody = (Expand) => {
            if (Expand) {
                const description = `Return all ${_resourceName} resources as a search Bundle resource`;   
                return (
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell colSpan='16'>{description}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell colSpan='16'>
                                <RestParametersComponent parameters={_searchParameters} color={_VerbGetColor} />
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                )
            } else {
                return null;
            }
        };

        const renderTableHeader = (Verb, Color, Path) => {
            return (
                <RestVerbHeaderComponent
                    verb={Verb}
                    path={Path}
                    color={Color}
                />
            )
        };

        const renderGetVerb = () => {
            const VerbGetName = 'GET';
            
            return (
                <Expandable_Table
                    tableHeadingComponent={renderTableHeader(VerbGetName, _VerbGetColor, _resourceName)}
                    tableHeadingTitle={VerbGetName}
                    tableColorType={_VerbGetColor}
                    tableColorInverted={false}
                    tableRowsFunction={renderGetTableBody}
                />
            )
        };


        
        const resourceDescription = null; //we don't have a description in the conformance stament
        return (
            <Segment raised padded >
                <span>
                    <Header size='huge'>{_resourceName}</Header>
                    {resourceDescription}
                </span>
                {renderGetVerb(_resourceName)}
            </Segment>
        )
    }

}
//Type Checking
RestAPIComponent.propTypes = {
    resource: PropTypes.object.isRequired,
}

RestAPIComponent.defaultProps = {
}

export default RestAPIComponent;  
