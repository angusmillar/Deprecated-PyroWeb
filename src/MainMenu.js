import React from 'react'
import PropTypes from 'prop-types';
import { Container, Dropdown, Image, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class MainMenu extends React.Component{    
    render() {
        return (                       
            <Menu fixed='top' inverted>                
                <Container>
                    <Menu.Item as={Link} to='/' header>
                        <Image
                            size='mini'
                            circular
                            src={this.props.siteIconProp}
                            style={{ marginRight: '1.5em' }}
                        />
                        Pyro Web
                    </Menu.Item>
    
                    {/* <Menu.Item as={Link} to='/'>Home</Menu.Item> */}
    
                    <Dropdown item simple text='Server Information'>
                        <Dropdown.Menu>                            
                            {/* <Dropdown.Item as={Link} to='/dunny-content'>Dumy Content</Dropdown.Item> */}
                            <Dropdown.Item as={Link} to='/pyro-fhir-api'>Pyro Server FHIR API Documentation</Dropdown.Item>
                            <Dropdown.Item as={Link} to='/metadata-content'>FHIR Conformance Statment</Dropdown.Item>
                            {/* <Dropdown.Divider /> */}
                            {/* <Dropdown.Header>Header Item</Dropdown.Header> */}
                            {/* <Dropdown.Item>
                                <i className='dropdown icon' />
                                <span className='text'>Submenu</span>
                                <Dropdown.Menu>
                                    <Dropdown.Item>List Item1</Dropdown.Item>
                                    <Dropdown.Item>List Item2</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown.Item>
                            <Dropdown.Item>List Item</Dropdown.Item> */}
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
    siteIconProp: PropTypes.string,     
 }

 //Null Ref checking
 MainMenu.propTypes = {
    siteIconProp: PropTypes.string.isRequired    
 }
 
export default MainMenu