import React from 'react';
import AppActions from 'Actions/AppActions';
import AppStore from 'Store/AppStore';
import { Container, Header, Button } from 'semantic-ui-react'

function getItemsState() {
    return {        
        appState: AppStore.getState()
    };
}

class FluxTest extends React.Component {

    constructor(props) {
        super(props);
        this.initialise();
        this.state = getItemsState();
        this._onChange = this._onChange.bind(this);
    }

    // getInitialState() {
    //     return getItemsState();
    // }

    componentDidMount() {
        AppStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        AppStore.removeChangeListener(this._onChange);
    }

    initialise() {
        AppActions.initialiseStore();
    }
    
    handleClickGetAPIData() {
        AppActions.getPatient();
    }

    _onChange() {        
        this.setState(getItemsState());        
    }

    totalCount(Resource)
    {
        if (typeof (Resource) != 'undefined' && Resource != null) {
            return Resource.total
        }
    }

    render() {
        //const items = this.state.appState;
       
       
        return (
            <Container text style={{ marginTop: '7em' }}>
                <Header as='h1'>Home Page Template</Header>               
                <Button positive onClick={this.handleClickGetAPIData} >Get Date From API</Button>
                <p>This is a basic fixed menu template using fixed size containers.</p>     
                {this.totalCount(this.state.appState.Resource) > 0 && 
                <h2>Count: {this.totalCount(this.state.appState.Resource)}</h2>                
                }
                
                <p>A text container on the HOME page is used for the main container</p>
                <p>A text container on the HOME page is used for the main container</p>
                <p>A text container on the HOME page is used for the main container</p>

            </Container>
        )
    }

}

export default FluxTest;  