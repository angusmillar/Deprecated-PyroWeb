import React from 'react';
import PropTypes from 'prop-types';
import MainMenu from 'MainMenu';
import MainFooter from 'MainFooter';
import Home from 'Home';
import HiServicePage from './Componets/HiService/HiServicePage';
import { Container } from 'semantic-ui-react'
import MetaDataStoreComponent from './Componets/Reusable/StoreCompontents/MetaDataStoreComponent';

import AppActions from './Actions/AppActions';
// import AppActionsMetadata from 'Actions/AppActionsMetadata';
import AppStoreMetadata from 'Store/AppStoreMetadata';

import { BrowserRouter as Router, Route } from 'react-router-dom';

function getItemsState() {
    return {
        MetadataState: AppStoreMetadata.getState()
    };
}

export default class MainLayoutTwo extends React.Component {

    static propTypes = {
        siteIcon: PropTypes.string,
    }

    static defaultProps = {
        siteIcon: require('./Images/SiteIcon/PyroIcon-100.png')
    }

    constructor(props) {
        super(props);
        this.initialise();
        this.state = { store: getItemsState() };
    }

    initialise() {        
        //AppActions.initialiseMetadataStore();
        AppActions.getMetadata()
    }

    componentDidMount() {
        AppStoreMetadata.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        AppStoreMetadata.removeChangeListener(this._onChange);
    }

    _onChange = () => {
        this.setState(() => ({ store: getItemsState() }));
    }

    render() {

        const renderHomeComponent = (props, Component) => {
            return (
                <Component
                    {...props}
                    renderType={MetaDataStoreComponent.RenderType.ServerConformanceStatment}
                    siteIcon={this.props.siteIcon} />
            )
        };

        const renderFhirServerApiComponent = (props, Component) => {
            return (
                <Component
                    {...props}
                    renderType={MetaDataStoreComponent.RenderType.ServerAPI}
                    store={this.state.store} />
            )
        };

        const renderFhirServerConformanceStatmentComponent = (props, Component) => {
            return (
                <Component
                    {...props}
                    renderType={MetaDataStoreComponent.RenderType.ServerConformanceStatment}
                    store={this.state.store} />
            )
        };

        // Top Right Bottom Left
        return (
            <Router>
                <div>
                    <MainMenu siteIcon={this.props.siteIcon} />
                    <Container style={{ marginBottom: '5em', marginTop: '7em' }}>
                        {/* <div style={{ margin: '5em 0em 2em 0em', padding: '0em 3em 0em 3em' }}> */}
                        <Route exact path="/" render={(props) => renderHomeComponent(props, Home)} />                        
                        <Route exact path="/metadata-content" render={(props) => renderFhirServerConformanceStatmentComponent(props, MetaDataStoreComponent)} />
                        <Route exact path="/pyro-fhir-api" render={(props) => renderFhirServerApiComponent(props, MetaDataStoreComponent)} />
                        <Route exact path="/HiService" component={HiServicePage} />                                                
                    </Container>
                    <MainFooter siteIcon={this.props.siteIcon} />
                </div>
            </Router>
        )
    }
}
