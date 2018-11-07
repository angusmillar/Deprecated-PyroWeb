import React from 'react';
// import PropTypes from 'prop-types';
import { Segment, Grid, Header, Icon } from 'semantic-ui-react';

import WebLink from '../Componets/Reusable/WebLink/WebLink';

export default class Home extends React.Component {

    static propTypes = {
                
    }

    static defaultProps = {
        
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid stackable >                                    
                <Grid.Row columns={1}>
                    <Grid.Column width={16} >
                        <Segment secondary>
                            <Header as='h2' color='black'>
                                <Icon name='user' />
                                <Header.Content>
                                    Who am I
                                </Header.Content>
                            </Header>
                            <p><WebLink newTab={true} url={'https://www.linkedin.com/in/angus-millar-64298342/'} display={'Angus Millar'} />, I&#39;m an Australian integration specialist with a passion for HL7 integration and informatics.
                            This grew from many years working in pathology laboratories later moving into Laboratory Information Systems (LIS) support and development at <WebLink newTab={true} url={'http://www.kestral.com.au/'} display={'Kestral Computing'} />.
                            More recently I have worked on EMR integration at QLD Health and currently, work as a Solution Architect at the <WebLink newTab={true} url={'https://www.digitalhealth.gov.au/'} display={'Australian Digital Health Agency'} /> (formally known as NeHTA).
                            I regularly attend the Australian FHIR Connectathons and run the beginner streams helping educate newcomers to the FHIR specification.</p>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Column width={16}>
                </Grid.Column>
            </Grid >
            // </Container>
        )
    }

}

