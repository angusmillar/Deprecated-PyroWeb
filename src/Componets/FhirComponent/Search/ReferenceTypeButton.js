import React from 'react';

import { Button } from 'semantic-ui-react'

import PropTypes from 'prop-types';
import FhirConstant from '../../../Constants/FhirConstant'

export default class ReferenceTypeButton extends React.Component {

    static propTypes = {
        isDisable: PropTypes.bool,
        activeType: PropTypes.string,
        onReferenceTypeChange: PropTypes.func.isRequired,
    }

    static defaultProps = {
        isDisable: false,
        activeType: FhirConstant.referenceType.relative,
    }

    constructor(props) {
        super(props);

    }

    

    onRelativeClick = (e) => {
        e.preventDefault();
        this.props.onReferenceTypeChange(FhirConstant.referenceType.relative);
    }

    onAbsoluteClick = (e) => {
        e.preventDefault();
        this.props.onReferenceTypeChange(FhirConstant.referenceType.absolute);
    }

    onChainedClick = (e) => {
        e.preventDefault();
        this.props.onReferenceTypeChange(FhirConstant.referenceType.chained);
    }

    render() {
        const isRelativeActive = (this.props.activeType == FhirConstant.referenceType.relative)
        const isAbsoluteActive = (this.props.activeType == FhirConstant.referenceType.absolute)
        const isChainedActive = (this.props.activeType == FhirConstant.referenceType.chained)

        return (
            <Button.Group size='small' color='black'>
                <Button
                    onClick={this.onRelativeClick}
                    disabled={this.props.isDisable}                    
                    active={isRelativeActive}
                    toggle
                    attached='left'>Relative</Button>
                <Button
                    onClick={this.onAbsoluteClick}
                    disabled={this.props.isDisable}                    
                    active={isAbsoluteActive}
                    toggle>Absolute</Button>
                <Button
                    onClick={this.onChainedClick}
                    disabled={this.props.isDisable}                    
                    active={isChainedActive}
                    toggle
                    attached='right'>Chained</Button>
            </Button.Group>
        )
    }

}
