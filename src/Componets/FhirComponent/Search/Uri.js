import React from 'react';

import { Grid, Form, Button, Icon } from 'semantic-ui-react'

import PropTypes from 'prop-types';
import UuidSupport from '../../../SupportTools/UuidSupport';

export default class Uri extends React.Component {

    static propTypes = {
        onEdit: PropTypes.func.isRequired,
        onOrAddRemoveClick: PropTypes.func,
        id: PropTypes.string,
        uri: PropTypes.string,
        modifier: PropTypes.string,
        addOrButton: PropTypes.bool,
        isFirst: PropTypes.bool
    }

    static defaultProps = {
        id: UuidSupport.createGUID(),
        uri: '',
        modifier: 'none',
        addOrButton: false,
        isFirst: false
    }

    constructor(props) {
        super(props);

        this.state = {
            uri: this.props.uri,
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

        let UriEvent = this.state.uri;
        if (name == 'uri') {
            UriEvent = value;
        }

        this.props.onEdit({
            submittedId: this.props.id,
            submittedUri: UriEvent,
            submittedModifier: this.state.modifier,
        });

    }

    onModifierChange = (e, { value }) => {
        e.preventDefault();

        this.props.onEdit({
            submittedId: this.props.id,
            submittedUri: this.state.uri,
            submittedModifier: value,
        });

        if (value == 'missing') {
            this.setState({
                modifier: value,
                uri: ''
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

        const modifierOptions = () => {
            if (this.props.isFirst) {
                return (
                    [
                        { key: 'none', text: 'None', value: 'none' },
                        { key: 'missing', text: 'Missing', value: 'missing' },
                        { key: 'contains', text: 'Contains', value: 'contains' },
                        { key: 'exact', text: 'Exact', value: 'exact' },
                        { key: 'above', text: 'Above', value: 'above' },
                        { key: 'below', text: 'Below', value: 'below' },
                    ]
                )
            } else {
                return (
                    [
                        { key: 'none', text: 'None', value: 'none' },                       
                        { key: 'contains', text: 'Contains', value: 'contains' },
                        { key: 'exact', text: 'Exact', value: 'exact' },
                        { key: 'above', text: 'Above', value: 'above' },
                        { key: 'below', text: 'Below', value: 'below' },
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
                                    <Form.Select width={3} compact label='Modifier' value={this.state.modifier} options={modifierOptions()} placeholder='Modifier' onChange={this.onModifierChange} />
                                </Form.Group>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                )
            } else {
                return null;
            }
        }

        const { uri } = this.state
        return (
            <Grid>
                {renderModifierSelector()}
                <Grid.Row columns={3}>
                    <Grid.Column width={14} >
                        <Form>
                            <Form.Group widths='equal'>
                                {/* <Form.Select width={2} compact label='Modifier' value={modifier} options={modifierOptions()} placeholder='Modifier' onChange={this.onModifierChange} /> */}
                                <Form.Field label='Uri' width={10} name='uri' control='input' disabled={disableDueToMissing()} placeholder='https://' value={uri} onChange={this.onEdit} />
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
