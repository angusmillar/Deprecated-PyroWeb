import React from 'react';

import { Form } from 'semantic-ui-react'

import PropTypes from 'prop-types';

export default class ReferenceRelative extends React.Component {

    static propTypes = {
        onEdit: PropTypes.func.isRequired,        
        id: PropTypes.string.isRequired,        
        selectedResource: PropTypes.string,
        resourceOptions: PropTypes.array.isRequired,
        resourceId: PropTypes.string.isRequired,        
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
                submittedSelectedResource: this.props.selectedResource,
                submittedResourceId: this.props.resourceId,              
            }
        )
    }

    onResourceEdit = (e, { value }) => {
        e.preventDefault();
        const submitted = this.getSubmitted();      
        submitted.selectedResource = value;       
        this.props.onEdit(submitted);
    }

    onResourceIdEdit = (e) => {
        e.preventDefault();
        const ResourceId = e.target.value;
        const submitted = this.getSubmitted();      
        submitted.submittedResourceId = ResourceId;       
        this.props.onEdit(submitted);
    }

    render() {
        return (
            <Form>
                <Form.Group widths='equal'>
                    <Form.Select
                        disabled={this.props.isDisabled}
                        label='Resource Type'
                        width={3}
                        fluid
                        value={this.props.selectedResource}
                        options={this.props.resourceOptions}
                        placeholder='Resource'
                        search
                        closeOnChange
                        onChange={this.onResourceEdit}
                    />
                    <Form.Field                        
                        disabled={this.props.isDisabled}
                        label='Resource Id'
                        width={4}
                        name='resourceId'
                        control='input'                        
                        placeholder='123456'
                        value={this.props.resourceId}
                        onChange={this.onResourceIdEdit}
                    />
                </Form.Group>
            </Form>
        )
    }

}
