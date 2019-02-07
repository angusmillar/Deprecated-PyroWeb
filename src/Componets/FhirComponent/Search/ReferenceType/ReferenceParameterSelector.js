import React from 'react';

import { Divider, Grid, Segment, Label, Button, Icon } from 'semantic-ui-react'

import map from 'lodash/map';
import findIndex from 'lodash/findIndex';
import filter from 'lodash/filter';
import uniqueId from 'lodash/uniqueId';
import PropTypes from 'prop-types';
import FhirConstant from '../../../../Constants/FhirConstant';
import FhirSearchParameterFactory from '../../../../Constants/FhirSearchParameterFactory';
import ModifierSelector from '../ModifierSelector';
import SearchOrButton from '../SearchOrButton';
import ReferenceRelative from './ReferenceRelative';
import ReferenceAbsolute from './ReferenceAbsolute';
import ReferenceChained from './ReferenceChained';
import ReferenceTypeButton from '../ReferenceTypeButton';

export default class `ReferenceParameterSelector` extends React.Component {

    searchParameterType = FhirConstant.searchType.token;

    static propTypes = {
        onOrEdit: PropTypes.func.isRequired,
        onAddParameter: PropTypes.func.isRequired,
        onRemoveParameter: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired,
        searchParameterName: PropTypes.string.isRequired,
        modifier: PropTypes.string.isRequired,
        orList: PropTypes.array.isRequired,
        isVisable: PropTypes.bool.isRequired,
        isDisabled: PropTypes.bool,
    }

    static defaultProps = {
        isDisabled: false,
    }

    constructor(props) {
        super(props);
    }

    getSubmitted = () => {
        return (
            {
                submittedId: this.props.id,
                submittedSearchParameterName: this.props.searchParameterName,
                submittedType: this.searchParameterType,
                submittedModifier: this.props.modifier,
                submittedOrList: this.props.orList,
                submittedIsVisable: this.props.isVisable
            }
        )
    }



    render() {

        const isModifierMissing = (this.props.modifier == FhirConstant.searchModifierOptions.missing.value);

        const modifierOptions = [
            FhirConstant.searchModifierOptions.none,
            FhirConstant.searchModifierOptions.missing,
        ]

        const renderLabelName = <Label color={FhirConstant.getColorForSearchType(this.searchParameterType)} attached='top left'>Parameter: {this.props.searchParameterName}</Label>;
        const renderLabelType = <Label color={FhirConstant.getColorForSearchType(this.searchParameterType)} attached='top right'>Type: {this.searchParameterType}</Label>

        const renderButton = (
            <Grid>
                <Grid.Row columns={16}>
                    <Button onClick={this.onAddParameter} size='small' icon color='green'><Icon name='add' /></Button>
                </Grid.Row>
                <Grid.Row columns={16}>
                    <Button onClick={this.onRemoveParameter} size='small' icon color='red'><Icon name='remove' /></Button>
                </Grid.Row>
            </Grid>
        );

        const renderRemoveChainButton = () => {
            if (!this.props.isFirst) {
                return (
                    <Button
                        disabled={disableControls()}
                        onClick={this.onRemoveChainClick}
                        size='mini'
                        icon
                        color='red'
                        type='submit'><Icon name='remove' />
                    </Button>
                )
            } else {
                return null;
            }
        }


        return (

            <Segment color={FhirConstant.getColorForSearchType(this.searchParameterType)} >
                {renderLabelName}
                {renderLabelType}
                <Grid>
                    <Grid.Row columns={16}>
                        <Grid.Column width={15} >
                            <Divider horizontal hidden></Divider>
                            <Segment>
                                <Grid>
                                    <Grid.Row columns={3}>
                                        <Grid.Column width={3} >
                                            <ModifierSelector
                                                onChange={this.onModifierSelectorChange}
                                                options={modifierOptions}
                                                selected={this.props.modifier}
                                                isDisabled={false}
                                            />
                                        </Grid.Column>
                                        <Grid.Column width={12}>
                                            <ReferenceTypeButton
                                                isDisable={this.props.modifier == 'missing'}
                                                activeType={this.props.referenceType}
                                                onReferenceTypeChange={this.onReferenceTypeChange}
                                            />
                                        </Grid.Column>
                                        <Grid.Column width={1}>
                                            {renderRemoveChainButton()}
                                        </Grid.Column>
                                    </Grid.Row>
                                    {map(this.props.orList, (item, index) => {

                                        const renderOrDivider = (index) => {
                                            if (index == 0) {
                                                return null;
                                            } else {
                                                return (
                                                    <Grid.Row verticalAlign='middle'>
                                                        <Grid.Column width={16} >
                                                            <Divider fitted horizontal>OR</Divider>
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                )
                                            }
                                        }

                                        return (
                                            <React.Fragment key={item.id}>
                                                {renderOrDivider(index)}
                                                <Grid.Row columns={1} divided>
                                                    <Grid.Column width={14} >
                                                        <Token
                                                            onTokenEdit={this.onTokenEdit}
                                                            id={item.id}
                                                            system={item.system}
                                                            code={item.code}
                                                            isDisabled={isModifierMissing}
                                                        />
                                                    </Grid.Column>
                                                    <Grid.Column width={2} floated='left' verticalAlign='middle' >
                                                        {renderSearchOrButton(index, this.props.orList.length, item.id)}
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </React.Fragment>
                                        )
                                    })}
                                </Grid>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={1} verticalAlign='top' >
                            <Divider horizontal hidden></Divider>
                            {renderButton}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        )
    }

}
