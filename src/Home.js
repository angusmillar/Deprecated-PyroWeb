import React from 'react'
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { Container, Header, Button } from 'semantic-ui-react'

class Home extends React.Component{
    
    render() {
        return (              
            <Container text style={{ marginTop: '7em' }}>            
                <Header as='h1'>Home Page Template</Header>
                <Button positive as={Link} to='/FluxTest-content'>Dummy Content</Button>
                <p>This is a basic fixed menu template using fixed size containers.</p>            
                <p>A text container on the HOME page is used for the main container</p>
                <p>A text container on the HOME page is used for the main container</p>
                <p>A text container on the HOME page is used for the main container</p>
                <p>A text container on the HOME page is used for the main container</p>
                <p>A text container on the HOME page is used for the main container</p>
                <p>A text container on the HOME page is used for the main container</p>
                <p>A text container on the HOME page is used for the main container</p>
                <p>A text container on the HOME page is used for the main container</p>
                <p>A text container on the HOME page is used for the main container</p>
                <p>A text container on the HOME page is used for the main container</p>
                <p>A text container on the HOME page is used for the main container</p>
                <p>A text container on the HOME page is used for the main container</p>
                <p>A text container on the HOME page is used for the main container</p>
                <p>A text container on the HOME page is used for the main container</p>
                <p>A text container on the HOME page is used for the main container</p>
                <p>A text container on the HOME page is used for the main container</p>                  
            </Container>         
        )
    }

}
 
export default Home