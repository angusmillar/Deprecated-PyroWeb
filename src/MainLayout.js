import React from 'react'
import PropTypes from 'prop-types';
import MainMenu from 'MainMenu';
import MainFooter from 'MainFooter';
import Home from 'Home';
import FluxTest from 'FluxTest';
import MetadataComponent from 'Componets/Conformance/MetadataComponent';

import { BrowserRouter as Router, Route } from 'react-router-dom'

class MainLayoutTwo extends React.Component {

    render() {
        return (
            <Router>
                <div>
                    <MainMenu siteIconProp={this.props.siteIconProp} />
                    <Route exact path="/" component={Home} />                    
                    <Route exact path="/FluxTest-content" component={FluxTest} />
                    <Route exact path="/metadata-content" component={MetadataComponent} />
                    <MainFooter siteIconProp={this.props.siteIconProp} />
                </div>
            </Router>
        )
    }
}

MainLayoutTwo.propTypes = {
    siteIconProp: PropTypes.string,
}

MainLayoutTwo.defaultProps = {
    siteIconProp: require('./Images/PyroIcon-100.png')
}

export default MainLayoutTwo