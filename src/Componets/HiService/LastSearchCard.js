import React, { Component } from 'react'
import { Card, Header, Grid, Divider } from 'semantic-ui-react'
import toUpper from 'lodash/toUpper'
//import DatePicker from 'react-datepicker';
//import moment from 'moment';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';

//reactdatepicker

export default class LastSearchCard extends Component {

    static propTypes = {
        isResult: PropTypes.bool.isRequired,
        family: PropTypes.string.isRequired,
        given: PropTypes.string,
        dob: PropTypes.object.isRequired,
        gender: PropTypes.string.isRequired,
        medicare: PropTypes.string,
        dva: PropTypes.string,
        ihi: PropTypes.string,
    };

    static defaultProps = {
        loading: false
    }

    constructor(props) {
        super(props);
    }


    render() {
        const cardType = () => {
            if (this.props.isResult) {
                return (

                    <Card.Content extra>
                        <Header as='h4' icon='cloud download' content='Found' />
                    </Card.Content>

                )
            } else {
                return (

                    <Card.Content extra>
                        <Header as='h4' icon='search' content='Search' />
                    </Card.Content>

                )
            }

        }

        // const options = [
        //     { key: 'm', text: 'Male', value: 'male' },
        //     { key: 'f', text: 'Female', value: 'female' },
        //     { key: 'o', text: 'Other', value: 'other' },
        //     { key: 'u', text: 'Unknown', value: 'unknown' },
        // ]

        return (

            <Card>
                <Card.Content>
                    {/* <Icon name='female' floated='right' size='huge'/> */}
                    {/* <Image floated='right' size='mini' src='/assets/images/avatar/large/steve.jpg' /> */}
                    <Card.Header size='large'>
                        {`${toUpper(this.props.family)}, ${this.props.given}`}
                    </Card.Header>
                    <Card.Meta>

                        <Divider />
                        <Grid columns={2}>
                            <Grid.Row verticalAlign='top' >
                                <Grid.Column width={6} floated='left'>
                                    <div>
                                        <Header sub>Dob</Header>
                                        <span>{this.props.dob.format('DD/MM/YYYY')}</span>
                                    </div>
                                </Grid.Column>
                                <Grid.Column width={6} floated='right'>
                                    <div>
                                        <Header sub>Gender</Header>
                                        <span>{this.props.gender}</span>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                    </Card.Meta>
                    <Card.Description>
                        <div>
                            <Header sub>Medicare</Header>
                            <span>{this.props.medicare}</span>
                        </div>
                    </Card.Description>
                </Card.Content>
                {cardType()}
            </Card>

        )
    }
}

