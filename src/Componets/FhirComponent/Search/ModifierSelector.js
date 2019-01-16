import React from 'react';

import { Form } from 'semantic-ui-react'

import PropTypes from 'prop-types';

export default class ModifierSelector extends React.Component {

    static propTypes = {
        onChange: PropTypes.func.isRequired,
        options: PropTypes.array.isRequired,
        selected: PropTypes.string.isRequired,
        isDisabled: PropTypes.bool
    }

    static defaultProps = {
        isDisabled: false
    }

    constructor(props) {
        super(props);
    }

    onModifierChange = (e, { value }) => {
        e.preventDefault();
        this.props.onChange(value);
    }

    render() {
        return (
            <Form>
                <Form.Group widths='equal'>
                    <Form.Select width={3} compact label='Modifier' value={this.props.selected} options={this.props.options} placeholder='Modifier' onChange={this.onModifierChange} />
                </Form.Group>
            </Form>
        )
    }

}
