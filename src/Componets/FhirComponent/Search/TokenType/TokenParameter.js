import React from 'react';

import { Divider, Grid, Segment, Label, Button, Icon } from 'semantic-ui-react'

import map from 'lodash/map';
import findIndex from 'lodash/findIndex';
import PropTypes from 'prop-types';
import FhirConstant from '../../../../Constants/FhirConstant';
import ModifierSelector from '../ModifierSelector';
import Token from '../Token';

export default class TokenParameter extends React.Component {
    
    searchParameterType = FhirConstant.searchType.token;

    static propTypes = {
        onTokenOrEdit: PropTypes.func.isRequired,
        onAddParameter: PropTypes.func.isRequired,
        onRemoveParameter: PropTypes.func.isRequired,     
        id: PropTypes.string.isRequired,
        searchParameterName: PropTypes.string.isRequired,
        modifier: PropTypes.string.isRequired,
        orList: PropTypes.string.isRequired,        
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

    onModifierSelectorChange = (modifier) => {
        const submitted = this.getSubmitted();
        submitted.submittedModifier = modifier;
        this.props.onTokenOrEdit(submitted);
    }

    onTokenEdit = (e) => {
        e.preventDefault();

        const newOrList = this.props.orList.slice(0);
        const targetIndex = findIndex(newOrList, { id: e.submittedId })
        newOrList.splice(targetIndex, 1, {
            id: e.submittedId,
            system: e.submittedSystem,
            code: e.submittedCode,
        });

        const submitted = this.getSubmitted();
        submitted.submittedOrList = newOrList;
        this.props.onTokenOrEdit(submitted);
    }

    onAddParameter = () => {
        this.props.onAddParameter(this.props.id)
    }

    onRemoveParameter = () => {
        this.props.onRemoveParameter(this.props.id)
    }

    render() {

        const modifierOptions = () => {
            return (
                [
                    { key: 'none', text: 'None', value: 'none' },
                    { key: 'missing', text: 'Missing', value: 'missing' },
                ]
            )
        }

        const renderLabelName = () => {
            return <Label color={FhirConstant.getColorForSearchType(this.searchParameterType)} attached='top left'>Parameter: {this.searchParameterName}</Label>
        };

        const renderLabelType = () => {
            return <Label color={FhirConstant.getColorForSearchType(this.searchParameterType)} attached='top right'>Type: {this.searchParameterType}</Label>
        };

        const renderButton = () => {
            return (
                <Grid>
                    <Grid.Row columns={16}>
                        <Button onClick={this.onAddParameter} size='small' icon color='green'><Icon name='add' /></Button>
                    </Grid.Row>
                    <Grid.Row columns={16}>
                        <Button onClick={this.onRemoveParameter} size='small' icon color='red'><Icon name='remove' /></Button>
                    </Grid.Row>
                </Grid>
            )
        };

        return (



            <Segment color={FhirConstant.getColorForSearchType(this.searchParameterType)} >
                {renderLabelName()}
                {renderLabelType()}
                <Grid>
                    <Grid.Row columns={16}>
                        <Grid.Column width={15} >
                            <Divider horizontal hidden></Divider>
                            <Segment>
                                <Grid>
                                    <Grid.Row columns={1}>
                                        <Grid.Column width={16} >
                                            <ModifierSelector
                                                onChange={this.onModifierSelectorChange}
                                                options={modifierOptions()}
                                                selected={this.props.modifier}
                                                isDisabled={false}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                    {map(this.props.orList, (item) => {
                                        return (
                                            <React.Fragment>
                                                <Grid.Row verticalAlign='middle'>
                                                    <Grid.Column width={16} >
                                                        <Divider fitted horizontal>OR</Divider>
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row columns={1}>
                                                    <Grid.Column width={16} >
                                                        <Token
                                                            key={item.id}
                                                            onTokenEdit={this.onTokenEdit}
                                                            id={item.id}
                                                            system={item.system}
                                                            code={item.code}
                                                            isDisabled={false}
                                                        />
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
                            {renderButton()}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        )
    }

}
