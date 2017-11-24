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

    handleClick() {
        AppActions.addItem({ given: 'Angus', family: 'Millar' });
    }

    _onChange() {        
        this.setState(getItemsState());        
    }


    render() {
        const items = this.state.appState;

         //const itemHtml = items.given;

        return (
            <Container text style={{ marginTop: '7em' }}>
                <Header as='h1'>Home Page Template</Header>
                <Button positive onClick={this.handleClick} >Test Me</Button>

                <p>This is a basic fixed menu template using fixed size containers.</p>
                <p>{items.given}</p>
                <p>{items.family}</p>
                <p>A text container on the HOME page is used for the main container</p>
                <p>A text container on the HOME page is used for the main container</p>
                <p>A text container on the HOME page is used for the main container</p>

            </Container>
        )
    }

}



export default FluxTest;  