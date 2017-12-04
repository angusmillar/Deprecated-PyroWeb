import React from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import map from 'lodash/map';
import isNil from 'lodash/isNil';
import { Grid, Label, Segment } from 'semantic-ui-react'

import ContactPoint_Card from './ContactPoint_Card'

class ContactDetails_CardGroup extends React.Component {
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
                    map(Contact, (telecom, key) => {
                        return (
                            <Grid.Column key={key}>
                                <ContactPoint_Card
                                    system={telecom.system}
                                    value={telecom.value}
                                    use={telecom.use}
                                    rank={telecom.rank}
                                    period={telecom.period}/>
                            </Grid.Column>
                        )
                    })
                )
            }
        };

        if (isUndefined(this.props.Telecom)) {
            return null;
        } else {
            return (
                <Segment>
                    <Label attached='top'>
                        Contacts details for: {this.props.Name}
                    </Label>
                    <Grid columns={3} divided='vertically'>
                        <Grid.Row>
                            {renderTelcom(this.props.Telecom)}
                        </Grid.Row>
                    </Grid>                    
                </Segment>
            )
        }
    }

}
//Type Checking
ContactDetails_CardGroup.propTypes = {
    Telecom: PropTypes.array,
    Name: PropTypes.string,
}

export default ContactDetails_CardGroup
