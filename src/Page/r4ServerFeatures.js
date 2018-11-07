import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Image, Icon, List, Message } from 'semantic-ui-react';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import FhirServerConstant from '../Constants/FhirServerConstant';
import FhirConstant from '../Constants/FhirConstant';
import WebLink from '../Componets/Reusable/WebLink/WebLink';
import PublicServerResetMessage from '../Componets/PublicServer/Messages/PublicServerResetMessage'
import MainLogo from '../Componets/SiteLogo/MainLogo'
import DeviceConstants from '../Constants/DeviceConstants';

export default class r4ServerFeatures extends React.Component {

    static propTypes = {
        siteIcon: PropTypes.string.isRequired,
        FhirIcon: PropTypes.string,
    }

    static defaultProps = {
        FhirIcon: require('../Images/FhirIcon/icon-fhir-32.png')
    }

    constructor(props) {
        super(props);
    }

    render() {

        const computerSize = 'large';
        const tabletSize = 'small';
        const mobileSize = 'tiny';

    
        const renderPublicServers = (size) => {
            return (
                <div>
                    <Segment >
                        <Header size={size} color='black'>
                            <Icon name='plug' />
                            <Header.Content>
                                Publicly available FHIR server
                                </Header.Content>
                        </Header>
                        {/* <Header size='large'>Publicly available FHIR server endpoint</Header> */}
                        <List divided verticalAlign='middle' relaxed size={size}>
                            <List.Item>
                                <Image avatar src={this.props.FhirIcon} />
                                <List.Content>
                                    <List.Header>FHIR R4 Endpoint</List.Header>
                                    <List.Description>
                                        <code>{FhirServerConstant.PyroR4FhirServerEndpoint}</code>
                                    </List.Description>
                                </List.Content>
                            </List.Item>
                        </List>
                    </Segment>
                </div>
            )
        };

        const renderGitHub = (size) => {
            return (
                <div>
                    <Message icon size={size}>
                        <Icon name='github' />
                        <Message.Content>
                            <Message.Header>GitHub: <WebLink newTab={true} url='https://github.com/angusmillar/Pyro' display='Pyro FHIR Server Repository' /></Message.Header>
                            <p><b>Clone: </b><code>https://github.com/angusmillar/Pyro.git</code></p>
                        </Message.Content>
                    </Message>
                </div>
            )
        };

        const renderImplmentation = (size) => {
            let SubHeadingOneSize = size;
            let SubHeadingTwoSize = size;
            switch (size) {
                case computerSize:
                    SubHeadingOneSize = 'medium';
                    SubHeadingTwoSize = 'small';
                    break;
                case tabletSize:
                    SubHeadingOneSize = 'small';
                    SubHeadingTwoSize = 'tiny';
                    break;
                case mobileSize:
                    SubHeadingOneSize = 'tiny';
                    SubHeadingTwoSize = 'tiny';
                    break;
            }

            return (
                <div>
                    <Segment size={size}>
                        <Header size={size} color='black'>
                            <Icon name='settings' />
                            <Header.Content>
                                Implementation
                            </Header.Content>
                        </Header>
                        <p>This server implements the <WebLink newTab={true} url={FhirConstant.R4_SpecWebsiteUrl} display={FhirConstant.R4_SpecWebsiteDisplay} /> release of the FHIR specification and is built utilising the official <WebLink newTab={true} url={FhirConstant.fhirNetApiGitHubUrl} display={'.NET API for HL7 FHIR'} />.</p>
                        <Header size={SubHeadingOneSize}>
                            The following FHIR specification components are implemented
                        </Header>
                        <List bulleted >
                            <List.Item>All Resources types</List.Item>
                            <List.Item>All Resources search parameters (except for composite parameters)</List.Item>
                            <List.Item>RESTful CRUD</List.Item>
                            <List.Item>Chained search parameters</List.Item>
                            <List.Item>_includes &amp; _revinclude</List.Item>
                            <List.Item>Custom search parameters</List.Item>
                            <List.Item>History</List.Item>
                            <List.Item>Conditional Create</List.Item>
                            <List.Item>Conditional Update</List.Item>
                            <List.Item>Conditional Read</List.Item>
                            <List.Item>Conditional Delete</List.Item>
                            <List.Item>Operation: Validate a resource</List.Item>
                            <List.Item>Bundle Transactions</List.Item>
                        </List>
                        <Header size={SubHeadingOneSize}>
                            Operations
                        </Header>
                        <Header size={SubHeadingTwoSize}>
                            Base Operations:
                        </Header>
                        <List bulleted>
                            <List.Item>$server-indexes-delete-history-indexes</List.Item>
                            <List.Item>$server-indexes-set</List.Item>
                            <List.Item>$server-indexes-index</List.Item>
                            <List.Item>$server-indexes-report</List.Item>
                            <List.Item>$server-resource-report  </List.Item>
                        </List>
                        <Header size={SubHeadingTwoSize}>
                            Resource Operations:
                        </Header>
                        <List bulleted>
                            <List.Item>$server-indexes-delete-history-indexes (All ResourceTypes)</List.Item>
                            <List.Item>$validate (All ResourceTypes)</List.Item>
                            <List.Item>$x-ihisearchorvalidate (Patient ResourceTypes)</List.Item>
                        </List>
                        <Header size={SubHeadingTwoSize}>
                            Resource Instance Operations:
                        </Header>
                        <List bulleted>
                            <List.Item>$validate (All ResourceTypes)</List.Item>
                            <List.Item>$x-set-compartment-active (CompartmentDefinition ResourceTypes)</List.Item>
                            <List.Item>$x-set-compartment-inactive (CompartmentDefinition ResourceTypes)</List.Item>
                        </List>
                        <Header size={SubHeadingTwoSize}>
                            Download the server&#39;s CapabilityStatement:
                        </Header>
                        <code><b>GET: </b>https://stu3.test.pyrohealth.net/fhir/metadata</code>
                    </Segment>
                </div>
            )
        };

        return (
            <Grid stackable >
                <Grid.Row columns={2} only='computer'>
                    <Grid.Column width={8} verticalAlign='middle' >
                        <Header>R4 Pyro Server Features</Header>
                    </Grid.Column>
                    <Grid.Column width={8} >
                        <MainLogo siteIcon={this.props.siteIcon} deviceType={DeviceConstants.deviceType.computer}/>                         
                    </Grid.Column>
                </Grid.Row>           
                <Grid.Row columns={1} only='computer'>
                    <Grid.Column width={16} >
                        {renderPublicServers(computerSize)}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1} only='computer'>
                    <Grid.Column width={16} >
                        <PublicServerResetMessage deviceType={DeviceConstants.deviceType.computer} plural={false} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1} only='computer'>
                    <Grid.Column width={16} >
                        {renderGitHub(computerSize)}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1} only='computer'>
                    <Grid.Column width={16}>
                        {renderImplmentation(computerSize)}
                    </Grid.Column>
                </Grid.Row>

                

                <Grid.Row columns={2} only='tablet'>
                    <Grid.Column width={8} verticalAlign='middle' >
                        <Header>R4 Pyro Server Features</Header>
                    </Grid.Column>
                    <Grid.Column width={8} >
                        <MainLogo siteIcon={this.props.siteIcon} deviceType={DeviceConstants.deviceType.tablet}/>                         
                    </Grid.Column>
                </Grid.Row>    
                <Grid.Row columns={1} only='tablet'>
                    <Grid.Column width={16} >
                        {renderPublicServers(tabletSize)}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1} only='tablet'>
                    <Grid.Column width={16} >
                        <PublicServerResetMessage deviceType={DeviceConstants.deviceType.tablet} plural={false}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1} only='tablet'>
                    <Grid.Column width={16} >
                        {renderGitHub(tabletSize)}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1} only='tablet'>
                    <Grid.Column width={16}>
                        {renderImplmentation(tabletSize)}
                    </Grid.Column>
                </Grid.Row>

                

                <Grid.Row columns={2} only='mobile'>
                    <Grid.Column width={8} verticalAlign='middle' >
                        <Header>R4 Pyro Server Features</Header>
                    </Grid.Column>
                    <Grid.Column width={8} >
                        <MainLogo siteIcon={this.props.siteIcon} deviceType={DeviceConstants.deviceType.mobile}/>                         
                    </Grid.Column>
                </Grid.Row>                                
                <Grid.Row columns={1} only='mobile'>
                    <Grid.Column width={16} >
                        {renderPublicServers(mobileSize)}
                    </Grid.Column>
                </Grid.Row>                               
                <Grid.Row columns={1} only='mobile'>
                    <Grid.Column width={16} >
                        <PublicServerResetMessage deviceType={DeviceConstants.deviceType.mobile} plural={false}/>
                    </Grid.Column>
                </Grid.Row>                                
                <Grid.Row columns={1} only='mobile'>
                    <Grid.Column width={16} >
                        {renderGitHub(mobileSize)}
                    </Grid.Column>
                </Grid.Row>                                
                <Grid.Row columns={1} only='mobile'>
                    <Grid.Column width={16}>
                        {renderImplmentation(mobileSize)}
                    </Grid.Column>
                </Grid.Row>

                

                <Grid.Column width={16}>
                </Grid.Column>
            </Grid >
            // </Container>
        )
    }

}

