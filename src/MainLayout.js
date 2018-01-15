import React from 'react';
import PropTypes from 'prop-types';
import MainMenu from 'MainMenu';
import MainFooter from 'MainFooter';
import Home from 'Home';
import FluxTest from 'FluxTest';
import MetadataComponent from './Componets/Conformance/MetadataComponent';
// import PyroServerApi from './Componets/PyroFhirApi/PyroServerApi';
import MetaDataStoreComponent from './Componets/Reusable/StoreCompontents/MetaDataStoreComponent';

import AppActionsMetadata from 'Actions/AppActionsMetadata';
import AppStoreMetadata from 'Store/AppStoreMetadata';

import { BrowserRouter as Router, Route } from 'react-router-dom';

function getItemsState() {
    return {
        MetadataState: AppStoreMetadata.getState()
    };
}

export default class MainLayoutTwo extends React.Component {

    static propTypes = {
        siteIconProp: PropTypes.string,
    }

    static defaultProps = {
        siteIconProp: require('./Images/PyroIcon-100.png')
    }

    constructor(props) {
        super(props);
        this.initialise();
        this.state = { store: getItemsState() };
    }

    initialise() {
        AppActionsMetadata.getMetadata()
    }    

    componentDidMount() {
        AppStoreMetadata.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        AppStoreMetadata.removeChangeListener(this._onChange);
    }

    _onChange = () => {
        this.setState(() => ({ store: getItemsState()}));        
    }

    render() {
        
        const renderMetaDataStoreComponent = (props, Component) => {            
            return (<Component {...props} store={this.state.store} />)
        };
        
        const renderMetadataComponent = (props, Component) => {            
            return (<Component {...props} store={this.state.store} />)
        };

        return (
            <Router>
                <div>
                    <MainMenu siteIconProp={this.props.siteIconProp} />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/FluxTest-content" component={FluxTest} />
                    {/* <Route exact path="/metadata-content" component={MetadataComponent} /> */}
                    {/* <Route exact path="/pyro-fhir-api" component={getMetaDataStoreComponent()} /> */}
                    <Route exact path="/metadata-content" render={(props) => renderMetadataComponent(props, MetadataComponent)} />
                    <Route exact path="/pyro-fhir-api" render={(props) => renderMetaDataStoreComponent(props, MetaDataStoreComponent)} />
                    <MainFooter siteIconProp={this.props.siteIconProp} />
                </div>
            </Router>
        )
    }
}
