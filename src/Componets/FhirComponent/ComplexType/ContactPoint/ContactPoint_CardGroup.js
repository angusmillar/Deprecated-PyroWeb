import React from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import map from 'lodash/map';
import { Grid, Label } from 'semantic-ui-react'

import ContactPoint_Card from './ContactPoint_Card'



class ContactPoint_CardGroup extends React.Component {
    constructor(props) {
        super(props);
    }

    renderCard(telecom) {
        return (
            <Grid.Column>
                <ContactPoint_Card
                    system={telecom.system}
                    value={telecom.value}
                    use={telecom.use}
                    rank={telecom.rank}
                    period={telecom.period}
                />
            </Grid.Column>
        )
    }

    render() {
        if (isUndefined(this.props.Contact)) {
            return null;
        } else {
            return (
                <div>                                        
                    <Grid columns={3} divided>
                        <Grid.Row>
                          <Label as='a' color='teal' ><h4>Contacts for: {this.props.Contact.name}</h4></Label>
                        </Grid.Row>    
                        <Grid.Row>
                            {map(this.props.Contact.telecom, this.renderCard)}
                        </Grid.Row>
                    </Grid>
                </div>
            )
        }
    }

}
//Type Checking
ContactPoint_CardGroup.propTypes = {
    Contact: PropTypes.array,
}



export default ContactPoint_CardGroup
