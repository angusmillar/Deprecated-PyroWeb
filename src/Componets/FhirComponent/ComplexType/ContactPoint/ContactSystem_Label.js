import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react'
import isUndefined from 'lodash/isUndefined';


class ContactSystem_Label extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const contactUseIcon = (Use) => {
            switch (Use) {
                case 'phone':
                    return 'phone';
                case 'fax':
                    return 'fax';
                case 'email':
                    return 'mail';
                case 'pager':
                    return 'comments';
                case 'url':
                    return 'cloud';
                case 'sms':
                    return 'text telephone';
                case 'other':
                    return null;
                default:
                    return null;
            }
        }

        if (isUndefined(this.props.system)) {
            return null;
        } else {
            const Icon = contactUseIcon(this.props.system);
            if (Icon === null)
            {
                return (
                    <Label size='mini' content={this.props.system} />
                )
            } else {
                return (
                    <Label size='mini' icon={Icon} content={this.props.system} />
                )    
            }                
        }
    }
}

ContactSystem_Label.propTypes = {
    system: PropTypes.string,
}

export default ContactSystem_Label;  
