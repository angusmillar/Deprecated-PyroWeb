import React from 'react';

import { Grid, Form, Button, Icon } from 'semantic-ui-react'

import PropTypes from 'prop-types';
import UuidSupport from '../../../SupportTools/UuidSupport';

export default class String extends React.Component {

    static propTypes = {
        onStringEdit: PropTypes.func.isRequired,
        onOrAddRemoveClick: PropTypes.func,
        id: PropTypes.string,
        string: PropTypes.string,
        modifier: PropTypes.string,
        addOrButton: PropTypes.bool,
        isFirstString: PropTypes.bool
    }

    static defaultProps = {
        id: UuidSupport.createGUID(),
        string: '',
        modifier: 'none',
        addOrButton: false,
        isFirstString: false
    }

    constructor(props) {
        super(props);

        this.state = {
            string: this.props.string,
            modifier: this.props.modifier
        };
    }

    onStringEdit = (e) => {
        e.preventDefault();

        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        let StringEvent = this.state.string;
        if (name == 'string') {
            StringEvent = value;
        }

        this.props.onStringEdit({
            submittedId: this.props.id,
            submittedString: StringEvent,
            submittedModifier: this.state.modifier,
        });

    }

    onModifierChange = (e, { value }) => {
        e.preventDefault();

        this.props.onStringEdit({
            submittedId: this.props.id,
            submittedString: this.state.string,
            submittedModifier: value,
        });

        if (value == 'missing') {
            this.setState({
                modifier: value,
                string: ''
            });
        } else {
            this.setState({
                modifier: value
            });
        }
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
            if (this.props.addOrButton && !this.props.isFirstString) {
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

        const modifierOptions = () => {
            if (this.props.isFirstString) {
                return (
                    [
                        { key: 'none', text: 'None', value: 'none' },
                        { key: 'missing', text: 'Missing', value: 'missing' },
                        { key: 'contains', text: 'Contains', value: 'contains' },
                        { key: 'exact', text: 'Exact', value: 'exact' },
                    ]
                )
            } else {
                return (
                    [
                        { key: 'none', text: 'None', value: 'none' },
                        { key: 'contains', text: 'Contains', value: 'contains' },
                        { key: 'exact', text: 'Exact', value: 'exact' },
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
            if (this.props.isFirstString) {
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

        const { string, modifier } = this.state
        return (
            <Grid>
                {renderModifierSelector()}
                <Grid.Row columns={3}>
                    <Grid.Column width={14} >
                        <Form>
                            <Form.Group widths='equal'>
                                {/* <Form.Select width={2} compact label='Modifier' value={modifier} options={modifierOptions()} placeholder='Modifier' onChange={this.onModifierChange} /> */}
                                <Form.Field label='String' width={10} name='string' control='input' disabled={disableDueToMissing()} placeholder='value' value={string} onChange={this.onStringEdit} />
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
