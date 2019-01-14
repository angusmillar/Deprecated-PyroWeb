import React from 'react';

import { Form } from 'semantic-ui-react'

import PropTypes from 'prop-types';

export default class ReferenceAbsolute extends React.Component {

    static propTypes = {
        isDisable: PropTypes.bool,
        url: PropTypes.string,
        onUrlChange: PropTypes.func.isRequired,        
    }

    static defaultProps = {
        isDisable: false,
        url: '',        
    }

    constructor(props) {
        super(props);        
    }

    onUrlChange = (e) => {
        e.preventDefault();
        this.props.onUrlChange(e.target.value);
    }

    render() {

        return (

            <Form>
                <Form.Group widths='equal'>    
                    <Form.Field                        
                        disabled={this.props.isDisable}
                        label='URL'
                        width={4}
                        name='Url'
                        control='input'                        
                        placeholder='https:// | http://'
                        value={this.props.url}
                        onChange={this.onUrlChange}
                    />
                </Form.Group>
            </Form>
        )
    }

}
