import React from 'react';
import PropTypes from 'prop-types';
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
import RestPutByIdComponent from './RestPutByIdComponent'
import RestDeleteByIdComponent from './RestDeleteByIdComponent'
import FhirConstant from '../../Constants/FhirConstant';

export default class RestAPIComponent extends React.Component {

    static propTypes = {
        resource: PropTypes.object.isRequired,
        endpointUrl: PropTypes.string.isRequired,
        selectedContentType: PropTypes.string.isRequired,
        contentTypeElement: PropTypes.element.isRequired,
        acceptElement: PropTypes.element.isRequired
    }

    static defaultProps = {        
    }

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
                
                <RestGetSearchComponent
                    resourceName={_resourceName}
                    searchParameters={_searchParameters}
                    acceptElement={this.props.acceptElement}
                />
                <Divider />
                <RestGetByIdComponent
                    resourceName={_resourceName}
                    searchParameters={_searchParameters}
                    acceptElement={this.props.acceptElement}
                />
                <Divider />
                <RestGetVReadComponent
                    resourceName={_resourceName}
                    searchParameters={_searchParameters}
                    acceptElement={this.props.acceptElement}
                />
                <Divider />
                <RestGetVReadByVidComponent
                    resourceName={_resourceName}
                    searchParameters={_searchParameters}
                    acceptElement={this.props.acceptElement}
                />
                <Divider />
                <Grid columns={1}>
                <Grid.Column width={16}>
                        <RestPostComponent
                            resourceName={_resourceName}
                            endpointUrl={this.props.endpointUrl}
                            searchParameters={_searchParameters}
                            contentTypeElement={this.props.contentTypeElement}
                            acceptElement={this.props.acceptElement}
                            selectedContentType={this.props.selectedContentType}
                        />
                        </Grid.Column>        
                </Grid>                
                <Divider />
                <RestPutByIdComponent
                    resourceName={_resourceName}
                    searchParameters={_searchParameters}
                    acceptElement={this.props.acceptElement}
                />
                <Divider />
                <RestDeleteByIdComponent
                    resourceName={_resourceName}
                    searchParameters={_searchParameters}
                    acceptElement={this.props.acceptElement}
                />                
            </Segment>
        )
    }

}