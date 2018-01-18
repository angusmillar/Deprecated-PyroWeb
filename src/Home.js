import React from 'react'
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom'
import { Grid, Header, Image, Icon } from 'semantic-ui-react'
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
// import GridColumn from 'semantic-ui-react/dist/commonjs/collections/Grid/GridColumn';

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
        return (
            // <Container  fluid style={{ marginTop: '7em' }}>
            <Grid stackable >
                <Grid.Row columns={2} verticalAlign='middle'>
                    <Grid.Column width={2} >
                        <Image src={this.props.siteIcon} size='tiny' verticalAlign='middle' />
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Header size='huge'>
                            Pyro Server
                            </Header>
                        FHIR Server Implementation
                        </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16} >
                        <Segment >
                            <Image src={this.props.FhirIcon} size='mini' verticalAlign='bottom' /> <span><b>FHIR Endpoint: </b><code>https://pyrohealth.net/test/stu3/fhir</code></span>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Grid.Column width={16}>
                        <Segment>                          
                            <Header as='h2' color='black'>
                                <Icon name='settings' />
                                <Header.Content>
                                    Implementation
                                </Header.Content>
                            </Header>
                            <p>This server implements the FHIR April 2017 V3.0.1 specification release, and built utilising the official .NET FHIR API.</p>
                            <p>The server supports CRUD, vread and all search parameters and resources as of the release.</p>
                            <p>This server is used for testing only and its resources may be removed and reset at any time.</p>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Grid.Column width={16} >
                        <Segment>
                            <Header as='h2' color='black'>
                                <Icon name='user' />
                                <Header.Content>
                                  Who am I
                                </Header.Content>
                            </Header>                            
                            <p>Angus Millar: I&#39;m a keen Australian integration specialist with a passion for HL7 integration and informatics.</p>
                            <p>My passion grew from many years working in pathology laboratories later moving into Laboratory Information Systems support and development at Kestral Computing.</p>
                            <p>More recently I have worked on EMR integration at QLD Health and currently, work as a Solution Architect at the Australian Digital Health Agency (formally known as NeHTA).</p>
                            <p>I regularly attend the Australian FHIR Connectathons and run the beginner streams helping educate newcomers to the FHIR specification.</p>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Column width={16}>

                </Grid.Column>
            </Grid>
            // </Container>
        )
    }

}

