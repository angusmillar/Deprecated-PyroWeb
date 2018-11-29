import React from 'react';

import { Button, Header } from 'semantic-ui-react'

import PropTypes from 'prop-types';

import startCase from 'lodash/startCase';
import FhirConstant from '../../../Constants/FhirConstant';

export default class SummaryButton extends React.Component {

    static propTypes = {
        size: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    }

    static defaultProps = {
    }

    constructor(props) {
        super(props);

        this.state = {
            summaryType: FhirConstant.searchSummaryType.none,
        };
    }

    handleClick = (sum) => {
        this.setState({ summaryType: sum })
        this.props.onClick({
            summaryType: sum,
        })
    }

    render() {
        return (
            <span>
                <Header size='tiny'>Summary</Header>
                <Button.Group size={this.props.size} color='black'>
                    <Button toggle onClick={() => this.handleClick(FhirConstant.searchSummaryType.none)} active={(this.state.summaryType == FhirConstant.searchSummaryType.none)} attached='left'>{startCase(FhirConstant.searchSummaryType.none)}</Button>
                    <Button toggle onClick={() => this.handleClick(FhirConstant.searchSummaryType.true)} active={(this.state.summaryType == FhirConstant.searchSummaryType.true)} attached>{startCase(FhirConstant.searchSummaryType.true)}</Button>
                    <Button toggle onClick={() => this.handleClick(FhirConstant.searchSummaryType.text)} active={(this.state.summaryType == FhirConstant.searchSummaryType.text)} attached>{startCase(FhirConstant.searchSummaryType.text)}</Button>
                    <Button toggle onClick={() => this.handleClick(FhirConstant.searchSummaryType.data)} active={(this.state.summaryType == FhirConstant.searchSummaryType.data)} attached>{startCase(FhirConstant.searchSummaryType.data)}</Button>
                    <Button toggle onClick={() => this.handleClick(FhirConstant.searchSummaryType.count)} active={(this.state.summaryType == FhirConstant.searchSummaryType.count)} attached='right'>{startCase(FhirConstant.searchSummaryType.count)}</Button>
                </Button.Group>
            </span>
        )
    }

}
