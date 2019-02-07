import React from 'react';

import { Form } from 'semantic-ui-react'

import PropTypes from 'prop-types';

export default class ReferenceAbsolute extends React.Component {

    static propTypes = {
        onEdit: PropTypes.func.isRequired,        
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,        
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
                submittedUrl: this.props.url,                              
            }
        )
    }

    onUrlEdit = (e) => {
        e.preventDefault();
        const Url = e.target.value;
        const submitted = this.getSubmitted();      
        submitted.selectedResource = Url;       
        this.props.onEdit(submitted);        
    }

    render() {
        return (
            <Form>
                <Form.Group widths='equal'>    
                    <Form.Field                        
                        disabled={this.props.isDisabled}
                        label='URL'
                        width={4}
                        name='Url'
                        control='input'                        
                        placeholder='https:// | http://'
                        value={this.props.url}
                        onChange={this.onUrlEdit}
                    />
                </Form.Group>
            </Form>
        )
    }

}
