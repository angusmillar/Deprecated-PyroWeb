import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Image, Icon, List, Message } from 'semantic-ui-react';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import FhirServerConstant from './Constants/FhirServerConstant';
import FhirConstant from './Constants/FhirConstant';
import WebLink from './Componets/Reusable/WebLink/WebLink';

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
            <Grid stackable >
                {/* <Grid.Row columns={16} style={{ marginLeft: '2em' }} >
                    <Grid.Column width={2} >
                        <Image src={this.props.siteIcon} size='tiny' verticalAlign='middle' />
                    </Grid.Column>
                    <Grid.Column width={5} >
                        <Header size='huge'>
                            Pyro Server
                            </Header>
                        FHIR Server Implementation
                        </Grid.Column>
                </Grid.Row> */}
                <Grid.Row columns={16} >
                    <Grid.Column width={16} >
                        <Image src={this.props.siteIcon} size='medium'  centered />
                    </Grid.Column>
                   
                </Grid.Row>
               
                
                {/* <Grid.Row>
                    <Grid.Column width={16} >
                        <Segment >
                            <Grid>
                                <Grid.Row columns={16}  >                                
                                    <Grid.Column width={8} >                                    
                                        <Header size='huge'>
                                            Pyro Server
                                        </Header>
                                        FHIR Server Implementation
                                        </Grid.Column>
                                        <Grid.Column width={4}>                                   
                                        <Image src={this.props.siteIcon} size='tiny' verticalAlign='middle' centered />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Grid.Column>
                </Grid.Row> */}
                <Grid.Row>
                    <Grid.Column width={16} >
                        <Segment >
                            <Image src={this.props.FhirIcon} size='mini' verticalAlign='bottom' /> <span><b>FHIR Endpoint: </b><code>{FhirServerConstant.PrimaryFhirServerEndpoint}</code></span>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Grid.Column width={16} >
                        <Message icon size='tiny'>
                            <Icon name='github' />
                            <Message.Content>
                                <Message.Header>GitHub: <WebLink newTab={true} url='https://github.com/angusmillar/Pyro' display='Pyro FHIR Server Repository' /></Message.Header>
                                <p><b>Clone: </b><code>https://github.com/angusmillar/Pyro.git</code></p>
                            </Message.Content>
                        </Message>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Grid.Column width={16} >
                        <Message size='tiny'
                            negative
                            icon>
                            <Icon name='warning sign' />
                            <Message.Content>
                                <Message.Header>Warning</Message.Header>
                                <p>This server is used for testing only and its resources may be removed or reset at any time.</p>
                            </Message.Content>
                        </Message>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Grid.Column width={16}>
                        <Segment >
                            <Header as='h2' color='black'>
                                <Icon name='settings' />
                                <Header.Content>
                                    Implementation
                                </Header.Content>
                            </Header>
                            <p>This server implements the <WebLink newTab={true} url={FhirConstant.STU3_SpecWebsiteUrl} display={FhirConstant.STU3_SpecWebsiteDisplay} /> release, and built utilising the official <WebLink newTab={true} url={FhirConstant.fhirNetApiGitHubUrl} display={'.NET API for HL7 FHIR'} />.</p>
                            <h4><b>The following FHIR specification components are implemented</b></h4>

                            <List bulleted>
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
                            <h4><b>Operations</b></h4>
                            <h5><b>Base Operations:</b></h5>
                            <List bulleted>
                                <List.Item>$server-indexes-delete-history-indexes</List.Item>
                                <List.Item>$server-indexes-set</List.Item>
                                <List.Item>$server-indexes-index</List.Item>
                                <List.Item>$server-indexes-report</List.Item>
                                <List.Item>$server-resource-report  </List.Item>
                            </List>
                            <h5><b>Resource Operations:</b></h5>
                            <List bulleted>
                                <List.Item>$server-indexes-delete-history-indexes (All ResourceTypes)</List.Item>
                                <List.Item>$validate (All ResourceTypes)</List.Item>
                                <List.Item>$x-ihisearchorvalidate (Patient ResourceTypes)</List.Item>
                            </List>
                            <h5><b>Resource Instance Operations:</b></h5>
                            <List bulleted>
                                <List.Item>$validate (All ResourceTypes)</List.Item>
                                <List.Item>$x-set-compartment-active (CompartmentDefinition ResourceTypes)</List.Item>
                                <List.Item>$x-set-compartment-inactive (CompartmentDefinition ResourceTypes)</List.Item>
                            </List>
                            <h4>Download the server&#39;s CapabilityStatement:</h4>
                            <code><b>GET: </b>https://stu3.test.pyrohealth.net/fhir/metadata</code>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>



                <Grid.Row columns={1}>
                    <Grid.Column width={16} >
                        <Segment secondary>
                            <Header as='h2' color='black'>
                                <Icon name='user' />
                                <Header.Content>
                                    Who am I
                                </Header.Content>
                            </Header>
                            <p><WebLink newTab={true} url={'https://www.linkedin.com/in/angus-millar-64298342/'} display={'Angus Millar'} />, I&#39;m an Australian integration specialist with a passion for HL7 integration and informatics.
                            This grew from many years working in pathology laboratories later moving into Laboratory Information Systems (LIS) support and development at <WebLink newTab={true} url={'http://www.kestral.com.au/'} display={'Kestral Computing'} />.
                            More recently I have worked on EMR integration at QLD Health and currently, work as a Solution Architect at the <WebLink newTab={true} url={'https://www.digitalhealth.gov.au/'} display={'Australian Digital Health Agency'} /> (formally known as NeHTA).
                            I regularly attend the Australian FHIR Connectathons and run the beginner streams helping educate newcomers to the FHIR specification.</p>
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

