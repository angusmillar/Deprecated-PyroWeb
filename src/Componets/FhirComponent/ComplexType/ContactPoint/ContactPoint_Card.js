import React from 'react';
import PropTypes from 'prop-types';
import ContactUse_Label from './ContactUse_Label'
import ContactSystem_Label from './ContactSystem_Label'
import Period_Label from '../Period_Label'
import Rank_Label from './Rank_Label'

import { Card, Icon, Container } from 'semantic-ui-react'

class ContactPoint_Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        
        const contactValue = (Value) => {
            return (
                Value &&
                <p>{Value}</p>
            )
        };

        return (
            <div>
                <Card color='teal'>
                    <Card.Content>
                        <Icon bordered color='teal' name='teletype' />
                        Contact <Rank_Label number={this.props.rank}/>
                        </Card.Content>
                    <Card.Content>
                        <Container textAlign='left'>
                            <span>{contactValue(this.props.value)}</span>
                        </Container>
                    </Card.Content>
                    <Card.Content extra>
                        <ContactUse_Label use={this.props.use}/>    
                        <ContactSystem_Label system={this.props.system} />  
                        <Period_Label start='2017-09-01T23:13:00+10:00' end='2017-12-01T09:38:00+10:00'/>
                    </Card.Content>
                </Card>
            </div>
        )
    }

}
//Type Checking
ContactPoint_Card.propTypes = {
    system: PropTypes.string,
    value: PropTypes.string,
    use: PropTypes.string,
    rank: PropTypes.string,
    period: PropTypes.string,
}

export default ContactPoint_Card
