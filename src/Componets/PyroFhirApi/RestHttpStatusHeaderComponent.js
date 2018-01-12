import React from 'react';
import PropTypes from 'prop-types';

import { Label } from 'semantic-ui-react'

export default class RestHttpStatusHeaderComponent extends React.Component {

    static propTypes = {
        number: PropTypes.string.isRequired,
        text: PropTypes.string,
        color: PropTypes.string,
    }

    static defaultProps = {
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span>
                <Label horizontal color={this.props.color}><code>{this.props.number}</code></Label>
                {this.props.text}
            </span>
        )
    }
}


