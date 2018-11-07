import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import DeviceConstants from '../../Constants/DeviceConstants';
//import { Link } from 'react-router-dom'

export default class MainLogo extends React.Component {

    static propTypes = {
        siteIcon: PropTypes.string.isRequired,
        deviceType: PropTypes.string.isRequired,        
    }

    static defaultProps = {
    }

    constructor(props) {
        super(props);
    }

    render() {        
        return (
            <Image src={this.props.siteIcon} size={DeviceConstants.sizeForImage(this.props.deviceType)} floated='right' />
        )
    }

}

