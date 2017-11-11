import React from 'react'
import PropTypes from 'prop-types';
import { Container, Header } from 'semantic-ui-react'

class DunnyContent extends React.Component{
    
    render() {
        return (              
            <Container text style={{ marginTop: '7em' }}>            
                <Header as='h1'>Dummy Page Template</Header>
                <button onClick={(event) => { this.props.setCurrentPage(event, { page: 'home' }); }}>Home Page</button>
                <p>This is a basic fixed menu template using fixed size containers.</p>            
                <p>A text container on the DUMMY page is used for the main container</p>
                <p>A text container on the DUMMY page is used for the main container</p>
                <p>A text container on the DUMMY page is used for the main container</p>
                <p>A text container on the DUMMY page is used for the main container</p>
                <p>A text container on the DUMMY page is used for the main container</p>
                <p>A text container on the DUMMY page is used for the main container</p>
                <p>A text container on the DUMMY page is used for the main container</p>
                <p>A text container on the DUMMY page is used for the main container</p>
                <p>A text container on the DUMMY page is used for the main container</p>
                <p>A text container on the DUMMY page is used for the main container</p>
                <p>A text container on the DUMMY page is used for the main container</p>
                <p>A text container on the DUMMY page is used for the main container</p>
                <p>A text container on the DUMMY page is used for the main container</p>
                <p>A text container on the DUMMY page is used for the main container</p>
                <p>A text container on the DUMMY page is used for the main container</p>
                <p>A text container on the DUMMY page is used for the main container</p>
            </Container>         
        )
    }

}
 
DunnyContent.propTypes = {
    setCurrentPage: PropTypes.func,
};
  
export default DunnyContent