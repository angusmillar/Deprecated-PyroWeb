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
        addOrButton: PropTypes.bool,
        isFirstToken: PropTypes.bool
    }

    static defaultProps = {
        id: UuidSupport.createGUID(),
        system: '',
        code: '',
        addOrButton: false,
        isFirstToken: false
    }

    constructor(props) {
        super(props);

        this.state = {
            system: this.props.system,
            code: this.props.code
        };
    }

    handleFormChange = (e) => {
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
                return <Button key='1' onClick={this.onOrAddButtonClick} size='mini' icon color='green' type='submit'><Icon name='add' />{' '}OR</Button>                                                            
            } else {
                return <Button key='2' onClick={this.onOrRemoveButtonClick} size='mini' icon color='red' type='submit'><Icon name='remove' />{' '}OR</Button>
            }
        }

        const { system, code } = this.state
        return (
            <Grid>
                <Grid.Row columns={3}>
                    <Grid.Column width={14} >
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Field label='System' width={5} name='system' control='input' placeholder='System' value={system} onChange={this.handleFormChange} />
                                <Form.Field label='Code' width={5} name='code' control='input' placeholder='Code' value={code} onChange={this.handleFormChange} />
                            </Form.Group>
                        </Form>
                    </Grid.Column>
                    <Grid.Column width={1} verticalAlign='middle' >
                        {renderOrButton()}              
                    </Grid.Column>
                    <Grid.Column width={1} verticalAlign='middle' >
                        {renderRemoveOrButton()}                       
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

}
