import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react'

class RestVerbHeaderComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span>
                <Label horizontal color={this.props.color}><code>{this.props.verb}</code></Label>
                <code>{'/'}{this.props.path}</code>
            </span>
        )
    }
}

RestVerbHeaderComponent.propTypes = {
    verb: PropTypes.string.isRequired,
    path: PropTypes.string,    
    color: PropTypes.string,
}

export default RestVerbHeaderComponent;  
