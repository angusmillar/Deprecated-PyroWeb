import React from 'react';
import PropTypes from 'prop-types';
// import moment from 'moment'
import { Segment, Divider, Header, Grid, Popup, Icon } from 'semantic-ui-react'
// import map from 'lodash/map';
// import isNil from 'lodash/isNil';
//import filter from 'lodash/filter'
// import upperFirst from 'lodash/upperFirst';
// import toLower from 'lodash/toLower';
import RestGetSearchComponent from './RestGetSearchComponent'
import RestGetByIdComponent from './RestGetByIdComponent'
import RestGetVReadComponent from './RestGetVReadComponent'
import RestGetVReadByVidComponent from './RestGetVReadByVidComponent'
import RestPostComponent from './RestPostComponent'
import FhirConstant from '../../Constants/FhirConstant';

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
                    <Popup
                        trigger={<Header a='a' href={`${FhirConstant.STU3_SpecWebsite}/${_resourceName}.html`} size='huge'>{_resourceName}</Header>}
                        flowing
                        hoverable
                    >
                        <Grid centered columns={1}>
                            <Grid.Column textAlign='left'>                                
                                <span><Icon name='cogs' /><a a='a' href={`${FhirConstant.STU3_SpecWebsite}/${_resourceName}.html`} rel="noopener noreferrer" target='_blank'>Go-to FHIR Specification for the {_resourceName} resource</a></span>
                            </Grid.Column>
                        </Grid>
                    </Popup>
                    {/* <Header a='a' href={`${FhirConstant.STU3_SpecWebsite}/${_resourceName}.html`} size='huge'>{_resourceName}</Header> */}
                    {resourceDescription}
                </span>
                <RestGetSearchComponent resourceName={_resourceName} searchParameters={_searchParameters} />
                <Divider />
                <RestGetByIdComponent resourceName={_resourceName} searchParameters={_searchParameters} />
                <Divider />
                <RestGetVReadComponent resourceName={_resourceName} searchParameters={_searchParameters} />
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
