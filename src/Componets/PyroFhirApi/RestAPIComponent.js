import React from 'react';
import PropTypes from 'prop-types';
// import moment from 'moment'
import { Segment, Divider, Header } from 'semantic-ui-react'
// import map from 'lodash/map';
// import isNil from 'lodash/isNil';
//import filter from 'lodash/filter'
// import upperFirst from 'lodash/upperFirst';
// import toLower from 'lodash/toLower';
import RestGetSearchComponent from './RestGetSearchComponent'
import RestGetByIdComponent from './RestGetByIdComponent'
import RestGetVReadByVidComponent from './RestGetVReadByVidComponent'
import RestPostComponent from './RestPostComponent'

class RestAPIComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const _resourceName = this.props.resource.type;
        const _searchParameters = this.props.resource.searchParam;
        const resourceDescription = null; //we don't have a description in the conformance stament

        return (
            <Segment raised padded >
                <span>
                    <Header size='huge'>{_resourceName}</Header>
                    {resourceDescription}
                </span>
                <RestGetSearchComponent resourceName={_resourceName} searchParameters={_searchParameters} />
                <Divider />
                <RestGetByIdComponent resourceName={_resourceName} searchParameters={_searchParameters} />                
                <Divider />
                <RestGetVReadByVidComponent resourceName={_resourceName} searchParameters={_searchParameters} />                                
                <Divider />
                <RestPostComponent resourceName={_resourceName} searchParameters={_searchParameters} />                                

                
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
