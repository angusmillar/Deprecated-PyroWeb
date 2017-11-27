import React from 'react';
import AppActionsMetadata from 'Actions/AppActionsMetadata';
import AppStoreMetadata from 'Store/AppStoreMetadata';
import AppConstants from 'Constants/AppConstants';
import MetadataHeader from './MetadataHeader';
import { Container, Header, Button, Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

function getItemsState() {
    return {
        MetadataState: AppStoreMetadata.getState()
    };
}

class MetadataComponent extends React.Component {
    constructor(props) {
        super(props);
        this.initialise();
        this.state = getItemsState();
        this._onChange = this._onChange.bind(this);
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

    initialise() {
        AppActionsMetadata.initialiseStore();
    }

    handleClickGetMetadata() {
        AppActionsMetadata.getMetadata();
    }

    _onChange() {
        this.setState(getItemsState());
    }

    name() {
        if (this.state.MetadataState.AjaxState === AppConstants.AjaxState.Call_None) {
            return null;
        }
        else if (this.state.MetadataState.AjaxState === AppConstants.AjaxState.Call_Pending) {
            return (
                <div>
                    <Segment>
                        <Dimmer active inverted>
                            <Loader size='large'>Loading</Loader>
                        </Dimmer>

                        <Image src='/assets/images/wireframe/paragraph.png' />
                    </Segment>
                </div>
            );
        }
        else if (this.state.MetadataState.AjaxState === AppConstants.AjaxState.Call_Complete) {
            if (typeof (this.state.MetadataState.Resource) != 'undefined' && this.state.MetadataState.Resource != null) {
                return <MetadataHeader
                    Name={this.state.MetadataState.Resource.name}
                    Version={this.state.MetadataState.Resource.version}
                    FhirVersion={this.state.MetadataState.Resource.fhirVersion}>
                </MetadataHeader>
                //return <h2>Name: {this.state.MetadataState.Resource.name}</h2>
            }
            else {
                return <h2>Error in loading</h2>
            }
        }
    }

    render() {
        //const items = this.state.appState;


        return (
            <Container text style={{ marginTop: '7em' }}>
                <Header as='h1'>Pyro Server Conformance Statment</Header>
                <Button positive onClick={this.handleClickGetMetadata} >Load Conformance Statment</Button>                
                {this.name()}
            </Container>
        )
    }

}

export default MetadataComponent;  