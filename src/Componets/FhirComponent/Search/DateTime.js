import React from 'react';

import { Grid, Form, Button, Icon } from 'semantic-ui-react'

import PropTypes from 'prop-types';
import UuidSupport from '../../../SupportTools/UuidSupport';

import isNil from 'lodash/isNil';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import SearchOrButton from './SearchOrButton';
import FhirConstant from '../../../Constants/FhirConstant';
import '../../../CustomCss/react-datepicker.css';


export default class DateTime extends React.Component {

    static propTypes = {
        onEdit: PropTypes.func.isRequired,
        onOrAddRemoveClick: PropTypes.func,
        id: PropTypes.string,
        prefix: PropTypes.string,
        dateString: PropTypes.string,
        timeString: PropTypes.string,
        zoneString: PropTypes.string,
        modifier: PropTypes.string,
        isLast: PropTypes.bool,
        isFirst: PropTypes.bool,
        timeFormatMask: PropTypes.string,
        dateFormatMask: PropTypes.string,
    }

    static defaultProps = {
        id: UuidSupport.createGUID(),
        prefix: '',
        dateString: '',
        timeString: '',
        zoneString: '',
        modifier: 'none',
        isLast: false,
        isFirst: false,
        timeFormatMask: 'h:mm a',
        dateFormatMask: 'YYYY-MM-DD'
    }

    constructor(props) {
        super(props);

        let momemntDate = null;
        if (this.props.dateString != '' && moment(this.props.dateString, moment.ISO_8601).isValid()) {
            momemntDate = moment(this.props.dateString, moment.ISO_8601);
        } else {
            momemntDate = null;
        }

        let momemntTime = null;
        if (this.props.timeString != '' && moment(this.props.timeString, this.props.timeFormatMask).isValid()) {
            momemntTime = moment(this.props.timeString, this.props.timeFormatMask);
        } else {
            momemntTime = null;
        }

        let momemntZone = null;
        if (this.props.zoneString == '') {
            //default to users timezone
            momemntZone = this.zoneNow()
        } else {
            momemntZone = this.props.zoneString;
        }

        this.state = {
            prefix: this.props.prefix,
            dateType: momemntDate,
            timeType: momemntTime,
            modifier: this.props.modifier,
            zoneType: momemntZone
        };
    }

    getSubmitted = () => {
        return (
            {
                submittedId: this.props.id,
                submittedType: FhirConstant.searchType.date,
                submittedPrefix: this.state.prefix,
                submittedDate: this.stringFormatDate(this.state.dateType),
                submittedTime: this.stringFormatTime(this.state.timeType),
                submittedZone: this.state.zoneType,
                submittedModifier: this.state.modifier
            }
        )
    }

    onPrefixChange = (e, { value }) => {
        e.preventDefault();

        const submitted = this.getSubmitted();
        submitted.submittedPrefix = value;
        this.props.onEdit(submitted);

        this.setState({
            prefix: value
        });
    }

    onModifierChange = (e, { value }) => {
        e.preventDefault();

        const submitted = this.getSubmitted();
        submitted.submittedModifier = value;
        this.props.onEdit(submitted);

        if (value == 'missing') {
            this.setState({
                modifier: value,
                prefix: 'none',
                dateType: null,
                zoneType: ''
            });
        } else {
            this.setState({
                modifier: value
            });
        }
    }

    stringFormatDate = (date) => {
        if (!isNil(date)) {
            return date.format('YYYY-MM-DD')
        } else {
            return '';
        }
    }

    stringFormatTime = (time) => {
        if (!isNil(time)) {
            return time.format('HH:mm')
        } else {
            return '';
        }
    }


    zoneNow = () => {
        const zoneHours = moment().utcOffset() / 60;
        if (zoneHours > 9) {
            return `+${zoneHours}:00`
        } else if (zoneHours < 9 && zoneHours > 0) {
            return `+0${zoneHours}:00`
        } else if (zoneHours < 1 && zoneHours < -9) {
            return `-0${zoneHours}:00`
        } else if (zoneHours < -9) {
            return `-${zoneHours}:00`
        }
    }

    onDateEdit = (date) => {

        this.setState({
            dateType: date
        });

        const submitted = this.getSubmitted();
        submitted.submittedDate = this.stringFormatDate(date);
        this.props.onEdit(submitted);
    }

    onTimeEdit = (time) => {

        this.setState({
            timeType: time
        });

        const submitted = this.getSubmitted();
        submitted.submittedTime = this.stringFormatTime(time);
        this.props.onEdit(submitted);
    }

    onZoneChange = (e, { value }) => {
        e.preventDefault();

        this.setState({
            zoneType: value
        });

        const submitted = this.getSubmitted();
        submitted.submittedZone = value;
        this.props.onEdit(submitted);
    }

    onDateTimeNow = (e) => {
        e.preventDefault();

        const now = moment();

        this.setState({
            prefix: this.props.prefix,
            submittedType: FhirConstant.searchType.date,
            dateType: now.clone(),
            timeType: now.clone(),
            modifier: this.props.modifier,
            zoneType: this.zoneNow()
        });

        const submitted = this.getSubmitted();
        submitted.submittedDate = this.stringFormatDate(now);
        submitted.submittedTime = this.stringFormatTime(now);
        submitted.submittedZone = this.zoneNow();
        this.props.onEdit(submitted);
    }

