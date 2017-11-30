import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react'
import isUndefined from 'lodash/isUndefined';

class Rank_Label extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        if (isUndefined(this.props.number)) {
            return null
        } else {
            return (
                <Label size='mini'>
                    Rank
                      <Label.Detail>{this.props.number}</Label.Detail>
                </Label>
            )
        }
    }
}

Rank_Label.propTypes = {
    number: PropTypes.string,
}

export default Rank_Label;  
