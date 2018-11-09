import React from 'react';
import PropTypes from 'prop-types';
import MainMenu from 'MainMenu';
import MainFooter from 'MainFooter';
import Home from 'Home';
import stu3ServerFeatures from './Page/stu3ServerFeatures'
import r4ServerFeatures from './Page/r4ServerFeatures'
import r4ServerDocumentation from './Page/r4ServerDocumentation';
import stu3ServerDocumentation from './Page/st3ServerDocumentation';
import SiteMap from './Page/SiteMap';
import HiServicePage from './Componets/HiService/HiServicePage';
import whoAmI from './Page/whoAmI';
import { Container } from 'semantic-ui-react'
import MetaDataStoreComponent from './Page/metaDataStoreComponent';
import AppActions from './Actions/AppActions'
import AppStoreStu3Metadata from 'Store/AppStoreStu3Metadata';
import AppStoreR4Metadata from 'Store/AppStoreR4Metadata';


import { BrowserRouter as Router, Route } from 'react-router-dom';

function getItemsState() {
    return {
        MetadataStu3State: AppStoreStu3Metadata.getState(),
        MetadataR4State: AppStoreR4Metadata.getState()
    };
}

export default class MainLayoutTwo extends React.Component {

    static propTypes = {
        siteIcon: PropTypes.string,
        siteLogo: PropTypes.string,
    }

    static defaultProps = {
        siteIcon: require('./Images/SiteIcon/NewPyroIconLong-200.png'),
        siteLogo: require('./Images/SiteIcon/NewPyroLogo-100.png')
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
        AppStoreStu3Metadata.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        AppStoreStu3Metadata.removeChangeListener(this._onChange);
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

        const renderFhirServerStu3ApiComponent = (props, Component) => {
            return (
                <Component
                    {...props}
                    renderType={MetaDataStoreComponent.RenderType.ServerAPI}
                    metadataState={this.state.store.MetadataStu3State} />
            )
        };

        const renderFhirServerStu3ConformanceStatmentComponent = (props, Component) => {
            return (
                <Component
                    {...props}
                    renderType={MetaDataStoreComponent.RenderType.ServerConformanceStatment}
                    metadataState={this.state.store.MetadataStu3State} />
            )
        };

        const renderFhirServerR4ApiComponent = (props, Component) => {
            return (
                <Component
                    {...props}
                    renderType={MetaDataStoreComponent.RenderType.ServerAPI}
                    metadataState={this.state.store.MetadataR4State} />
            )
        };

        const renderFhirServerR4ConformanceStatmentComponent = (props, Component) => {
            return (
                <Component
                    {...props}
                    renderType={MetaDataStoreComponent.RenderType.ServerConformanceStatment}
                    metadataState={this.state.store.MetadataR4State} />
            )
        };

        const renderServerFeaturesComponent = (props, Component) => {
            return (
                <Component
                    {...props}
                    siteIcon={this.props.siteIcon} />
            )
        };
        
        const renderServerDocumentationComponent = (props, Component) => {
            return (
                <Component
                    {...props}
                    siteIcon={this.props.siteIcon} />
            )
        };

        const renderSiteMapComponent = (props, Component) => {
            return (
                <Component
                    {...props}
                    siteIcon={this.props.siteIcon} />
            )
        };

        // Top Right Bottom Left
        return (
            <Router>
                <div>
                    <MainMenu siteIcon={this.props.siteLogo} />
                    <Container style={{ marginBottom: '5em', marginTop: '7em' }}>
                        {/* <div style={{ margin: '5em 0em 2em 0em', padding: '0em 3em 0em 3em' }}> */}
                        <Route exact path="/" render={(props) => renderHomeComponent(props, Home)} />

                        <Route exact path="/pyro-stu3-fhir-features" render={(props) => renderServerFeaturesComponent(props, stu3ServerFeatures)} />
                        <Route exact path="/pyro-stu3-fhir-documentation" render={(props) => renderServerDocumentationComponent(props, stu3ServerDocumentation)}  />
                        <Route exact path="/pyro-stu3-fhir-metadata" render={(props) => renderFhirServerStu3ConformanceStatmentComponent(props, MetaDataStoreComponent)} />
                        <Route exact path="/pyro-stu3-fhir-api" render={(props) => renderFhirServerStu3ApiComponent(props, MetaDataStoreComponent)} />
                        
                        
                        <Route exact path="/pyro-r4-fhir-features" render={(props) => renderServerFeaturesComponent(props, r4ServerFeatures)} />
                        <Route exact path="/pyro-r4-fhir-documentation" render={(props) => renderServerDocumentationComponent(props, r4ServerDocumentation)}  />
                        <Route exact path="/pyro-r4-fhir-metadata" render={(props) => renderFhirServerR4ConformanceStatmentComponent(props, MetaDataStoreComponent)} />
                        <Route exact path="/pyro-r4-fhir-api" render={(props) => renderFhirServerR4ApiComponent(props, MetaDataStoreComponent)} />

                        <Route exact path="/pyro-stu3-fhir-HiService" component={HiServicePage} />
                        <Route exact path="/who-am-i" component={whoAmI} />
                        <Route exact path="/sitemap" render={(props) => renderSiteMapComponent(props, SiteMap)} />
                    </Container>
                    <MainFooter siteIcon={this.props.siteLogo} />
                </div>
            </Router>
        )
    }
}
