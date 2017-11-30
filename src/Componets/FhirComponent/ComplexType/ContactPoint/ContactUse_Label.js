import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react'
import isUndefined from 'lodash/isUndefined';


class ContactUse_Label extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const contactUseIcon = (Use) => {
            switch (Use) {
                case 'home':
                    return 'home';
                case 'work':
                    return 'suitcase';
                case 'temp':
                    return 'time';
                case 'old':
                    return 'student';
                case 'mobile':
                    return 'mobile';
                default:
                    return null;
            }
        }

        if (isUndefined(this.props.use)) {
            return null;
        } else {
            const Icon = contactUseIcon(this.props.use);
            if (Icon === null)
            {
                return (
                    <Label size='mini' content={this.props.use} />
                )
            } else {
                return (
                    <Label size='mini' icon={Icon} content={this.props.use} />
                )    
            }                
        }        
    }
}

ContactUse_Label.propTypes = {
    use: PropTypes.string,
}

export default ContactUse_Label;  
