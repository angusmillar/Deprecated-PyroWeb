import React from 'react';

import { Grid, Form, Button, Icon } from 'semantic-ui-react'

import PropTypes from 'prop-types';
import UuidSupport from '../../../SupportTools/UuidSupport';

import isNil from 'lodash/isNil';
import DatePicker from 'react-datepicker';
import moment from 'moment';
//import 'react-datepicker/dist/react-datepicker.css';
import '../../../CustomCss/react-datepicker.css';


export default class DateTime extends React.Component {

    static propTypes = {
        onEdit: PropTypes.func.isRequired,
        onOrAddRemoveClick: PropTypes.func,
        id: PropTypes.string,
        prefix: PropTypes.string,
        dateTimeString: PropTypes.string,
        modifier: PropTypes.string,
        addOrButton: PropTypes.bool,
        isFirst: PropTypes.bool
    }

    static defaultProps = {
        id: UuidSupport.createGUID(),
        prefix: '',
        dateTimeString: moment().toString(),
        modifier: 'none',
        addOrButton: false,
        isFirst: false
    }

    constructor(props) {
        super(props);

        let momemntDateTime = null;
        if (this.props.dateTimeString != '' && moment(this.props.dateTimeString, moment.ISO_8601).isValid()) {
            momemntDateTime = moment(this.props.dateTimeString, moment.ISO_8601);
        } 
         
        this.state = {
            prefix: this.props.prefix,
            dateTimeType: momemntDateTime,
            modifier: this.props.modifier
        };
    }

    // onEdit = (e) => {
    //     e.preventDefault();

    //     const target = e.target;
    //     const value = target.value;
    //     const name = target.name;

    //     this.setState({
    //         [name]: value
    //     });

    //     let dateTimeEvent = this.state.dateTimeType;
    //     let prefixEvent = this.state.prefix;
    //     if (name == 'dateTime') {
    //         dateTimeEvent = value;
    //     } else if (name == 'prefix') {
    //         prefixEvent = value;
    //     }

    //     this.props.onEdit({
    //         submittedId: this.props.id,
    //         submittedPrefix: prefixEvent,
    //         submittedDateTime: dateTimeEvent,
    //         submittedModifier: this.state.modifier,
    //     });
    //}

    onPrefixChange = (e, { value }) => {
        e.preventDefault();

        const dateTimeString = this.stringFormatDate(this.state.dateTimeType);

        this.props.onEdit({
            submittedId: this.props.id,
            submittedPrefix: value,
            submittedDateTime: dateTimeString,
            submittedModifier: this.state.modifier,
        });

        this.setState({
            prefix: value
        });
    }

    onModifierChange = (e, { value }) => {
        e.preventDefault();

        const dateTimeString = this.stringFormatDate(this.state.dateTimeType)

        this.props.onEdit({
            submittedId: this.props.id,
            submittedPrefix: this.state.prefix,
            submittedDateTime: dateTimeString,
            submittedModifier: value,
        });

        if (value == 'missing') {
            this.setState({
                modifier: value,
                prefix: '',
                dateTimeType: null
            });
        } else {
            this.setState({
                modifier: value
            });
        }
    }

    stringFormatDate = (date) => {
        if (!isNil(date)) {
            return date.format('YYYY-MM-DDTHH:MM')
        } else {
            return '';
        }        
    }

    onDateEdit = (date) => {

        let dateTimeString = '';
        if (date != null) {
            dateTimeString = this.stringFormatDate(date)
        }        

        this.setState({
            dateTimeType: date
        });

        this.props.onEdit({
            submittedId: this.props.id,
            submittedPrefix: this.state.prefix,
            submittedDateTime: dateTimeString,
            submittedModifier: this.state.modifier,
        });
    }

    onSelect = (e) => {
        const xxx = e;   
    }

    onOrAddButtonClick = (e) => {
        e.preventDefault();

        this.props.onOrAddRemoveClick({
            eventId: this.props.id,
            eventIsAdd: true
        })
    }

