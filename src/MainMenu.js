import React from 'react'
import PropTypes from 'prop-types';
import { Container, Dropdown, Image, Menu, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class MainMenu extends React.Component {
    render() {
        return (
            <Grid stackable >
                <Grid.Row columns={1} only='computer'>
                    <Grid.Column width={16} >
                        <Menu fixed='top' inverted>
                            <Container>
                                <Menu.Item as={Link} to='/' header>
                                    <Image
                                        size='mini'
                                        circular
                                        src={this.props.siteIcon}
                                        style={{ marginRight: '1.5em' }}
                                    />
                                </Menu.Item>
                                <Dropdown item simple text='STU3 Pyro Server'>
                                    <Dropdown.Menu>
                                        <Dropdown.Header icon='server' content='FHIR Server (STU3)' />
                                        <Dropdown.Divider />
                                        <Dropdown.Item icon='info circle' text='Features' as={Link} to='/pyro-stu3-fhir-features' />
                                        <Dropdown.Item icon='clipboard' text='Documentation' as={Link} to='/pyro-stu3-fhir-documentation' />                                        
                                        <Dropdown.Item icon='cogs' text='API Documentation' as={Link} to='/pyro-stu3-fhir-api' />
                                        <Dropdown.Item icon='fire' text='Conformance Statment' as={Link} to='/pyro-stu3-fhir-metadata' />
                                        <Dropdown.Item icon='search' text='Search' as={Link} to='/pyro-stu3-fhir-search' />
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Dropdown item simple text='R4 Pyro Server'>
                                    <Dropdown.Menu>
                                        <Dropdown.Header icon='server' content='FHIR Server (R4)' />
                                        <Dropdown.Divider />
                                        <Dropdown.Item icon='info circle' text='Features' as={Link} to='/pyro-r4-fhir-features' />
                                        <Dropdown.Item icon='clipboard' text='Documentation' as={Link} to='/pyro-r4-fhir-documentation' />                                        
                                        <Dropdown.Item icon='cogs' text='API Documentation' as={Link} to='/pyro-r4-fhir-api' />
                                        <Dropdown.Item icon='fire' text='Conformance Statment' as={Link} to='/pyro-r4-fhir-metadata' />
                                        <Dropdown.Item icon='search' text='Search' as={Link} to='/pyro-r4-fhir-search' />
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Dropdown item simple text='HI Service'>
                                    <Dropdown.Menu>
                                        <Dropdown.Header icon='server' content='HI Service' />
                                        <Dropdown.Divider />
                                        <Dropdown.Item icon='search' text='IHI Search' as={Link} to='/pyro-stu3-fhir-HiService' />
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Dropdown item simple text='About'>
                                    <Dropdown.Menu>
                                        <Dropdown.Header icon='question circle' content='About' />
                                        <Dropdown.Divider />
                                        <Dropdown.Item icon='user' text='Who Am I' as={Link} to='/who-am-i' />
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Container>
                        </Menu>
                    </Grid.Column>
                </Grid.Row>


                <Grid.Row columns={1} only='tablet'>
                    <Grid.Column width={16} >
                        <Menu fixed='top' inverted>
                            <Container>
                                <Menu.Item as={Link} to='/' header>
                                    <Image
                                        size='mini'
                                        circular
                                        src={this.props.siteIcon}
                                        style={{ marginRight: '1.5em' }}
                                    />
                                </Menu.Item>
                                <Dropdown item simple text='STU3 Pyro Server'>
                                    <Dropdown.Menu>
                                        <Dropdown.Header icon='server' content='FHIR Server (STU3)' />
                                        <Dropdown.Divider />
                                        <Dropdown.Item icon='info circle' text='Features' as={Link} to='/pyro-stu3-fhir-features' />
                                        <Dropdown.Item icon='cogs' text='API Documentation' as={Link} to='/pyro-stu3-fhir-api' />
                                        <Dropdown.Item icon='fire' text='Conformance Statment' as={Link} to='/pyro-stu3-fhir-metadata' />
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Dropdown item simple text='R4 Pyro Server'>
                                    <Dropdown.Menu>
                                        <Dropdown.Header icon='server' content='FHIR Server (R4)' />
                                        <Dropdown.Divider />
                                        <Dropdown.Item icon='info circle' text='Features' as={Link} to='/pyro-r4-fhir-features' />
                                        <Dropdown.Item icon='clipboard' text='Documentation' as={Link} to='/pyro-r4-fhir-documentation' />
                                        <Dropdown.Item icon='cogs' text='API Documentation' as={Link} to='/pyro-r4-fhir-api' />
                                        <Dropdown.Item icon='fire' text='Conformance Statment' as={Link} to='/pyro-r4-fhir-metadata' />
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Dropdown item simple text='HI Service'>
                                    <Dropdown.Menu>
                                        <Dropdown.Header icon='server' content='HI Service' />
                                        <Dropdown.Divider />
                                        <Dropdown.Item icon='search' text='IHI Search' as={Link} to='/pyro-stu3-fhir-HiService' />
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Dropdown item simple text='About'>
                                    <Dropdown.Menu>
                                        <Dropdown.Header icon='question circle' content='About' />
                                        <Dropdown.Divider />
                                        <Dropdown.Item icon='user' text='Who Am I' as={Link} to='/who-am-i' />
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Container>
                        </Menu>
                    </Grid.Column>
                </Grid.Row>


                <Grid.Row columns={1} only='mobile'>
                    <Grid.Column width={16} >
                        <Menu fixed='top' inverted>
                            <Container>                                
                                <Dropdown className='icon' icon='bars' item >
                                    <Dropdown.Menu>
                                        <Dropdown.Item icon='home' text='Home' as={Link} to='/' />

                                        <Dropdown.Header icon='server' content='FHIR Server (STU3)' />
                                        <Dropdown.Divider />
                                        <Dropdown.Item icon='info circle' text='(STU3) Features' as={Link} to='/pyro-stu3-fhir-features' />
                                        <Dropdown.Item icon='cogs' text='(STU3) API Documentation' as={Link} to='/pyro-stu3-fhir-api' />
                                        <Dropdown.Item icon='fire' text='(STU3) Conformance Statment' as={Link} to='/pyro-stu3-fhir-metadata' />

                                        <Dropdown.Header icon='server' content='FHIR Server (R4)' />
                                        <Dropdown.Divider />
                                        <Dropdown.Item icon='info circle' text='(R4) Features' as={Link} to='/pyro-r4-fhir-features' />
                                        <Dropdown.Item icon='clipboard' text='(R4) Documentation' as={Link} to='/pyro-r4-fhir-documentation' />
                                        <Dropdown.Item icon='cogs' text='(R4) API Documentation' as={Link} to='/pyro-r4-fhir-api' />
                                        <Dropdown.Item icon='fire' text='(R4) Conformance Statment' as={Link} to='/pyro-r4-fhir-metadata' />

                                        <Dropdown.Header icon='server' content='HI Service' />
                                        <Dropdown.Divider />
                                        <Dropdown.Item icon='search' text='IHI Search' as={Link} to='/pyro-stu3-fhir-HiService' />

                                        <Dropdown.Header icon='question circle' content='About' />
                                        <Dropdown.Divider />
                                        <Dropdown.Item icon='user' text='Who Am I' as={Link} to='/who-am-i' />

                                    </Dropdown.Menu>
                                </Dropdown>
                                <Menu.Item>Pyrohealth</Menu.Item>
                            </Container>
                        </Menu>
                    </Grid.Column>
                </Grid.Row>

            </Grid>


        )
    }
}

//Type Checking
MainMenu.propTypes = {
    setCurrentPage: PropTypes.func,
    siteIcon: PropTypes.string,
}

//Null Ref checking
MainMenu.propTypes = {
    siteIcon: PropTypes.string.isRequired
}

export default MainMenu