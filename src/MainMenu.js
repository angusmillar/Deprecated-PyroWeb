import React from 'react'
import PropTypes from 'prop-types';
import { Container, Dropdown, Image, Menu } from 'semantic-ui-react'


const MainMenu = (props) => (
    
    <Menu fixed='top' inverted>
    <Container>
        <Menu.Item as='a' header>
            <Image
                size='mini'
                shape={'circular'}
                src={props.siteIconProp}
                style={{ marginRight: '1.5em' }}
            />
            Pyro Web
        </Menu.Item>

        <Menu.Item as='a'>Home</Menu.Item>

        <Dropdown item simple text='Dropdown'>
            <Dropdown.Menu>
                <Dropdown.Item>List Item1</Dropdown.Item>
                <Dropdown.Item
                    onClick={(event) => { props.setCurrentPage(event, { page: 'dunnyContent' }); }}
                >List Item2</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>Header Item</Dropdown.Header>
                <Dropdown.Item>
                    <i className='dropdown icon' />
                    <span className='text'>Submenu</span>
                    <Dropdown.Menu>
                        <Dropdown.Item>List Item1</Dropdown.Item>
                        <Dropdown.Item>List Item2</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </Container>
    </Menu>                
  );

  
// class MainMenu extends React.Component{
    
//     render() {
//         return (
           
//             <Menu fixed='top' inverted>
//                 <Container>
//                     <Menu.Item as='a' header>
//                         <Image
//                             size='mini'
//                             shape={'circular'}
//                             src={this.props.siteIconProp}
//                             style={{ marginRight: '1.5em' }}
//                         />
//                         Pyro Web
//                     </Menu.Item>
    
//                     <Menu.Item as='a'>Home</Menu.Item>
    
//                     <Dropdown item simple text='Dropdown'>
//                         <Dropdown.Menu>
//                             <Dropdown.Item>List Item1</Dropdown.Item>
//                             <Dropdown.Item
//                                 onClick={(event) => { props.setCurrentPage(event, { page: 'dunnyContent' }); }}
//                             >List Item2</Dropdown.Item>
//                             <Dropdown.Divider />
//                             <Dropdown.Header>Header Item</Dropdown.Header>
//                             <Dropdown.Item>
//                                 <i className='dropdown icon' />
//                                 <span className='text'>Submenu</span>
//                                 <Dropdown.Menu>
//                                     <Dropdown.Item>List Item1</Dropdown.Item>
//                                     <Dropdown.Item>List Item2</Dropdown.Item>
//                                 </Dropdown.Menu>
//                             </Dropdown.Item>
//                             <Dropdown.Item>List Item</Dropdown.Item>
//                         </Dropdown.Menu>
//                     </Dropdown>
//                 </Container>
//             </Menu>                
//         )
//     }

// }

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