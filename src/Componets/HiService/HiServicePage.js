import React from 'react';
import AppActionsHiService from 'Actions/AppActionsHiService';
import AppStoreHiService from 'Store/AppStoreHiService';
import HiRequestForm from './HiRequestForm';
import { Container, Header, Button } from 'semantic-ui-react'

function getItemsState() {
    return {
        appState: AppStoreHiService.getState()
    };
}

class HiServicePage extends React.Component {

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
        AppStoreHiService.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        AppStoreHiService.removeChangeListener(this._onChange);
    }

    initialise() {
        AppActionsHiService.initialiseStore();
    }

    // handleClickGetAPIData() {
    //     AppActionsHiService.getHiService('Hi Angus');
    // }

    handleClickGetAPIData = () => {
        AppActionsHiService.searchHiService('Hi Angus');
    }

    _onChange() {
        this.setState(getItemsState());
    }

    totalCount(Resource) {
        if (typeof (Resource) != 'undefined' && Resource != null) {
            return Resource.total
        }
    }






    render() {
        //const items = this.state.appState;


        return (
            // <Container text style={{ marginTop: '7em' }}>
            <div>   
                <Header as='h1'>Home Page Template</Header>
                <Button positive onClick={this.handleClickGetAPIData} >Get Date From API</Button>
                <HiRequestForm/>
            </div>
            // </Container>
        )
    }

}

export default HiServicePage;  