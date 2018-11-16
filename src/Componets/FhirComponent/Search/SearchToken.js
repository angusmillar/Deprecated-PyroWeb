import React from 'react';

import { Grid, Form, Button, Segment, Label, Icon, Divider } from 'semantic-ui-react'

import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';

export default class SearchToken extends React.Component {

    static propTypes = {
        onSubmit: PropTypes.func,
        onTokenEdit: PropTypes.func,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        isEditMode: PropTypes.bool,
        system: PropTypes.string,
        code: PropTypes.string,
        type: PropTypes.string,
    }

    static defaultProps = {
        readOnly: false,
        system: '',
        code: '',
        type: 'token'
    }

    constructor(props) {
        super(props);

        this.state = {
            system: this.props.system,
            code: this.props.code
        };
    }


    handleFormChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        if (!isNil(this.props.onTokenEdit)) {
            let SystemEvent = this.state.system;
            let CodeEvent = this.state.code;
            if (name == 'system') {
                SystemEvent = value;
            } else if (name == 'code') {
                CodeEvent = value;
            }
            this.props.onTokenEdit({
                submittedName: this.props.name,
                submittedSystem: SystemEvent,
                submittedCode: CodeEvent,
                submittedId: this.props.id,
                submittedType: this.props.type
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //const { system, code } = this.state

        this.props.onSubmit({
            submittedName: this.props.name,
            submittedSystem: this.state.system,
            submittedCode: this.state.code,
            submittedId: this.props.id,
            submittedType: this.props.type,
        });
    }

    onOrButtonClick = (e) => {
        e.preventDefault();
        //const { system, code } = this.state

        
    }


    render() {

        const { system, code } = this.state

        const renderLabelName = () => {
            return <Label color='teal' attached='top left'>{this.props.name}</Label>
        };

        const renderLabelType = () => {
            return <Label color='teal' attached='top right'>Token</Label>
        };

        const renderButton = () => {
            if (this.props.isEditMode) {
                return <Button size='big' icon color='red' type='submit'><Icon name='remove circle' /></Button>
            } else {
                return <Button size='big' icon color='green' type='submit'><Icon name='add' /></Button>
            }

        };

        const renderInputs = () => {
            return (
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Field label='System' width={5} name='system' control='input' placeholder='System' value={system} onChange={this.handleFormChange} />
                        <Form.Field label='Code' width={5} name='code' control='input' placeholder='Code' value={code} onChange={this.handleFormChange} />
                        <Button size='mini' icon color='black'  onClick={this.onOrButtonClick}>OR</Button>
                        {renderButton()}
                    </Form.Group>
                </Form>
            )
        };


        return (
            <Segment color='teal'>
                {renderLabelName()}
                {renderLabelType()}
                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column width={16} verticalAlign='middle' >
                            <Divider horizontal hidden></Divider>
                            {renderInputs()}
                        </Grid.Column>
                    </Grid.Row>
                    <Divider horizontal>OR</Divider>
                    <Grid.Row columns={1}>
                        <Grid.Column width={15} verticalAlign='middle' >
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group widths='equal'>
                                    <Form.Field label='System' width={5} name='system' control='input' placeholder='System' value={system} onChange={this.handleFormChange} />
                                    <Form.Field label='Code' width={5} name='code' control='input' placeholder='Code' value={code} onChange={this.handleFormChange} />
                                </Form.Group>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        )


    }


}
