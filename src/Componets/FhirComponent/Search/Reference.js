import React from 'react';

import { Grid, Form, Button, Icon } from 'semantic-ui-react'

import PropTypes from 'prop-types';
import UuidSupport from '../../../SupportTools/UuidSupport';

export default class Reference extends React.Component {

    static propTypes = {
        onEdit: PropTypes.func.isRequired,
        onOrAddRemoveClick: PropTypes.func,
        id: PropTypes.string,
        resource: PropTypes.string,
        resourceId: PropTypes.string,        
        modifier: PropTypes.string,
        addOrButton: PropTypes.bool,
        isFirst: PropTypes.bool
    }

    static defaultProps = {
        id: UuidSupport.createGUID(),
        resource: '',
        resourceId: '',        
        modifier: 'none',
        addOrButton: false,
        isFirst: false
    }

    constructor(props) {
        super(props);

        this.state = {
            resource: this.props.resource,
            resourceId: this.props.resourceId,
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

        let ResourceIdEvent = this.state.resourceId;
        if (name == 'resourceId') {
            ResourceIdEvent = value;
        }

        this.props.onEdit({
            submittedId: this.props.id,
            submittedResourceId: ResourceIdEvent,
            submittedModifier: this.state.modifier,
        });

    }

    onModifierChange = (e, { value }) => {
        e.preventDefault();

        this.props.onEdit({
            submittedId: this.props.id,
            submittedResource: this.state.resource,
            submittedResourceId: this.state.resourceId,
            submittedModifier: value,
        });

        if (value == 'missing') {
            this.setState({
                modifier: value,
                resource: '',
                resourceId: ''
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

        const { resource, resourceId } = this.state
        return (
            <Grid>
                {renderModifierSelector()}
                <Grid.Row columns={3}>
                    <Grid.Column width={14} >
                        <Form>
                            <Form.Group widths='equal'>
                            <Form.Field label='Resource Type' width={10} name='resource' control='input' disabled={disableDueToMissing()} placeholder='Resource' value={resource} onChange={this.onEdit} />
                                <Form.Field label='Resource Id' width={10} name='resourceId' control='input' disabled={disableDueToMissing()} placeholder='12345' value={resourceId} onChange={this.onEdit} />

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
