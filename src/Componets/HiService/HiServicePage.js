import React from 'react';
import AppActions from 'Actions/AppActions';
import AppStoreHiService from 'Store/AppStoreHiService';
import AjaxConstant from 'Constants/AjaxConstant';
import HiRequestForm from './HiRequestForm';
import moment from 'moment';
import SearchResultSegment from './SearchResultSegment';
import HiServiceParameterResourceFactory from './HiServiceParameterResourceFactory';
import PropTypes from 'prop-types';
import { Header, Grid, Card, Loader, Dimmer, Message, Divider, List } from 'semantic-ui-react'

function getItemsState2() {
    return {
        HiServiceState: AppStoreHiService.getState()
    };
}

export default class HiServicePage extends React.Component {

    static propTypes = {
        wireframeParagraphImage: PropTypes.string,
    };

    static defaultProps = {
        wireframeParagraphImage: require('../../Images/wireframe/paragraph.png'),
    }

    constructor(props) {
        super(props);
        this.initialise();
        const LastSearchData = { famly: '', given: '', dob: '', gender: '', medicare: '', dva: '', ihi: '' };
        this.state = { store: getItemsState2(), SearchData: LastSearchData };
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        AppStoreHiService.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        AppStoreHiService.removeChangeListener(this._onChange);
    }

    initialise() {
        AppActions.initialiseHiServiceStore();
    }

    _onChange() {
        this.setState(() => ({ store: getItemsState2() }));
    }

    totalCount(Resource) {
        if (typeof (Resource) != 'undefined' && Resource != null) {
            return Resource.total
        }
    }



    onSubmit = (Submitted) => {
        const LastSearchData = {
            family: Submitted.submittedFamily,
            given: Submitted.submittedGiven,
            dob: Submitted.submittedDob,
            gender: Submitted.submittedGender,
            medicare: Submitted.submittedMedicare,
            dva: Submitted.submittedDva,
            ihi: Submitted.submittedIhi
        };
        this.setState({ SearchData: LastSearchData });

        const ParametersResource = HiServiceParameterResourceFactory.resource(
            Submitted.submittedFamily,
            Submitted.submittedGiven,
            Submitted.submittedGender,
            moment(Submitted.submittedDob).format('YYYY-MM-DD'),
            Submitted.submittedIhi,
            Submitted.submittedMedicare,
            Submitted.submittedDva,
            'PyroWebUser');

        AppActions.searchHiService(JSON.stringify(ParametersResource));
    };


    renderBody() {
        if (this.state.store.HiServiceState.AjaxCallState === AjaxConstant.CallState.Call_None) {
            // return null;
            return (
                <Message info>
                    <Message.Header>A few test patients</Message.Header>
                    <List>
                        <List.Item>
                            <List.Icon name='male' />
                            <List.Content>
                                <List.Header>HORNER, Ion</List.Header>
                                <List.Description>Male, Dob: 20/01/1988, <br />Medicare: 5950 47260 1 1</List.Description>
                                <Divider/>
                            </List.Content>
                        </List.Item>                        
                        <List.Item>
                            <List.Icon name='female' />
                            <List.Content>
                                <List.Header size='mini'>HAMPTON, Jade</List.Header>
                                <List.Description>Female, Dob: 27/10/1972<br />DVA: TX123458</List.Description>
                                <Divider/>
                            </List.Content>
                        </List.Item>                        
                        <List.Item>
                            <List.Icon name='female' />
                            <List.Content>
                                <List.Header>COX, Janet</List.Header>
                                <List.Description>Female, Dob: 27/03/1986<br/>IHI: 8003 6085 0013 7633</List.Description>
                            </List.Content>
                        </List.Item>                        

                    </List>
                    
                </Message>
                        )
                    }
        else if (this.state.store.HiServiceState.AjaxCallState === AjaxConstant.CallState.Call_Pending) {
            return (
                <div>
                            <Header size='small'>Health Identifier Service</Header>
                            <Grid centered>
                                <Grid.Row>

                                    <Divider hidden />
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={8} >
                                        <Divider hidden />
                                        <Dimmer active inverted>
                                            <Loader size='large'>Searching Hi Service</Loader>
                                        </Dimmer>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </div>
                        )
                    }
        else if (this.state.store.HiServiceState.AjaxCallState === AjaxConstant.CallState.Call_Complete) {
            if (this.state.store.HiServiceState.AjaxOutcome.CallCompletedState == AjaxConstant.CallCompletedState.Completed_Ok) {
                const FhirResource = this.state.store.HiServiceState.AjaxOutcome.FhirResource;
                // const {SearchData} = this.state;
                        return (
                    <div>
                            {/* <Header size='small'>Health Identifier Service</Header> */}
                            <Grid centered>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Divider hidden />
                                        <Card.Group>
                                            <SearchResultSegment parameterResource={FhirResource} />
                                        </Card.Group>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </div>
                        )
                    }
            else if (this.state.store.HiServiceState.AjaxOutcome.CallCompletedState == AjaxConstant.CallCompletedState.Completed_ResponseNotOk) {
                const FhirResource = this.state.store.HiServiceState.AjaxOutcome.FhirResource;
                        const Issue = FhirResource.issue[0];
                        const Details = Issue.details;
                        return (
                    <Message negative>
                            <Message.Header>Please review search item</Message.Header>
                            <p>{Details.text}</p>
                        </Message>
                        )
                    }
            else if (this.state.store.HiServiceState.AjaxOutcome.CallCompletedState == AjaxConstant.CallCompletedState.Completed_NoResponse) {
                return (
                    <Message negative>
                            <Message.Header>Not response from server</Message.Header>
                            <p>{this.state.store.HiServiceState.AjaxOutcome.ErrorMessage}</p>
                        </Message>
                        )
                    }
            else if (this.state.store.HiServiceState.AjaxOutcome.CallCompletedState == AjaxConstant.CallCompletedState.Completed_CallSetupFailed) {
                return (
                    <Message negative>
                            <Message.Header>Web application API error</Message.Header>
                            <p>{this.state.store.HiServiceState.AjaxOutcome.ErrorMessage}</p>
                        </Message>
                        )
                    }
            else {
                return (
                    <Message negative>
                            <Message.Header>Web application error</Message.Header>
                            <p>Unfortunatly their seem to be a fatal erorr with the website API call.</p>
                        </Message>
                        )
                    }
                }
            }
        
    render() {
        const form = () => {
            return (
                <HiRequestForm onSubmit={this.onSubmit} />
                        )
                    }
            
                    return (
            <div>
                            <Message info>
                                <Message.Header>Test Enviroment Service</Message.Header>
                                <p>This service is backed onto the HI Service test enviroment, only test patients found in this enviroment are avaliable.</p>
                            </Message>
                            <Grid columns={16} divided>
                                <Grid.Row>
                                    <Grid.Column width={8} >
                                        <Header size='small'>Individual Healthcare Identifier (IHI) search</Header>
                                        {form()}
                                    </Grid.Column>
                                    <Grid.Column width={8} >
                                        {this.renderBody()}
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </div>
                        )
                    }
                
                }
                
