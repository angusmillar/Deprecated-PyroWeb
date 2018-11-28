import React from 'react';

import { Grid, Form, Button, Icon } from 'semantic-ui-react'

import PropTypes from 'prop-types';
import UuidSupport from '../../../SupportTools/UuidSupport';

export default class Token extends React.Component {

    static propTypes = {
        onTokenEdit: PropTypes.func.isRequired,
        onOrAddRemoveClick: PropTypes.func,
        id: PropTypes.string,
        system: PropTypes.string,
        code: PropTypes.string,
        modifier: PropTypes.string,
        addOrButton: PropTypes.bool,
        isFirstToken: PropTypes.bool
    }

    static defaultProps = {
        id: UuidSupport.createGUID(),
        system: '',
        code: '',
        modifier: 'none',
        addOrButton: false,
        isFirstToken: false
    }

    constructor(props) {
        super(props);

        this.state = {
            system: this.props.system,
            code: this.props.code,
            modifier: this.props.modifier
        };
    }

    onTokenEdit = (e) => {
        e.preventDefault();

        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        let SystemEvent = this.state.system;
        let CodeEvent = this.state.code;
        if (name == 'system') {
            SystemEvent = value;
        } else if (name == 'code') {
            CodeEvent = value;
        }
        this.props.onTokenEdit({
            submittedId: this.props.id,
            submittedSystem: SystemEvent,
            submittedCode: CodeEvent,
            submittedModifier: this.state.modifier,
        });

    }

    onModifierChange = (e, { value }) => {
        e.preventDefault();

        this.props.onTokenEdit({
            submittedId: this.props.id,
            submittedSystem: this.state.system,
            submittedCode: this.state.code,
            submittedModifier: value,
        });

        this.setState({
            modifier: value
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
            if (this.props.addOrButton && !this.props.isFirstToken) {
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

        const { system, code, modifier } = this.state
        const modifierOptions = () => {
            return (
                [
                    { key: 'none', text: 'None', value: 'none' },
                    { key: 'missing', text: 'Missing', value: 'missing' },
                ]
            )
        }

       
        const disableCodeAndSystem = () => {
            if (this.state.modifier != 'none') {
                return true;
            }
        }

        const renderModifierSelector = () => {
            if (this.props.isFirstToken) {
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

        return (
            <Grid>
                {renderModifierSelector()}
                <Grid.Row columns={3}>
                    <Grid.Column width={13} >
                        <Form>
                            <Form.Group widths='equal'>
                                {/* <Form.Select width={2} compact label='Modifier' value={modifier} disabled={disableModifier()} options={modifierOptions} placeholder='Modifier' onChange={this.onModifierChange} /> */}
                                <Form.Field label='System' width={5} name='system' control='input' disabled={disableCodeAndSystem()} placeholder='System' value={system} onChange={this.onTokenEdit} />
                                <Form.Field label='Code' width={5} name='code' control='input' disabled={disableCodeAndSystem()} placeholder='Code' value={code} onChange={this.onTokenEdit} />
                            </Form.Group>
                        </Form>
                    </Grid.Column>
                    <Grid.Column width={1} floated='left' verticalAlign='middle' >
                        <Button.Group size='mini' >
                            {renderOrButton()}
                            {renderRemoveOrButton()}
                        </Button.Group>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

}