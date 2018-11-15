import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Grid, Header, Icon, Embed } from 'semantic-ui-react';

import WebLink from '../Componets/Reusable/WebLink/WebLink';

export default class Home extends React.Component {

    static propTypes = {
        ADHAFhirIntro: PropTypes.string,
    }

    static defaultProps = {
        ADHAFhirIntro: require('../Images/VideoPlaceHolders/ADHA_Fhir_Intro.png')
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid stackable >
                <Grid.Row columns={1}>
                    <Grid.Column width={16} >
                        <Segment>
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
                <Grid.Row columns={1}>
                    <Grid.Column width={16} >
                        <Segment>
                        <Header as='h2' color='black'>
                                <Icon name='youtube' />
                                <Header.Content>
                                 Introduction to FHIR Presentation
                                </Header.Content>
                            </Header>                           
                            <p>
                                This video is a presentation I gave as part of my role at the Australian Digital Health Agency which was a brief introduction to FHRI for beginners
                                while also preparing the participants for an up and coming Australian FHIR connectathon. It contains very good content for people starting out with FHIR.
                            </p>
                            <Embed
                                id='QOhAn6KzlRU'
                                iframe={{
                                    allowFullScreen: true,
                                    style: {
                                        padding: 10,
                                    },
                                }}
                                placeholder={this.props.ADHAFhirIntro} source='youtube' />
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

