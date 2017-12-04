import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react'
import isNil from 'lodash/isNil';
import isUndefined from 'lodash/isUndefined';

class Rank_Label extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const colorLabelByRank = (rank) => {
            if (!isNil(rank)) {
                if (rank === 1) {
                    return (
                        <Label color='olive' size='mini'>
                            rank    
                            <Label.Detail>{this.props.number.toString()}</Label.Detail>
                        </Label>
                    )    
                }
            }
            return (
                <Label size='mini'>
                    rank
                    <Label.Detail>{this.props.number.toString()}</Label.Detail>
                </Label>
            )
        };

        if (isUndefined(this.props.number)) {
            return null
        } else {
            return colorLabelByRank(this.props.number) 
        }
    }
}

Rank_Label.propTypes = {
    number: PropTypes.number,
}

export default Rank_Label;  
