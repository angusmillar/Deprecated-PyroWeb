import React from 'react';

import { Form } from 'semantic-ui-react'

import PropTypes from 'prop-types';

export default class ReferenceChained extends React.Component {

    static propTypes = {        
        id: PropTypes.string.isRequired,        
        isDisabled: PropTypes.bool,
        onEdit: PropTypes.func.isRequired,        
        
        resourceOptions: PropTypes.array.isRequired,
        selectedResource: PropTypes.string.isRequired,
        
        searchOptions: PropTypes.array.isRequired,
        selectedSearch: PropTypes.string.isRequired,                
        
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
                submittedSelectedSearch: this.props.selectedSearch,                
            }
        )
    }

    onResourceEdit = (e, {value}) => {
        e.preventDefault();
        const Resource = value;
        const submitted = this.getSubmitted();      
        submitted.submittedSelectedResource = Resource;       
        this.props.onEdit(submitted);
    }

    onSearchEdit = (e, {value}) => {
        const Search = value;
        const submitted = this.getSubmitted();      
        submitted.submittedSelectedSearch = Search;       
        this.props.onEdit(submitted);
    }

    render() {
        return (
            <Form>
                <Form.Group widths='equal'>
                    <Form.Select
                        key='ResourceSelector'
                        disabled={this.props.isDisabled}
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
                        disabled={this.props.isDisabled}
                        label='Search Parameter'
                        fluid
                        width={4}                        
                        options={this.props.searchOptions}
                        placeholder='Search Parameter'
                        search
                        closeOnChange                        
                        value={this.props.selectedSearch}
                        onChange={this.onSelectedSearchChange}
                    />
                </Form.Group>
            </Form>
        )
    }

}
