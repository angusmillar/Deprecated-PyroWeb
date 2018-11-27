import React from 'react';

import { Grid, Button, Segment, Label, Icon, Divider } from 'semantic-ui-react'

import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import String from './String';
import map from 'lodash/map';
import filter from 'lodash/filter';
import findIndex from 'lodash/findIndex';
import UuidSupport from '../../../SupportTools/UuidSupport';
import FhirConstant from '../../../Constants/FhirConstant';

export default class StringSearch extends React.Component {

    static propTypes = {
        onAddOrRemoveButtonClick: PropTypes.func,
        onStringEdit: PropTypes.func,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        isEditMode: PropTypes.bool,
        type: PropTypes.string,
        modifier: PropTypes.string,
        stringElementList: PropTypes.array,
        searchTypeColor: PropTypes.string
    }

    static defaultProps = {
        readOnly: false,
        modifier: 'none',
        type: FhirConstant.searchType.string,
        stringElementList: null,
        searchTypeColor: 'blue'
    }

    constructor(props) {
        super(props);

        let Stringlist = this.props.stringElementList;
        if (isNil(this.props.stringElementList)) {
            const NewGuid = UuidSupport.createGUID();
            Stringlist = [{ id: NewGuid, string: '' }];
        }

        this.state = {
            stringElementList: Stringlist,
            modifier: this.props.modifier
        };

    }

    onOrButtonClick = (e) => {
        // e.preventDefault();

        if (e.eventIsAdd) {

            const stringParameter = {
                id: UuidSupport.createGUID(),
                string: '',                
            };

            const newArray = this.state.stringElementList.slice(0);
            newArray.push(stringParameter);
            this.setState({ stringElementList: newArray })

        } else {
            const newArray = filter(this.state.stringElementList, function (currentObject) {
                return currentObject.id != e.eventId;
            });

            //Tell the higer order component to rerender because we have removed an element, needed to  update the FHIR Query
            if (this.props.isEditMode) {
                this.props.onStringEdit({
                    eventId: this.props.id,
                    eventType: this.props.type,
                    eventName: this.props.name,
                    eventModifier: this.state.modifier,
                    eventValueList: newArray
                })
            }

            this.setState({ stringElementList: newArray })
        }
    }

    onAddClick = () => {
        //  e.preventDefault();

        this.props.onAddOrRemoveButtonClick({
            eventId: this.props.id,
            eventName: this.props.name,
            eventType: this.props.type,
            eventModifier: this.state.modifier,
            eventValueList: this.state.stringElementList
        })
    }

    onRemoveClick = (e) => {
        e.preventDefault();

        this.props.onAddOrRemoveButtonClick({
            eventId: this.props.id,
        })
    }


    onStringEdit = (e) => {
        
        const stringParameter = {
            id: e.submittedId,
            string: e.submittedString
        };

        let newArray = this.state.stringElementList.slice(0);
        const Index = findIndex(newArray, { id: stringParameter.id })
        newArray.splice(Index, 1, stringParameter);

        //if the modifier is of type 'missing' then there can be no Values
        if (e.submittedModifier == 'missing') {
            newArray = [{ id: UuidSupport.createGUID(), string: '' }]
        }        

        if (this.props.isEditMode) {
            this.props.onStringEdit({
                eventId: this.props.id,
                eventType: this.props.type,
                eventName: this.props.name,
                eventModifier: e.submittedModifier,
                eventValueList: newArray
            })
        }

        this.setState({ stringElementList: newArray, modifier: e.submittedModifier })
    }



    render() {

        const renderLabelName = () => {
            return <Label color={this.props.searchTypeColor} attached='top left'>Parameter: {this.props.name}</Label>
        };

        const renderLabelType = () => {
            return <Label color={this.props.searchTypeColor} attached='top right'>Type: {this.props.type}</Label>
        };

        const renderButton = () => {
            if (this.props.isEditMode) {
                return <Button onClick={this.onRemoveClick} floated='right' size='big' icon color='red'><Icon name='remove circle' /></Button>
            } else {
                return <Button onClick={this.onAddClick} floated='right' size='big' icon color='green'><Icon name='add' /></Button>
            }
        };

        const renderString = () => {
            return (
                <Grid>
                    {map(this.state.stringElementList, (item, Index) => {
                        if (this.state.stringElementList.length == 1) {
                            return (
                                <Grid.Row key={item.id} columns={1}>
                                    <Grid.Column width={16} >                                     
                                        <String isFirstString={true} addOrButton={true} onOrAddRemoveClick={this.onOrButtonClick} id={item.id} string={item.string} modifier={this.state.modifier} onStringEdit={this.onStringEdit} />
                                    </Grid.Column>
                                </Grid.Row>
                            )
                        } else if (Index == this.state.stringElementList.length - 1) {
                            return (
                                <React.Fragment key={item.id}>

                                    <Grid.Row verticalAlign='middle'>
                                        <Grid.Column width={16} >
                                            <Divider fitted horizontal>OR</Divider>
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row columns={1}>
                                        <Grid.Column width={16} >
                                            <String isFirstString={false} addOrButton={true} onOrAddRemoveClick={this.onOrButtonClick} id={item.id} string={item.string} modifier={this.state.modifier} onStringEdit={this.onStringEdit} />
                                        </Grid.Column>
                                    </Grid.Row>

                                </React.Fragment>
                            )
                        } else if (Index == 0) {
                            return (
                                <React.Fragment key={item.id}>
                                    <Grid.Row columns={1}>
                                        <Grid.Column width={16} >                                           
                                            <String isFirstString={true} addOrButton={false} onOrAddRemoveClick={this.onOrButtonClick} id={item.id} string={item.string} modifier={this.state.modifier} onStringEdit={this.onStringEdit} />
                                        </Grid.Column>
                                    </Grid.Row>
                                </React.Fragment>
                            )
                        } else {
                            return (
                                <React.Fragment key={item.id}>

                                    <Grid.Row verticalAlign='middle'>
                                        <Grid.Column width={16} >
                                            <Divider fitted horizontal>OR</Divider>
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row columns={1}>
                                        <Grid.Column width={16} >
                                            <String isFirstString={false} addOrButton={false} onOrAddRemoveClick={this.onOrButtonClick} id={item.id} string={item.string} modifier={this.state.modifier} onStringEdit={this.onStringEdit} />
                                        </Grid.Column>
                                    </Grid.Row>
                                </React.Fragment>
                            )
                        }
                    })}
                </Grid>
            )
        };


        return (
            <Segment color={this.props.searchTypeColor}>
                {renderLabelName()}
                {renderLabelType()}
                <Grid>
                    <Grid.Row columns={16}>
                        <Grid.Column width={15} >
                        <Divider horizontal hidden></Divider>
                            <Segment>                            
                                {renderString()}
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={1} verticalAlign='top' >
                            <Divider horizontal hidden></Divider>
                            {renderButton()}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        )


    }


}
