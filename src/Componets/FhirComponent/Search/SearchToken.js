import React from 'react';

import { Grid, Form, Button, Segment, Label, Icon } from 'semantic-ui-react'

import PropTypes from 'prop-types';

export default class SearchToken extends React.Component {

    static propTypes = {
        onSubmit: PropTypes.func,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        readOnly: PropTypes.bool,
        system: PropTypes.string,
        code: PropTypes.string,
    }

    static defaultProps = {
        readOnly: false,
        system: '',
        code: ''
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

    }

    handleSubmit = (e) => {
        e.preventDefault();
        //const { system, code } = this.state

        this.props.onSubmit({
            submittedName: this.props.name,
            submittedSystem: this.state.system,
            submittedCode: this.state.code,
            submittedId: this.props.id
        });
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
            if (!this.props.readOnly) {
                return <Button size='big' icon color='green' type='submit'><Icon name='add' /></Button>
            } else {
                return <Button size='big' icon color='red' type='submit'><Icon name='remove circle' /></Button>
            }

        };

        const renderInputs = () => {
            return (
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Field label='System' disabled={this.props.readOnly} width={5} name='system' control='input' placeholder='System' value={system} onChange={this.handleFormChange} />
                        <Form.Field label='Code' disabled={this.props.readOnly} width={5} name='code' control='input' placeholder='Code' value={code} onChange={this.handleFormChange} />
                        {renderButton()}
                    </Form.Group>
                </Form>
            )
        };


        return (
            <Segment padded='very' color='teal' raised={this.props.readOnly}>
                {renderLabelName()}
                {renderLabelType()}
                <Grid>
                    <Grid.Row columns={16}>
                        <Grid.Column width={1} verticalAlign='middle'>
                          
                        </Grid.Column>
                        <Grid.Column width={14} verticalAlign='middle' >
                            {renderInputs()}
                        </Grid.Column>
                        <Grid.Column width={1} verticalAlign='middle'>
                          
                        </Grid.Column>
                        
                    </Grid.Row>
                </Grid>

            </Segment>
        )


    }


}
