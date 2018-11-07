import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Message } from 'semantic-ui-react';
import DeviceConstants from '../../../Constants/DeviceConstants';
//import { Link } from 'react-router-dom'

export default class PublicServerResetMessage extends React.Component {

    static propTypes = {
        deviceType: PropTypes.string.isRequired,
        plural: PropTypes.bool.isRequired
    }

    static defaultProps = {

    }

    constructor(props) {
        super(props);
    }

    render() {
        let messageText = 'This public server is freely avaliable for testing purposes, however its resources may be removed or reset at any time.';
        if (this.props.plural){
            messageText = 'These public servers are freely avaliable for testing purposes, however their resources may be removed or reset at any time.'
        }
        return (
            <Message size={DeviceConstants.sizeForMessage(this.props.deviceType)}
                negative
                icon>
                <Icon name='warning sign' />
                <Message.Content>
                    <Message.Header>Warning</Message.Header>
                    {messageText}
                </Message.Content>
            </Message>
        )
    }

}