    onOrRemoveButtonClick = (e) => {
        e.preventDefault();

        this.props.onOrAddRemoveClick({
            eventId: this.props.id,
            eventIsAdd: false
        })
    }

    render() {

        const renderRemoveOrButton = () => {
            if (this.props.addOrButton && !this.props.isFirst) {
                return <Button key='3' onClick={this.onOrRemoveButtonClick} size='mini' icon color='red' type='submit'><Icon name='remove' />{' '}OR</Button>
            }
        }

        const renderOrButton = () => {
            if (this.props.addOrButton) {
                return <Button key='1' disabled={disableDueToMissing()} onClick={this.onOrAddButtonClick} size='mini' icon color='green' type='submit'><Icon name='add' />{' '}OR</Button>
            } else {
                return <Button key='2' onClick={this.onOrRemoveButtonClick} size='mini' icon color='red' type='submit'><Icon name='remove' />{' '}OR</Button>
            }
        }

        const prefixOptions = () => {
            return (
                [
                    { key: 'none', text: 'None', value: 'none' },
                    { key: 'ne', text: '!=', value: 'ne' },
                    { key: 'eq', text: '=', value: 'eq' },
                    { key: 'gt', text: '>', value: 'gt' },
                    { key: 'ge', text: '>=', value: 'ge' },
                    { key: 'lt', text: '<', value: 'lt' },
                    { key: 'le', text: '<=', value: 'le' },
                ]
            )
        }


        const modifierOptions = () => {
            if (this.props.isFirst) {
                return (
                    [
                        { key: 'none', text: 'None', value: 'none' },
                        { key: 'missing', text: 'Missing', value: 'missing' },
                    ]
                )
            } else {
                return (
                    [
                        { key: 'none', text: 'None', value: 'none' },
                    ]
                )
            }
        }


        const disableDueToMissing = () => {
            if (this.state.modifier == 'missing') {
                return true;
            } else {
                return false;
            }
        }

        const renderModifierSelector = () => {
            if (this.props.isFirst) {
                return (
                    <Grid.Row columns={3}>
                        <Grid.Column width={3} >
                            <Form>
                                <Form.Group widths='equal'>
                                    <Form.Select width={3} compact label='Modifier' value={modifier} options={modifierOptions()} placeholder='Modifier' onChange={this.onModifierChange} />
                                </Form.Group>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                )
            } else {
                return null;
            }
        }

        const { prefix, dateTimeType, modifier } = this.state
        return (
            <Grid>
                {renderModifierSelector()}
                <Grid.Row columns={2}>
                    <Grid.Column width={14} >
                        <Form>
                            <Form.Group >
                                <Form.Select width={2} compact label='Prefix' value={prefix} options={prefixOptions()} placeholder='Prefix' onChange={this.onPrefixChange} />
                                <Form.Field width={5} required>
                                    <label>Date or DateTime</label>
                                    <DatePicker
                                        selected={dateTimeType}
                                        onChange={this.onDateEdit}
                                        onSelect={this.onSelect}
                                        disabled={false}
                                        showYearDropdown
                                        dropdownMode='select'
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        timeCaption='Time'
                                        // placeholderText='DD/MM/YYYY'
                                        // dateFormat="DD/MM/YYYY"
                                        // dateFormat='MMMM d, yyyy h:mm aa'
                                        dateFormat='YYYY-MM-DDTHH:mm'
                                        isClearable={true} />
                                </Form.Field>

                                {/* <Form.Select width={2} compact label='Modifier' value={modifier} options={modifierOptions()} placeholder='Modifier' onChange={this.onModifierChange} /> */}
                                {/* <Form.Field label='DateTime' width={10} name='dateTime' control='input' disabled={disableDueToMissing()} placeholder='value' value={dateTime} onChange={this.onEdit} /> */}
                            </Form.Group>
                        </Form>
                    </Grid.Column>
                    <Grid.Column width={1} floated='left' verticalAlign='middle' >
                        <Button.Group size='mini' >
                            {renderRemoveOrButton()}
                            {renderOrButton()}
                        </Button.Group>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

}
