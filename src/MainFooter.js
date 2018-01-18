import React from 'react'
import PropTypes from 'prop-types';
import { Container, Divider, Grid, Header, Image, List, Segment } from 'semantic-ui-react'

class MainFooter extends React.Component{
    
    render() {
        return (           
            <Segment
                inverted
                vertical
                style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
                
                <Container textAlign='center'>
                    <Grid divided inverted stackable centered>
                        <Grid.Row>
                            <Grid.Column width={3} textAlign='center'>
                                <Header inverted as='h4' content='FHIR Resources' />
                                <List link inverted>                                                                                                                                        
                                    <List.Item as='a' href='http://hl7.org/fhir/STU3/index.html'>FHIR Specification STU3</List.Item>
                                    <List.Item as='a' href='http://ewoutkramer.github.io/fhir-net-api/'>.Net FHIR API</List.Item>
                                    <List.Item as='a' href='http://fhir-drills.github.io/'>FHIR-Drills Tutorials</List.Item>
                                    <List.Item as='a' href='http://fhir.hl7.org.au/fhir/base2017Dec/'>Australian FHIR Base Profiles</List.Item>                                    
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3} textAlign='center'>
                                <Header inverted as='h4' content='FHIR Blogs' />
                                <List link inverted>
                                    <List.Item as='a' href='http://www.healthintersections.com.au/'>Health Intersections</List.Item>
                                    <List.Item as='a' href='https://fhirblog.com/'>Hay on FHIR</List.Item>
                                    <List.Item as='a' href='https://thefhirplace.com/'>The FHIR Place</List.Item>   
                                    <List.Item as='a' href='http://motorcycleguy.blogspot.com.au/search/label/FHIR'>Motor Cycle Guy</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3} textAlign='center'>
                                <Header inverted as='h4' content='FHIR Testing' />
                                <List link inverted>
                                    <List.Item as='a' href='http://wiki.hl7.org/index.php?title=Publicly_Available_FHIR_Servers_for_testing'>Public FHIR Test Servers</List.Item>
                                    <List.Item as='a' href='http://www.aegis.net/touchstone.html'>AEGIS FHIR testing Service</List.Item>    
                                    <List.Item as='a' href='https://projectcrucible.org/'>Project Crucible</List.Item>    
                                    <List.Item as='a' href='http://hapifhir.io/doc_server_tester.html'>HAPI FHIR Testing</List.Item>                                        
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3} textAlign='center'>
                                <Header inverted as='h4' content='Give me more FHIR' />
                                <p>There is an active community of FHIR implmenters from around the globe at: </p>                                
                                <List link inverted>
                                    <List.Item as='a' href='https://chat.fhir.org/'>Chat FHIR</List.Item>
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
    
                    <Divider inverted section />
                    <Image
                        centered
                        size='mini'
                        circular
                        src={this.props.siteIcon}
                    />
                    <Divider hidden  />
                    <List horizontal inverted divided link>
                        <List.Item as='a' href='#'>Site Map</List.Item>
                        <List.Item as='a' href='#'>Contact Us</List.Item>                       
                    </List>
                </Container>
            </Segment>           
        )
    }

}

//Type Checking
MainFooter.propTypes = {
    siteIcon: PropTypes.string,    
 }

 //Null Ref checking
 MainFooter.propTypes = {
    siteIcon: PropTypes.string.isRequired    
 }
 
export default MainFooter