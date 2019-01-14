import React from 'react';

import { Grid, Form, Button, Icon } from 'semantic-ui-react'

import PropTypes from 'prop-types';
import UuidSupport from '../../../SupportTools/UuidSupport';
import SearchOrButton from './SearchOrButton';
import FhirConstant from '../../../Constants/FhirConstant';

export default class Token extends React.Component {

    static propTypes = {
        onTokenEdit: PropTypes.func.isRequired,
        onOrAddRemoveClick: PropTypes.func,
        id: PropTypes.string,
        system: PropTypes.string,
        code: PropTypes.string,
        modifier: PropTypes.string,
        isLast: PropTypes.bool,
        isFirstToken: PropTypes.bool
    }

    static defaultProps = {
        id: UuidSupport.createGUID(),
        system: '',
        code: '',
        modifier: 'none',
        isLast: false,
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

    getSubmitted = () => {
        return (
            {
                submittedId: this.props.id,
                submittedType: FhirConstant.searchType.token,
                submittedSystem: this.state.system,
                submittedCode: this.state.code,
                submittedModifier: this.state.modifier,
            }
        )
    }

    onTokenEdit = (e) => {
        e.preventDefault();

        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        const submitted = this.getSubmitted();
        if (name == 'system') {
            submitted.submittedSystem = value;
        } else if (name == 'code') {
            submitted.submittedCode = value;
        }
        this.props.onTokenEdit(submitted);
    }

    onModifierChange = (e, { value }) => {
        e.preventDefault();

        const submitted = this.getSubmitted();
        submitted.submittedModifier = value
        this.props.onTokenEdit(submitted);

        this.setState({
            modifier: value
        });
    }

    onOrAdd = () => {
        // e.preventDefault();

        this.props.onOrAddRemoveClick({
            eventId: this.props.id,
            eventIsAdd: true
        })
    }

    onOrRemove = () => {
        // e.preventDefault();

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
                        {renderSearchOrButton()}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

}
