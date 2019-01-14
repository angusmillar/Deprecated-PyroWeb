import React from 'react';

import { Form } from 'semantic-ui-react'

import PropTypes from 'prop-types';

export default class ReferenceChained extends React.Component {

    static propTypes = {
        isDisable: PropTypes.bool,
        resourceOptions: PropTypes.array.isRequired,
        selectedResource: PropTypes.string,
        onSelectedResourceChange: PropTypes.func.isRequired,

        searchOptions: PropTypes.array.isRequired,
        selectedSearch: PropTypes.string,        
        onSelectedSearchChange: PropTypes.func.isRequired,
    }

    static defaultProps = {
        isDisable: false,
        selectedResource: '',
        selectedSearch: '',
    }

    constructor(props) {
        super(props);

    }

    onSelectedResourceChange = (e, {value}) => {
        e.preventDefault();        
        this.props.onSelectedResourceChange(value);
    }

    onSelectedSearchChange = (e,{value}) => {
        e.preventDefault();
        this.props.onSelectedSearchChange(value);
    }

    render() {

        return (

            <Form>
                <Form.Group widths='equal'>
                    <Form.Select
                        key='ResourceSelector'
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
                    <Form.Select
                        key='SearchSelector'
                        disabled={this.props.isDisable}
                        label='Search Parameter'
                        fluid
                        width={4}                        
                        options={this.props.searchOptions}
                        placeholder='Search Parameter'
                        search
                        closeOnChange
                        onChange={this.onSelectedSearchChange}
                        value={this.props.selectedSearch}
                    />
                </Form.Group>
            </Form>
        )
    }

}
