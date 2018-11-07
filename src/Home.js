import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Image, Icon, List } from 'semantic-ui-react';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import FhirServerConstant from './Constants/FhirServerConstant';
import WebLink from './Componets/Reusable/WebLink/WebLink';
import FhirConstant from './Constants/FhirConstant';
import PublicServerResetMessage from './Componets/PublicServer/Messages/PublicServerResetMessage'
import DeviceConstants from './Constants/DeviceConstants';
//import { Link } from 'react-router-dom'

export default class Home extends React.Component {

    static propTypes = {
        siteIcon: PropTypes.string.isRequired,
        FhirIcon: PropTypes.string,
    }

    static defaultProps = {
        FhirIcon: require('./Images/FhirIcon/icon-fhir-32.png')
    }

    constructor(props) {
        super(props);
    }

    render() {

        const computerSize = 'large';
        const tabletSize = 'small';
        const mobileSize = 'tiny';

        const renderPublicServersAndGitHubList = (size) => {
            return (
                <div>
                    <Header size='small' color='black'>
                        <Icon name='plug' />
                        <Header.Content>
                            Publicly available Pyro FHIR servers
                        </Header.Content>
                    </Header>                    
                    <List verticalAlign='middle' relaxed size={size}>
                        <List.Item>
                            <Image avatar src={this.props.FhirIcon} />
                            <List.Content>
                                <List.Header>FHIR STU3 Endpoint</List.Header>
                                <List.Description>
                                    <code>{FhirServerConstant.PyroStu3FhirServerEndpoint}</code>
                                </List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            {/* Creates some space */}
                        </List.Item>
                        <List.Item>
                            <Image avatar src={this.props.FhirIcon} />
                            <List.Content>
                                <List.Header>FHIR R4 Endpoint</List.Header>
                                <List.Description>
                                    <code>{FhirServerConstant.PyroR4FhirServerEndpoint}</code>
                                </List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            {/* Creates some space */}
                        </List.Item>
                        <List.Item>
                            <Icon size='large' name='github' />
                            <List.Content>
                                <List.Header>GitHub: <WebLink newTab={true} url='https://github.com/angusmillar/Pyro' display='Pyro FHIR Server Repository' /></List.Header>
                                <List.Description>
                                    <p><b>Clone: </b><code>https://github.com/angusmillar/Pyro.git</code></p>
                                </List.Description>
                            </List.Content>
                        </List.Item>
                    </List>
                </div>
            )
        };

        const renderImplmentation = (size) => {
            return (
                <div>
                    <Segment>

                        <Image src={this.props.siteIcon} size='medium' left="true" />

                        <p>This is the homepage for the Pyro Server general purpose FHIR Server.
                           The implementation is an open-source FHIR API built with C# and Microsoft&apos;s
                           .NET 4.6 Framework and utilises the <WebLink newTab={true} url={FhirConstant.fhirNetApiGitHubUrl} display={'official HL7 FHIR support API'} /> for the Microsoft .NET platform.
                                The implmentation can use either a Microsoft SQL Server or a Postgre SQL database as its storage layer.
                           There are two version of the Pyro Server, STU3 and R4, which align with the <WebLink newTab={true} url={FhirConstant.FhirSpecReleasesWebsiteUrl} display={'offical releases'} /> of the FHIR specification.
                        </p>

                        {renderPublicServersAndGitHubList(size)}
                    
                    </Segment>
                </div>
            )
        };

        return (
            <Grid stackable >
                <Grid.Row columns={1} only='computer'>
                    <Grid.Column width={16}>
                        {renderImplmentation(computerSize)}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1} only='computer'>
                    <Grid.Column width={16}>
                        <PublicServerResetMessage deviceType={DeviceConstants.deviceType.computer} plural={true}/>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={1} only='tablet'>
                    <Grid.Column width={16}>
                        {renderImplmentation(tabletSize)}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1} only='tablet'>
                    <Grid.Column width={16}>
                        <PublicServerResetMessage deviceType={DeviceConstants.deviceType.tablet} plural={true}/>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={1} only='mobile'>
                    <Grid.Column width={16}>
                        {renderImplmentation(mobileSize)}                        
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1} only='mobile'>
                    <Grid.Column width={16}>
                        <PublicServerResetMessage deviceType={DeviceConstants.deviceType.mobile} plural={true}/>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Column width={16}>
                </Grid.Column>
            </Grid >        
        )
    }

}

