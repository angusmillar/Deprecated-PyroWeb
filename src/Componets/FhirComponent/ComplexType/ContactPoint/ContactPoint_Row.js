import React from 'react';
import PropTypes from 'prop-types';
import ContactUse_Label from './ContactUse_Label'
import ContactSystem_Label from './ContactSystem_Label'
import Period_Label from '../Period_Label'
import Rank_Label from './Rank_Label'

import { Table } from 'semantic-ui-react'

class ContactPoint_Row extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const resolveContactValueType = (Value, System) => {
            switch (System) {
                case 'phone':
                    return <a href={'callto:'.concat(Value)}>{Value}</a>                ;
                case 'fax':
                    return <a href={'fax:'.concat(Value)}>{Value}</a>                
                case 'email':
                    return <a href={'mailto:'.concat(Value)}>{Value}</a>                
                case 'pager':
                    return <p>{Value}</p>
                case 'url':
                    return <a href={'http:'.concat(Value)}>{Value}</a>                
                case 'sms':
                    return <a href={'sms:'.concat(Value)}>{Value}</a>                
                case 'other':
                    return <p>{Value}</p>
                default:
                    return <p>{Value}</p>
            }

        };   
        const contactValue = (Value, System) => {
            return (
                Value &&
                resolveContactValueType(Value, System)                
            )
        };

        return (
            <Table.Row>
                <Table.Cell  width='5' textAlign='left'>
                    <ContactUse_Label use={this.props.use} />
                    <ContactSystem_Label system={this.props.system} />
                    <Rank_Label number={this.props.rank}/>
                </Table.Cell>
                <Table.Cell textAlign='left'>
                    <span>{contactValue(this.props.value, this.props.system)}</span>
                </Table.Cell>
                <Table.Cell width='2' textAlign='right'>
                    <Period_Label period={this.props.period} />
                </Table.Cell>
            </Table.Row>
        )
    }

}
//Type Checking
ContactPoint_Row.propTypes = {    
    system: PropTypes.string,
    value: PropTypes.string,
    use: PropTypes.string,
    rank: PropTypes.number,
    period: PropTypes.object,
}

export default ContactPoint_Row