    onOrAdd = () => {     
        this.props.onOrAddRemoveClick({
            eventId: this.props.id,
            eventIsAdd: true
        })
    }

    onOrRemove = () => {
        this.props.onOrAddRemoveClick({
            eventId: this.props.id,
            eventIsAdd: false
        })
    }


    render() {

        const renderSearchOrButton = () => {
            if (this.props.isLast) {
                return (
                    <SearchOrButton
                        isDisable={false}
                        id={this.state.id}
                        onOrAdd={this.onOrAdd}
                        onOrRemove={this.onOrRemove}
                    />
                )
            } else {
                return (
                    <SearchOrButton
                        isDisable={false}
                        id={this.state.id}
                        //onOrAdd={this.onOrAdd}
                        onOrRemove={this.onOrRemove}
                    />
                )
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

        const zoneOptions = () => {
            return (
                [
                    { key: 'none', text: 'None', value: 'none' },
                    { key: -1, text: '-01:00', value: '-01:00' },
                    { key: -2, text: '-02:00', value: '-02:00' },
                    { key: -3, text: '-03:00', value: '-03:00' },
                    { key: -4, text: '-04:00', value: '-04:00' },
                    { key: -5, text: '-05:00', value: '-05:00' },
                    { key: -6, text: '-06:00', value: '-06:00' },
                    { key: -7, text: '-07:00', value: '-07:00' },
                    { key: -8, text: '-08:00', value: '-08:00' },
                    { key: -9, text: '-09:00', value: '-09:00' },
                    { key: -10, text: '-10:00', value: '-10:00' },
                    { key: -11, text: '-11:00', value: '-11:00' },
                    { key: -12, text: '-12:00', value: '-12:00' },
                    { key: 0, text: '+00:00', value: '+00:00' },
                    { key: 1, text: '+01:00', value: '+01:00' },
                    { key: 2, text: '+02:00', value: '+02:00' },
                    { key: 3, text: '+03:00', value: '+03:00' },
                    { key: 4, text: '+04:00', value: '+04:00' },
                    { key: 5, text: '+05:00', value: '+05:00' },
                    { key: 6, text: '+06:00', value: '+06:00' },
                    { key: 7, text: '+07:00', value: '+07:00' },
                    { key: 8, text: '+08:00', value: '+08:00' },
                    { key: 9, text: '+09:00', value: '+09:00' },
                    { key: 10, text: '+10:00', value: '+10:00' },
                    { key: 11, text: '+11:00', value: '+11:00' },
                    { key: 12, text: '+12:00', value: '+12:00' },
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

        const isDisableOnModifierMissing = () => {
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

        const dateLabel = () => {
            if (isDisableOnModifierMissing()) {
                return <label>{' '}</label>
            } else {
                return <label>Date</label>
            }
        }

        const timeLabel = () => {
            if (isDisableOnModifierMissing()) {
                return <label>{' '}</label>
            } else {
                return <label>Time</label>
            }
        }
        const { modifier, prefix, dateType, timeType, zoneType } = this.state
        return (
            <Grid>
                {renderModifierSelector()}
                <Grid.Row columns={3}>
                    <Grid.Column width={12} >
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Select width={2} compact
                                    label='Prefix'
                                    value={prefix}
                                    options={prefixOptions()}
                                    placeholder='Prefix'
                                    onChange={this.onPrefixChange}
                                    disabled={isDisableOnModifierMissing()}
                                />
                                <Form.Field width={3} required>
                                    {dateLabel()}
                                    <DatePicker
                                        selected={dateType}
                                        onChange={this.onDateEdit}
                                        onClickOutside={this.onSelect}
                                        disabled={isDisableOnModifierMissing()}
                                        showYearDropdown
                                        dropdownMode='select'
                                        placeholderText='YYYY-MM-DD'
                                        dateFormat='YYYY-MM-DD'
                                        isClearable={true} />
                                </Form.Field>
                                <Form.Field width={3}>
                                    {timeLabel()}
                                    <DatePicker
                                        selected={timeType}
                                        onChange={this.onTimeEdit}
                                        onClickOutside={this.onSelect}
                                        disabled={isDisableOnModifierMissing()}
                                        dropdownMode='select'
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeFormat={this.props.timeFormatMask}
                                        timeIntervals={15}
                                        timeCaption='Time'
                                        placeholderText='hh:mm am/pm'
                                        dateFormat={this.props.timeFormatMask}
                                        isClearable={true} />
                                </Form.Field>

                                <Form.Select width={3}
                                    compact
                                    label='OffSet'
                                    value={zoneType}
                                    options={zoneOptions()}
                                    placeholder='Modifier'
                                    onChange={this.onZoneChange}
                                    disabled={isDisableOnModifierMissing()}
                                />
                            </Form.Group>
                        </Form>
                    </Grid.Column>
                    <Grid.Column width={1} floated='left' verticalAlign='middle'>
                        <Button key='3' onClick={this.onDateTimeNow} size='mini' icon color='grey' type='submit'><Icon name='clock' />{' '}Now</Button>
                    </Grid.Column>
                    <Grid.Column width={1} floated='left' verticalAlign='middle' >
                        {renderSearchOrButton()}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

}
