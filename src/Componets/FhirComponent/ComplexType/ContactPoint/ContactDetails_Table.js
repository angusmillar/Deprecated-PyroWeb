import React from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import map from 'lodash/map';
// import orderBy from 'lodash/orderBy'
import isNil from 'lodash/isNil';
import { Icon, Table } from 'semantic-ui-react'

import ContactPoint_Row from './ContactPoint_Row'

class ContactDetails_Table extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const renderTelcom = (Contact) => {
            if (isNil(Contact)) {
                return null
            }
            else {                
                return (
                    // sort the Contact by Rank if avaliable
                    // map(orderBy(Contact, ['rank']), (telecom, key) => {
                    map(Contact, (telecom, key) => {
                        return (                            
                                <ContactPoint_Row
                                    key={key}
                                    system={telecom.system}
                                    value={telecom.value}
                                    use={telecom.use}
                                    rank={telecom.rank}
                                    period={telecom.period} />                            
                        )
                    })
                )
            }
        };

        if (isUndefined(this.props.Telecom)) {
            return null;
        } else {
            return (
                <Table padded >
                    <Table.Header>
                        <Table.Row>                            
                            <Table.HeaderCell  colSpan='3' singleLine>
                            <Icon bordered color='teal' name='teletype' /> Contacts details for: {this.props.Name}
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>                       
                        {renderTelcom(this.props.Telecom)}
                    </Table.Body>
                </Table>
            )
        }
    }

}
//Type Checking
ContactDetails_Table.propTypes = {
    Telecom: PropTypes.array,
    Name: PropTypes.string,
}

export default ContactDetails_Table
