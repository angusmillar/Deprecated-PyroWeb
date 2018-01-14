import React from 'react'
import PropTypes from 'prop-types';
import MainMenu from 'MainMenu';
import MainFooter from 'MainFooter';
import Home from 'Home';
import FluxTest from 'FluxTest';
import MetadataComponent from './Componets/Conformance/MetadataComponent';
// import PyroServerApi from './Componets/PyroFhirApi/PyroServerApi';
import MetaDataStoreComponent from './Componets/Reusable/StoreCompontents/MetaDataStoreComponent'

import { BrowserRouter as Router, Route } from 'react-router-dom'

export default class MainLayoutTwo extends React.Component {

    static propTypes = {
        siteIconProp: PropTypes.string,        
    }

    static defaultProps = {
        siteIconProp: require('./Images/PyroIcon-100.png')
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div>
                    <MainMenu siteIconProp={this.props.siteIconProp} />
                    <Route exact path="/" component={Home} />                    
                    <Route exact path="/FluxTest-content" component={FluxTest} />
                    <Route exact path="/metadata-content" component={MetadataComponent} />
                    <Route exact path="/pyro-fhir-api" component={MetaDataStoreComponent} />
                    <MainFooter siteIconProp={this.props.siteIconProp} />
                </div>
            </Router>
        )
    }
}
