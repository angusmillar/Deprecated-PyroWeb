import React from 'react';

import { Grid, Button, Segment, Label, Icon, Divider } from 'semantic-ui-react'

import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import Token from './Token';
import String from './String';
import Quantity from './Quantity';
import DateTime from './DateTime';
import Uri from './Uri';
import Number from './Number';
import Reference from './Reference';
import map from 'lodash/map';
import filter from 'lodash/filter';
import findIndex from 'lodash/findIndex';
import UuidSupport from '../../../SupportTools/UuidSupport';
import FhirConstant from '../../../Constants/FhirConstant';

export default class SearchTypeFrame extends React.Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        onAddOrRemoveButtonClick: PropTypes.func,
        onCheckClick: PropTypes.func,
        onEdit: PropTypes.func,
        onCancelClick: PropTypes.func,
        isEditMode: PropTypes.bool,
        modifier: PropTypes.string,
        elementList: PropTypes.array
    }

    static defaultProps = {
        elementList: null,
        searchTypeColor: 'black',
        modifier: 'none'
    }

    constructor(props) {
        super(props);

        let list = this.props.elementList;        
        const NewGuid = UuidSupport.createGUID();
        const typeColor = FhirConstant.getColorForSearchType(this.props.type);
        switch (this.props.type) {
            case FhirConstant.searchType.quantity:                
                if (isNil(this.props.elementList)) {
                    list = [{ id: NewGuid, prefix: '', number: '', code: '', system: '' }];
                }
                break;
            case FhirConstant.searchType.string:                
                if (isNil(this.props.elementList)) {
                    list = [{ id: NewGuid, string: '' }];
                }
                break;
            case FhirConstant.searchType.token:                
                if (isNil(this.props.elementList)) {
                    list = [{ id: NewGuid, code: '', system: '' }];
                }
                break;
            case FhirConstant.searchType.date:                
                if (isNil(this.props.elementList)) {
                    list = [{ id: NewGuid, prefix: 'none', dateString: '', timeString: '', zoneString: '' }];
                }
                break;
            case FhirConstant.searchType.uri:                
                if (isNil(this.props.elementList)) {
                    list = [{ id: NewGuid, uri: '' }];
                }
                break;
            case FhirConstant.searchType.number:                
                if (isNil(this.props.elementList)) {
                    list = [{ id: NewGuid, prefix: 'none', number: '' }];
                }
                break;
            case FhirConstant.searchType.reference:                
                if (isNil(this.props.elementList)) {
                    list = [{ id: NewGuid, prefix: 'none', resource: '', resourceId: '' }];
                }
                break;
            default:
        }

        this.state = {
            elementList: list,
            modifier: this.props.modifier,
            searchTypeColor: typeColor
        };

    }

    onOrButtonClick = (e) => {
        if (e.eventIsAdd) {

            const newArray = this.state.elementList.slice(0);
            switch (this.props.type) {
                case FhirConstant.searchType.quantity:
                    newArray.push({ id: UuidSupport.createGUID(), prefix: '', number: '', system: '', code: '' });
                    break;
                case FhirConstant.searchType.string:
                    newArray.push({ id: UuidSupport.createGUID(), string: '' });
                    break;
                case FhirConstant.searchType.token:
                    newArray.push({ id: UuidSupport.createGUID(), system: '', code: '' });
                    break;
                case FhirConstant.searchType.date:
                    newArray.push({ id: UuidSupport.createGUID(), prefix: 'none', dateString: '', timeString: '', zoneString: '' });
                    break;
                case FhirConstant.searchType.uri:
                    newArray.push({ id: UuidSupport.createGUID(), uri: '' });
                    break;
                case FhirConstant.searchType.number:
                    newArray.push({ id: UuidSupport.createGUID(), prefix: 'none', number: '' });
                    break;
                case FhirConstant.searchType.reference:
                    newArray.push({ id: UuidSupport.createGUID(), prefix: 'none', resource: '', resourceId: '' });
                    break;
                default:
            }

            this.setState({
                elementList: newArray,
            })

        } else {
            const newArray = filter(this.state.elementList, function (currentObject) {
                return currentObject.id != e.eventId;
            });

            //Tell the higer order component to rerender because we have removed an element, needed to  update the FHIR Query
            if (this.props.isEditMode) {
                this.props.onEdit({
                    eventId: this.props.id,
                    eventType: this.props.type,
                    eventName: this.props.name,
                    modifier: this.state.modifier,
                    eventValueList: newArray
                })
            }

            this.setState({ elementList: newArray })
        }
    }

    onAddClick = () => {
        this.props.onAddOrRemoveButtonClick({
            eventId: this.props.id,
            eventName: this.props.name,
            eventType: this.props.type,
            eventModifier: this.state.modifier,
            eventValueList: this.state.elementList
        })
    }

    onCancelClick = () => {
        this.props.onCancelClick({
            eventId: this.props.id,
        })
    }

    onCheckClick = () => {
        this.props.onCheckClick({
            eventId: this.props.id,
        })
    }

    onRemoveClick = (e) => {
        e.preventDefault();
        this.props.onAddOrRemoveButtonClick({
            eventId: this.props.id,
        })
    }

    onEdit = (e) => {
        let newArray = this.state.elementList.slice(0);
        const Index = findIndex(newArray, { id: e.submittedId })

        switch (this.props.type) {
            case FhirConstant.searchType.quantity:

                newArray.splice(Index, 1, {
                    id: e.submittedId,
                    prefix: e.submittedPrefix,
                    number: e.submittedNumber,
                    system: e.submittedSystem,
                    code: e.submittedCode,
                });

                if (e.submittedModifier == 'missing') {
                    newArray = [{ id: UuidSupport.createGUID(), prefix: '', number: '', system: '', code: '' }]
                }

                break;
            case FhirConstant.searchType.string:

                newArray.splice(Index, 1, {
                    id: e.submittedId,
                    string: e.submittedString
                });

                if (e.submittedModifier == 'missing') {
                    newArray = [{ id: UuidSupport.createGUID(), string: '' }]
                }

                break;
            case FhirConstant.searchType.token:

                newArray.splice(Index, 1, {
                    id: e.submittedId,
                    system: e.submittedSystem,
                    code: e.submittedCode,
                });

                if (e.submittedModifier == 'missing') {
                    newArray = [{ id: UuidSupport.createGUID(), system: '', code: '' }]
                }

                break;
            case FhirConstant.searchType.date:

                newArray.splice(Index, 1, {
                    id: e.submittedId,
                    dateString: e.submittedDate,
                    timeString: e.submittedTime,
                    zoneString: e.submittedZone,
                    prefix: e.submittedPrefix,
                });

                if (e.submittedModifier == 'missing') {
                    newArray = [{ id: UuidSupport.createGUID(), prefix: 'none', dateString: '', timeString: '', zoneString: '' }]
                }

                break;
            case FhirConstant.searchType.uri:

                newArray.splice(Index, 1, {
                    id: e.submittedId,
                    uri: e.submittedUri,
                });

                if (e.submittedModifier == 'missing') {
                    newArray = [{ id: UuidSupport.createGUID(), uri: '' }]
                }

                break;
            case FhirConstant.searchType.number:

                newArray.splice(Index, 1, {
                    id: e.submittedId,
                    prefix: e.submittedPrefix,
                    number: e.submittedNumber,
                });

                if (e.submittedModifier == 'missing') {
                    newArray = [{ id: UuidSupport.createGUID(), prefix: 'none', number: '' }]
                }
                break;
            case FhirConstant.searchType.reference:

                newArray.splice(Index, 1, {
                    id: e.submittedId,
                    resource: e.submittedResource,
                    resourceId: e.submittedResourceId,
                });

                if (e.submittedModifier == 'missing') {
                    newArray = [{ id: UuidSupport.createGUID(), prefix: 'none', resource: '', resourceId: '' }]
                }
                break;
            default:
        }

        if (this.props.isEditMode) {
            this.props.onEdit({
                eventId: this.props.id,
                eventType: this.props.type,
                eventName: this.props.name,
                eventModifier: e.submittedModifier,
                eventValueList: newArray
            })
        }

        this.setState({ elementList: newArray, modifier: e.submittedModifier })
    }



    render() {

        const renderLabelName = () => {
            return <Label color={this.state.searchTypeColor} attached='top left'>Parameter: {this.props.name}</Label>
        };

        const renderLabelType = () => {
            return <Label color={this.state.searchTypeColor} attached='top right'>Type: {this.props.type}</Label>
        };

        const renderButton = () => {
            if (this.props.isEditMode) {
                return (
                    <Grid>
                        <Grid.Row columns={16}>
                            <Button onClick={this.onCheckClick} size='small' icon color='green'><Icon name='check' /></Button>
                        </Grid.Row>
                    </Grid>
                )
            } else {
                return (
                    <Grid>
                        <Grid.Row columns={16}>
                            <Button onClick={this.onAddClick} size='small' icon color='green'><Icon name='add' /></Button>
                        </Grid.Row>
                        <Grid.Row columns={16}>
                            <Button onClick={this.onCancelClick} size='small' icon color='red'><Icon name='remove' /></Button>
                        </Grid.Row>
                    </Grid>
                )
            }
        };

        const renderItemType = (item, isFirst, addOrButton) => {

            switch (this.props.type) {
                case FhirConstant.searchType.quantity:
                    return (
                        <Quantity
                            isFirst={isFirst}
                            addOrButton={addOrButton}
                            onOrAddRemoveClick={this.onOrButtonClick}
                            id={item.id}
                            modifier={this.state.modifier}
                            prefix={item.prefix}
                            number={item.number}
                            code={item.code}
                            system={item.system}
                            onEdit={this.onEdit}
                        />
                    )
                case FhirConstant.searchType.string:
                    return (
                        <String
                            isFirstString={isFirst}
                            addOrButton={addOrButton}
                            onOrAddRemoveClick={this.onOrButtonClick}
                            id={item.id}
                            string={item.string}
                            modifier={this.state.modifier}
                            onStringEdit={this.onEdit}
                        />
                    )
                case FhirConstant.searchType.token:
                    return (
                        <Token
                            isFirstToken={isFirst}
                            addOrButton={addOrButton}
                            onOrAddRemoveClick={this.onOrButtonClick}
                            id={item.id}
                            modifier={this.state.modifier}
                            code={item.code}
                            system={item.system}
                            onTokenEdit={this.onEdit}
                        />
                    )
                case FhirConstant.searchType.date:
                    return (
                        <DateTime
                            isFirst={isFirst}
                            addOrButton={addOrButton}
                            onOrAddRemoveClick={this.onOrButtonClick}
                            id={item.id}
                            modifier={this.state.modifier}
                            prefix={item.prefix}
                            dateString={item.dateString}
                            timeString={item.timeString}
                            zoneString={item.zoneString}
                            onEdit={this.onEdit}
                        />
                    )
                case FhirConstant.searchType.uri:
                    return (
                        <Uri
                            isFirst={isFirst}
                            addOrButton={addOrButton}
                            onOrAddRemoveClick={this.onOrButtonClick}
                            id={item.id}
                            modifier={this.state.modifier}
                            uri={item.uri}
                            onEdit={this.onEdit}
                        />
                    )
                case FhirConstant.searchType.number:
                    return (
                        <Number
                            isFirst={isFirst}
                            addOrButton={addOrButton}
                            onOrAddRemoveClick={this.onOrButtonClick}
                            id={item.id}
                            modifier={this.state.modifier}
                            prefix={item.prefix}
                            number={item.number}
                            onEdit={this.onEdit}
                        />
                    )
                case FhirConstant.searchType.reference:
                    return (
                        <Reference
                            isFirst={isFirst}
                            addOrButton={addOrButton}
                            onOrAddRemoveClick={this.onOrButtonClick}
                            id={item.id}
                            modifier={this.state.modifier}
                            prefix={item.prefix}
                            resource={item.resource}
                            resourceId={item.resourceId}
                            onEdit={this.onEdit}
                        />
                    )
                default:
            }
        }

        const renderItem = () => {
            return (
                <Grid>
                    {map(this.state.elementList, (item, Index) => {
                        if (this.state.elementList.length == 1) {
                            return (
                                <Grid.Row key={item.id} columns={1}>
                                    <Grid.Column width={16} >
                                        {renderItemType(item, true, true)}
                                    </Grid.Column>
                                </Grid.Row>
                            )
                        } else if (Index == this.state.elementList.length - 1) {
                            return (
                                <React.Fragment key={item.id}>
                                    <Grid.Row verticalAlign='middle'>
                                        <Grid.Column width={16} >
                                            <Divider fitted horizontal>OR</Divider>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={1}>
                                        <Grid.Column width={16} >
                                            {renderItemType(item, false, true)}
                                        </Grid.Column>
                                    </Grid.Row>
                                </React.Fragment>
                            )
                        } else if (Index == 0) {
                            return (
                                <React.Fragment key={item.id}>
                                    <Grid.Row columns={1}>
                                        <Grid.Column width={16} >
                                            {renderItemType(item, true, false)}
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
                                            {renderItemType(item, false, false)}
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
            <Segment color={this.state.searchTypeColor} secondary={this.props.isEditMode}>
                {renderLabelName()}
                {renderLabelType()}
                <Grid>
                    <Grid.Row columns={16}>
                        <Grid.Column width={15} >
                            <Divider horizontal hidden></Divider>
                            <Segment>
                                {renderItem()}
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
