import React from 'react';

import { Form } from 'semantic-ui-react'

import PropTypes from 'prop-types';

export default class Token extends React.Component {

    static propTypes = {
        onTokenEdit: PropTypes.func.isRequired,        
        id: PropTypes.string.isRequired,
        system: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,    
        isDisabled: PropTypes.bool
    }

    static defaultProps = {             
        isDisabled: false
    }

    constructor(props) {
        super(props);       
    }

    getSubmitted = () => {
        return (
            {
                submittedId: this.props.id,               
                submittedSystem: this.props.system,
                submittedCode: this.props.code,              
            }
        )
    }

    onSystemEdit = (e) => {
        e.preventDefault();
        const submitted = this.getSubmitted();      
        submitted.submittedSystem = e.target.value;       
        this.props.onTokenEdit(submitted);
    }

    onCodeEdit = (e) => {
        e.preventDefault();
        const submitted = this.getSubmitted();      
        submitted.submittedCode = e.target.value;       
        this.props.onTokenEdit(submitted);
    }

    render() {
        return (
            <Form>
                <Form.Group widths='equal'>                                                                
                    <Form.Field label='System' width={5} name='system' control='input'
                        disabled={this.props.isDisabled}
                        placeholder='System'
                        value={this.props.system}
                        onChange={this.onSystemEdit} />
                    <Form.Field label='Code' width={5} name='code' control='input'
                        disabled={this.props.isDisabled}
                        placeholder='Code'
                        value={this.props.code}
                        onChange={this.onCodeEdit} />
                </Form.Group>
            </Form>
        )
    }

}
