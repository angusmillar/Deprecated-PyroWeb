import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Icon, Segment, List } from 'semantic-ui-react';

import MainLogo from '../Componets/SiteLogo/MainLogo'
import DeviceConstants from '../Constants/DeviceConstants';
import { Link } from 'react-router-dom'

export default class r4ServerDocumentation extends React.Component {

    static propTypes = {
        siteIcon: PropTypes.string.isRequired,
    }

    static defaultProps = {
    }

    constructor(props) {
        super(props);
    }

    render() {

        const pageTitle = 'Site Map';
        const computerSize = 'large';
        const tabletSize = 'small';
        const mobileSize = 'tiny';       

        const renderDocuemntation = (size) => {

            return (
                <div>
                    <Segment size='small'>
                        <Header size={size} color='black'>
                            <Icon name='settings' />
                            <Header.Content>
                                {pageTitle}
                            </Header.Content>
                        </Header>                        
                        <Grid stackable padded='horizontally'>
                            <Grid.Row columns={1}>
                                <Grid.Column width={16}>
                                    <List>
                                    <List.Item><Header>Home</Header>
                                        <List.List>
                                                <List.Item icon='home' content='Home' as={Link} to='/' />                                                                                               
                                            </List.List>
                                        </List.Item>
                                        <List.Item><Header>STU3 Pyro Server</Header>
                                        <List.List>
                                                <List.Item icon='info circle' content='Features' as={Link} to='/pyro-stu3-fhir-features' />
                                                <List.Item icon='clipboard' content='Documentation' as={Link} to='/pyro-stu3-fhir-documentation' />
                                                <List.Item icon='cogs' content='API Documentation' as={Link} to='/pyro-stu3-fhir-api' />
                                                <List.Item icon='fire' content='Conformance Statment' as={Link} to='/pyro-stu3-fhir-metadata' />
                                            </List.List>
                                        </List.Item>
                                        <List.Item><Header>R4 Pyro Server</Header>
                                        <List.List>
                                                <List.Item icon='info circle' content='Features' as={Link} to='/pyro-r4-fhir-features' />
                                                <List.Item icon='clipboard' content='Documentation' as={Link} to='/pyro-r4-fhir-documentation' />
                                                <List.Item icon='cogs' content='API Documentation' as={Link} to='/pyro-r4-fhir-api' />
                                                <List.Item icon='fire' content='Conformance Statment' as={Link} to='/pyro-r4-fhir-metadata' />
                                            </List.List>
                                        </List.Item>
                                        <List.Item><Header>HI Service</Header>
                                        <List.List>
                                                <List.Item icon='search' content='IHI Search' as={Link} to='/pyro-stu3-fhir-HiService' />                                               
                                            </List.List>
                                        </List.Item>
                                        <List.Item><Header>About</Header>
                                        <List.List>
                                                <List.Item icon='user' content='Who Am I' as={Link} to='/who-am-i' />                                               
                                                <List.Item icon='sitemap' content='SiteMap' as={Link} to='/SiteMap' />                                               
                                            </List.List>
                                        </List.Item>
                                    </List>       
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </div>
            )
        };

        return (
            <Grid stackable >
                <Grid.Row columns={2} only='computer'>                    
                    <Grid.Column width={8} >
                        <MainLogo siteIcon={this.props.siteIcon} deviceType={DeviceConstants.deviceType.computer} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1} only='computer'>
                    <Grid.Column width={16}>
                        {renderDocuemntation(computerSize)}
                    </Grid.Column>
                </Grid.Row>



                <Grid.Row columns={2} only='tablet'>                    
                    <Grid.Column width={8} >
                        <MainLogo siteIcon={this.props.siteIcon} deviceType={DeviceConstants.deviceType.tablet} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={1} only='tablet'>
                    <Grid.Column width={16}>
                        {renderDocuemntation(tabletSize)}
                    </Grid.Column>
                </Grid.Row>



                <Grid.Row columns={2} only='mobile'>                    
                    <Grid.Column width={8} >
                        <MainLogo siteIcon={this.props.siteIcon} deviceType={DeviceConstants.deviceType.mobile} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1} only='mobile'>
                    <Grid.Column width={16}>
                        {renderDocuemntation(mobileSize)}
                    </Grid.Column>
                </Grid.Row>



                <Grid.Column width={16}>
                </Grid.Column>
            </Grid >
            // </Container>
        )
    }

}

