import React from 'react';

import { Form } from 'semantic-ui-react'

import PropTypes from 'prop-types';

export default class ReferenceRelative extends React.Component {

    static propTypes = {
        isDisable: PropTypes.bool,
        selectedResource: PropTypes.string,
        resourceOptions: PropTypes.array.isRequired,
        resourceId: PropTypes.string,
        onSelectedResourceChange: PropTypes.func.isRequired,
        onResourceIdChange: PropTypes.func.isRequired,
    }

    static defaultProps = {
        isDisable: false,
        selectedResource: '',
        resourceId: '',
    }

    constructor(props) {
        super(props);

    }

    onSelectedResourceChange = (e, { value }) => {
        e.preventDefault();
        this.props.onSelectedResourceChange(value);
    }

    onResourceIdChange = (e) => {
        e.preventDefault();
        this.props.onResourceIdChange(e.target.value);
    }


    render() {

        return (

            <Form>
                <Form.Group widths='equal'>
                    <Form.Select
                        disabled={this.props.isDisable}
                        label='Resource Type'
                        width={3}
                        fluid
                        value={this.props.selectedResource}
                        options={this.props.resourceOptions}
                        placeholder='Resource'
                        search
                        closeOnChange
                        onChange={this.onSelectedResourceChange}
                    />
                    <Form.Field                        
                        disabled={this.props.isDisable}
                        label='Resource Id'
                        width={4}
                        name='resourceId'
                        control='input'                        
                        placeholder='12345'
                        value={this.props.resourceId}
                        onChange={this.onResourceIdChange}
                    />
                </Form.Group>
            </Form>
        )
    }

}
