import React from 'react';

import { Grid, Form, Button, Icon } from 'semantic-ui-react'

import PropTypes from 'prop-types';
import UuidSupport from '../../../SupportTools/UuidSupport';

export default class Quantity extends React.Component {

    static propTypes = {
        onEdit: PropTypes.func.isRequired,
        onOrAddRemoveClick: PropTypes.func,
        id: PropTypes.string,
        prefix: PropTypes.string,
        number: PropTypes.string,
        system: PropTypes.string,
        code: PropTypes.string,
        modifier: PropTypes.string,
        addOrButton: PropTypes.bool,
        isFirst: PropTypes.bool
    }

    static defaultProps = {
        id: UuidSupport.createGUID(),
        prefix: '',
        number: '',
        system: '',
        code: '',
        modifier: 'none',
        addOrButton: false,
        isFirst: false
    }

    constructor(props) {
        super(props);

        this.state = {
            prefix: this.props.prefix,
            number: this.props.number,
            system: this.props.system,
            code: this.props.code,
            modifier: this.props.modifier
        };
    }

    onEdit = (e) => {
        e.preventDefault();

        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        let PrefixEvent = this.state.prefix;
        let NumberEvent = this.state.number;
        let SystemEvent = this.state.system;
        let CodeEvent = this.state.code;
        if (name == 'prefix') {
            PrefixEvent = value;
        } else if (name == 'number') {
            NumberEvent = value;
        } else if (name == 'system') {
            SystemEvent = value;
        } else if (name == 'code') {
            CodeEvent = value;
        }

        this.props.onEdit({
            submittedId: this.props.id,
            submittedPrefix: PrefixEvent,
            submittedNumber: NumberEvent,
            submittedSystem: SystemEvent,
            submittedCode: CodeEvent,
            submittedModifier: this.state.modifier,
        });

    }

    onModifierChange = (e, { value }) => {
        e.preventDefault();

        this.props.onEdit({
            submittedId: this.props.id,
            submittedPrefix: this.state.prefix,
            submittedNumber: this.state.number,
            submittedSystem: this.state.system,
            submittedCode: this.state.code,
            submittedModifier: value,
        });

        this.setState({
            modifier: value
        });
    }

    onPrefixChange = (e, { value }) => {
        e.preventDefault();

        this.props.onEdit({
            submittedId: this.props.id,
            submittedPrefix: value,
            submittedNumber: this.state.number,
            submittedSystem: this.state.system,
            submittedCode: this.state.code,
            submittedModifier: this.state.modifier,
        });

        this.setState({
            prefix: value
        });
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
                return <Button key='1' disabled={disableCodeAndSystem()} onClick={this.onOrAddButtonClick} size='mini' icon color='green' type='submit'><Icon name='add' />{' '}OR</Button>
            } else {
                return <Button key='2' onClick={this.onOrRemoveButtonClick} size='mini' icon color='red' type='submit'><Icon name='remove' />{' '}OR</Button>
            }
        }


        const modifierOptions = () => {
            return (
                [
                    { key: 'none', text: 'None', value: 'none' },
                    { key: 'missing', text: 'Missing', value: 'missing' },
                ]
            )
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

        const disableCodeAndSystem = () => {
            if (this.state.modifier != 'none') {
                return true;
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

        const { prefix, number, system, code, modifier } = this.state

        return (
            <Grid>
                {renderModifierSelector()}
                <Grid.Row columns={3}>
                    <Grid.Column width={13} >
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Select width={1} compact label='Prefix' value={prefix} options={prefixOptions()} placeholder='Prefix' onChange={this.onPrefixChange} />
                                {/* <Form.Field label='Prefix' width={3} name='prefix' control='input' disabled={disableCodeAndSystem()} placeholder='Prefix' value={prefix} onChange={this.onEdit} /> */}
                                <Form.Field label='Number' width={3} name='number' control='input' disabled={disableCodeAndSystem()} placeholder='Number' value={number} onChange={this.onEdit} />
                                <Form.Field label='System' width={5} name='system' control='input' disabled={disableCodeAndSystem()} placeholder='System' value={system} onChange={this.onEdit} />
                                <Form.Field label='Code' width={2} name='code' control='input' disabled={disableCodeAndSystem()} placeholder='Code' value={code} onChange={this.onEdit} />
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
