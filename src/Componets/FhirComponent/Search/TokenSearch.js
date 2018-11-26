import React from 'react';

import { Grid, Button, Segment, Label, Icon, Divider } from 'semantic-ui-react'

import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import Token from './Token';
import map from 'lodash/map';
import filter from 'lodash/filter';
import findIndex from 'lodash/findIndex';
import UuidSupport from '../../../SupportTools/UuidSupport';
import FhirConstant from '../../../Constants/FhirConstant';
//import { isNullOrUndefined } from 'util';

export default class TokenSearch extends React.Component {

    static propTypes = {
        onAddOrRemoveButtonClick: PropTypes.func,
        onTokenEdit: PropTypes.func,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        isEditMode: PropTypes.bool,
        type: PropTypes.string,
        tokenElementList: PropTypes.array,
    }

    static defaultProps = {
        readOnly: false,
        system: '',
        code: '',
        type: FhirConstant.searchType.token,        
        tokenElementList: null
    }

    constructor(props) {
        super(props);

        let Tokenlist = this.props.tokenElementList;
        if (isNil(this.props.tokenElementList))
        {
            const NewGuid = UuidSupport.createGUID();
            Tokenlist = [{ id: NewGuid, code: '', system: '' }];
        }
        
        this.state = {
            tokenElementList: Tokenlist,
        };

    }

    onOrButtonClick = (e) => {
        // e.preventDefault();

        if (e.eventIsAdd) {

            const tokenParameter = {
                id: UuidSupport.createGUID(),
                system: '',
                code: ''
            };

            const newArray = this.state.tokenElementList.slice(0);
            newArray.push(tokenParameter);
            this.setState({ tokenElementList: newArray })

        } else {
            const newArray = filter(this.state.tokenElementList, function (currentObject) {
                return currentObject.id != e.eventId;
            });

            //Tell the higer order component to rerender because we have removed an element, needed to  update the FHIR Query
            if (this.props.isEditMode) {
                this.props.onTokenEdit({
                    eventId: this.props.id,
                    eventType: this.props.type,
                    eventName: this.props.name,
                    eventValueList: newArray
                })    
            }

            this.setState({ tokenElementList: newArray })
        }
    }

    onAddClick = () => {
        //  e.preventDefault();

        this.props.onAddOrRemoveButtonClick({
            eventId: this.props.id,
            eventName: this.props.name,
            eventType: this.props.type,            
            eventValueList: this.state.tokenElementList
        })        
    }

    onRemoveClick = (e) => {
        e.preventDefault();

        this.props.onAddOrRemoveButtonClick({
            eventId: this.props.id,            
        })        
    }


    onTokenEdit = (e) => {        
        
        const tokenParameter = {
            id: e.submittedId,
            system: e.submittedSystem,
            code: e.submittedCode
        };

        const newArray = this.state.tokenElementList.slice(0);
        const Index = findIndex(newArray, { id: tokenParameter.id })
        newArray.splice(Index, 1, tokenParameter);
        
        if (this.props.isEditMode) {
            this.props.onTokenEdit({
                eventId: this.props.id,
                eventType: this.props.type,
                eventName: this.props.name,
                eventValueList: newArray
            })    
        }
                

        this.setState({ tokenElementList: newArray })
    }



    render() {

        const renderLabelName = () => {
            return <Label color='teal' attached='top left'>{this.props.name}</Label>
        };

        const renderLabelType = () => {
            return <Label color='teal' attached='top right'>Token</Label>
        };

        const renderButton = () => {
            if (this.props.isEditMode) {
                return <Button onClick={this.onRemoveClick} floated='right' size='big' icon color='red'><Icon name='remove circle' /></Button>
            } else {
                return <Button onClick={this.onAddClick} floated='right' size='big' icon color='green'><Icon name='add' /></Button>
            }
        };

        const renderToken = () => {
            return (
                <Grid>
                    {map(this.state.tokenElementList, (item, Index) => {
                        if (this.state.tokenElementList.length == 1) {
                            return (
                                <Grid.Row key={item.id} columns={1}>
                                    <Grid.Column width={16} >
                                        <Divider horizontal hidden></Divider>
                                        <Token isFirstToken={true} addOrButton={true} onOrAddRemoveClick={this.onOrButtonClick} id={item.id} code={item.code} system={item.system} onTokenEdit={this.onTokenEdit} />
                                    </Grid.Column>
                                </Grid.Row>
                            )
                        } else if (Index == this.state.tokenElementList.length - 1) {
                            return (
                                <React.Fragment key={item.id}>

                                    <Grid.Row verticalAlign='middle'>
                                        <Grid.Column width={16} >
                                            <Divider fitted horizontal>OR</Divider>
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row columns={1}>
                                        <Grid.Column width={16} >
                                            <Token addOrButton={true} onOrAddRemoveClick={this.onOrButtonClick} id={item.id} code={item.code} system={item.system} onTokenEdit={this.onTokenEdit} />
                                        </Grid.Column>
                                    </Grid.Row>

                                </React.Fragment>
                            )
                        } else if (Index == 0) {
                            return (
                                <React.Fragment key={item.id}>
                                    <Grid.Row columns={1}>
                                        <Grid.Column width={16} >
                                            <Divider horizontal hidden></Divider>
                                            <Token addOrButton={false} onOrAddRemoveClick={this.onOrButtonClick} id={item.id} code={item.code} system={item.system} onTokenEdit={this.onTokenEdit} />
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
                                            <Token addOrButton={false} onOrAddRemoveClick={this.onOrButtonClick} id={item.id} code={item.code} system={item.system} onTokenEdit={this.onTokenEdit} />
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
            <Segment color='teal'>
                {renderLabelName()}
                {renderLabelType()}
                <Grid>
                    <Grid.Row columns={16}>
                        <Grid.Column width={15} >
                            {renderToken()}
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
