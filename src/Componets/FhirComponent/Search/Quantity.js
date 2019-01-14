import React from 'react';

import { Grid, Form, Button, Icon } from 'semantic-ui-react'

import PropTypes from 'prop-types';
import UuidSupport from '../../../SupportTools/UuidSupport';
import SearchOrButton from './SearchOrButton';
import FhirConstant from '../../../Constants/FhirConstant';

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
        isLast: PropTypes.bool,
        isFirst: PropTypes.bool
    }

    static defaultProps = {
        id: UuidSupport.createGUID(),
        prefix: '',
        number: '',
        system: '',
        code: '',
        modifier: 'none',
        isLast: false,
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

    getSubmitted = () => {
        return (
            {
                submittedId: this.props.id,
                submittedType: FhirConstant.searchType.quantity,
                submittedPrefix: this.state.prefix,
                submittedNumber: this.state.number,
                submittedSystem: this.state.system,
                submittedCode: this.state.code,
                submittedModifier: this.state.modifier,
            }
        )
    }

    onEdit = (e) => {
        e.preventDefault();

        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        const submitted = this.getSubmitted();
        if (name == 'prefix') {
            submitted.submittedPrefix = value;
        } else if (name == 'number') {
            submitted.submittedNumber = value;
        } else if (name == 'system') {
            submitted.submittedSystem = value;
        } else if (name == 'code') {
            submitted.submittedCode = value;
        }

        this.props.onEdit(submitted);
    }

    onModifierChange = (e, { value }) => {
        e.preventDefault();

        const submitted = this.getSubmitted();
        submitted.submittedModifier = value;
        this.props.onEdit(submitted);

        this.setState({
            modifier: value
        });
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
                        {renderSearchOrButton()}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

}
