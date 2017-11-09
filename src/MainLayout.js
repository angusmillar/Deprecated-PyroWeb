import React from 'react'
import PropTypes from 'prop-types';
import MainMenu from 'MainMenu';
import MainFooter from 'MainFooter';
import Home from 'Home';

//import { Container, Header} from 'semantic-ui-react'

class MainLayout extends React.Component{
    constructor(props) {
        super(props);
          
        this.state = {
            header: 'Header from state...',
            content: 'Content from state...'
        }
    }

    render() {
        return (
            <div>            
                <MainMenu siteIconProp = {this.props.siteIconProp}/>                
                <Home />                
                <MainFooter siteIconProp = {this.props.siteIconProp}/>            
            </div>            
        )
    }

}

MainLayout.propTypes = {
    siteIconProp: PropTypes.string    
 }
 
MainLayout.defaultProps = {
    siteIconProp: require('./Images/PyroIcon-100.png')    
}
 
export default MainLayout