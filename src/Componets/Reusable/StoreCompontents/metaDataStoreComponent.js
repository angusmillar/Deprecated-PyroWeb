import React from 'react';
import AppActionsMetadata from 'Actions/AppActionsMetadata';
import AppStoreMetadata from 'Store/AppStoreMetadata';
import AjaxConstant from 'Constants/AjaxConstant';
// import PropTypes from 'prop-types';
// import isNil from 'lodash/isNil';
// import find from 'lodash/find'
// import map from 'lodash/map';
// import transform from 'lodash/transform'
import { Icon, Grid,Divider, Container, Header } from 'semantic-ui-react'


import PyroServerApi from '../../PyroFhirApi/PyroServerApi'
import PageDimmer from '../PageDimmer/PageDimmer'


function getItemsState() {
    return {
        MetadataState: AppStoreMetadata.getState()
    };
}

export default class MetaDataStoreComponent extends React.Component {

    constructor(props) {
        super(props);
        this.initialise();
        this.state = { store: getItemsState()};
    }

    initialise() {
        AppActionsMetadata.getMetadata()
    }
    
    getInitialState() {
        return getItemsState();
    }

    componentDidMount() {
        AppStoreMetadata.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        AppStoreMetadata.removeChangeListener(this._onChange);
    }



    handleClickGetMetadata = () => {
        AppActionsMetadata.getMetadata();
    }

    _onChange = () => {
        this.setState(() => ({ store: getItemsState()}));        
    }

    renderApiDocumentation() {
        if (this.state.store.MetadataState.AjaxCallState === AjaxConstant.CallState.Call_None) {
            return null;
        }
        else if (this.state.store.MetadataState.AjaxCallState === AjaxConstant.CallState.Call_Pending) {
            return <PageDimmer />
        }
        else if (this.state.store.MetadataState.AjaxCallState === AjaxConstant.CallState.Call_Complete) {
            if (this.state.store.MetadataState.AjaxOutcome.CallCompletedState == AjaxConstant.CallCompletedState.Completed_Ok) {
                return <PyroServerApi ConformanceStatmentResource={this.state.store.MetadataState.AjaxOutcome.FhirResource} />
            }
            else if (this.state.store.MetadataState.AjaxOutcome.CallCompletedState == AjaxConstant.CallCompletedState.Completed_ResponseNotOk) {
                return <h2>Response was not OK Maybe a FHIR OperationOutcome, work to do here!</h2>
            }
            else if (this.state.store.MetadataState.AjaxOutcome.CallCompletedState == AjaxConstant.CallCompletedState.Completed_NoResponse) {
                return <h2>We got no response from the Ajax call, work to do here!</h2>
            }
            else if (this.state.store.MetadataState.AjaxOutcome.CallCompletedState == AjaxConstant.CallCompletedState.Completed_CallSetupFailed) {
                return <h2>Call Setup failed in Ajax call, work to do here!</h2>
            }
            else {
                return <h2>Unkown AjaxConstant.CallCompletedState</h2>
            }
        }
    }



    render() {

        return (
            <Container style={{ marginTop: '7em' }}>
                <div>
                    <Divider hidden />
                    <Header as='h2'>
                        <Icon name='settings' />
                        <Header.Content>
                            FHIR API Documentation
                    </Header.Content>
                    </Header>
                    <Grid>
                        <Grid.Row only='tablet computer' >
                            <div style={{ width: '1000px' }}>
                                {this.renderApiDocumentation()}
                            </div>
                        </Grid.Row>
                        <Grid.Row only='mobile' >
                            <div style={{ width: '640px' }}>
                                {this.renderApiDocumentation()}
                            </div>
                        </Grid.Row>
                    </Grid>
                </div>
            </Container>
        )
    }

}
