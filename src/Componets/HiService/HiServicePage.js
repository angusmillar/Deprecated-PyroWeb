import React from 'react';
import AppActions from 'Actions/AppActions';
import AppStoreHiService from 'Store/AppStoreHiService';
import AjaxConstant from 'Constants/AjaxConstant';
import HiRequestForm from './HiRequestForm';
import HiServiceParameterResourceFactory from './HiServiceParameterResourceFactory';
// import PropTypes from 'prop-types';
import { Header, PageDimmer } from 'semantic-ui-react'

function getItemsState2() {
    return {
        HiServiceState: AppStoreHiService.getState()        
    };
}

export default class HiServicePage extends React.Component {

    // static propTypes = {
    // };

    // static defaultProps = {
    // }

    constructor(props) {
        super(props);
        this.initialise();
        this.state = { store: getItemsState2(), Loading: false };
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        AppStoreHiService.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        AppStoreHiService.removeChangeListener(this._onChange);
    }

    initialise() {
        AppActions.initialiseHiServiceStore();
    }

    _onChange() {
        this.setState(() => ({ store: getItemsState2() }));        
    }

    totalCount(Resource) {
        if (typeof (Resource) != 'undefined' && Resource != null) {
            return Resource.total
        }
    }



    onSubmit = (Submitted) => {
        this.setState({ loading: true});
        const ParametersResource = HiServiceParameterResourceFactory.resource(
            Submitted.submittedFamily,
            Submitted.submittedGiven,
            Submitted.submittedGender,
            Submitted.submittedDob,
            Submitted.submittedIhi,
            Submitted.submittedMedicare,
            Submitted.submittedDva,
            'PyroWebUser');

        AppActions.searchHiService(JSON.stringify(ParametersResource));        
    };
   

    renderBody() {
        if (this.state.store.HiServiceState.AjaxCallState === AjaxConstant.CallState.Call_None) {
             return null;
            // return <h2>Test HI Service Call none</h2>
            
        }
        else if (this.state.store.HiServiceState.AjaxCallState === AjaxConstant.CallState.Call_Pending) {
            // return <PageDimmer />
            return <h2>Pending Call dimmer</h2>
        }
        else if (this.state.store.HiServiceState.AjaxCallState === AjaxConstant.CallState.Call_Complete) {
            if (this.state.store.HiServiceState.AjaxOutcome.CallCompletedState == AjaxConstant.CallCompletedState.Completed_Ok) {
                return <h2>Call ok render result work to be done</h2>
            }
            else if (this.state.store.HiServiceState.AjaxOutcome.CallCompletedState == AjaxConstant.CallCompletedState.Completed_ResponseNotOk) {
                return <h2>Response was not OK Maybe a FHIR OperationOutcome, work to do here!</h2>
            }
            else if (this.state.store.HiServiceState.AjaxOutcome.CallCompletedState == AjaxConstant.CallCompletedState.Completed_NoResponse) {                
                return <h2>{this.state.store.HiServiceState.AjaxOutcome.ErrorMessage}</h2>
            }
            else if (this.state.store.HiServiceState.AjaxOutcome.CallCompletedState == AjaxConstant.CallCompletedState.Completed_CallSetupFailed) {
                return <h2>Call Setup failed in Ajax call, work to do here!</h2>
            }
            else {
                return <h2>Unkown AjaxConstant.CallCompletedState</h2>
            }
        }
    }

    render() {
        const { loading } = this.state;
        return (
            <div>
                <Header as='h1'>Hi Service IHI Search</Header>
                <HiRequestForm onSubmit={this.onSubmit} loading={loading}/>    
                {this.renderBody()}
            </div>
        )
    }

}

