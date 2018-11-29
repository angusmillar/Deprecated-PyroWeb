import React from 'react';

import { Button, Header } from 'semantic-ui-react'

import PropTypes from 'prop-types';
import FhirConstant from '../../../Constants/FhirConstant';

export default class EncodingButton extends React.Component {

    static propTypes = {        
        size: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,        
    }

    static defaultProps = {
    }

    constructor(props) {
        super(props);
        
        this.state = {
            encodeType: FhirConstant.DefaultFhirJsonFormat,           
        };
    }


    handleJsonClick = () => {
        this.setState({ encodeType: FhirConstant.DefaultFhirJsonFormat })
        this.props.onClick({
            encodeType: FhirConstant.DefaultFhirJsonFormat,
        })
    }
        
    handleXmlClick = () => {
        this.setState({ encodeType: FhirConstant.DefaultFhirXmlFormat })
        this.props.onClick({
            encodeType: FhirConstant.DefaultFhirXmlFormat,
        })
    }

    render() {

        const isXml = (this.state.encodeType == FhirConstant.DefaultFhirXmlFormat)
        const isJson = (this.state.encodeType == FhirConstant.DefaultFhirJsonFormat)
        return (            
            <span>
                <Header size='tiny'>Encoding</Header>
                <Button.Group size={this.props.size} color='black'>                    
                    <Button onClick={this.handleJsonClick} toggle active={isJson} attached='left'>JSON</Button>
                    <Button onClick={this.handleXmlClick} toggle active={isXml} attached='right' >XML</Button>
                </Button.Group>
            </span>
        )
    }

}
