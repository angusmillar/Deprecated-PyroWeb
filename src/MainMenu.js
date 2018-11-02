import React from 'react'
import PropTypes from 'prop-types';
import { Container, Dropdown, Image, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class MainMenu extends React.Component {
    render() {
        return (
            <Menu fixed='top' inverted >
                <Container>
                    <Menu.Item as={Link} to='/' header>
                        <Image
                            size='mini'
                            circular
                            src={this.props.siteIcon}
                            style={{ marginRight: '1.5em' }}
                        />
                        Pyro Web
                    </Menu.Item>

                    {/* <Menu.Item as={Link} to='/'>Home</Menu.Item> */}

                    <Dropdown item simple text='Server Information'>
                        <Dropdown.Menu>
                            {/* <Dropdown.Divider /> */}
                            {/* <Dropdown.Header>Header Item</Dropdown.Header> */}
                            <Dropdown.Item>
                                <i className='dropdown icon' />
                                <span className='text'>FHIR Server STU3</span>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to='/pyro-stu3-fhir-api'>API Documentation</Dropdown.Item>
                                    <Dropdown.Item as={Link} to='/pyro-stu3-fhir-metadata'>Conformance Statment</Dropdown.Item>                                    
                                </Dropdown.Menu>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <i className='dropdown icon' />
                                <span className='text'>FHIR Server R4</span>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to='/pyro-r4-fhir-api'>API Documentation</Dropdown.Item>
                                    <Dropdown.Item as={Link} to='/pyro-r4-fhir-metadata'>Conformance Statment</Dropdown.Item>                                    
                                </Dropdown.Menu>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item as={Link} to='/pyro-stu3-fhir-HiService'>HI Service Search</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
            </Menu>
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