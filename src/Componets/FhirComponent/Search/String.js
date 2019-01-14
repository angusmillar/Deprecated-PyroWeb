import React from 'react';

import { Grid, Form } from 'semantic-ui-react'

import PropTypes from 'prop-types';
import UuidSupport from '../../../SupportTools/UuidSupport';
import SearchOrButton from './SearchOrButton';
import FhirConstant from '../../../Constants/FhirConstant';

export default class String extends React.Component {

    static propTypes = {
        onStringEdit: PropTypes.func.isRequired,
        onOrAddRemoveClick: PropTypes.func,
        id: PropTypes.string,
        string: PropTypes.string,
        modifier: PropTypes.string,
        isLast: PropTypes.bool,
        isFirstString: PropTypes.bool
    }

    static defaultProps = {
        id: UuidSupport.createGUID(),
        string: '',
        modifier: 'none',
        isLast: false,
        isFirstString: false
    }

    constructor(props) {
        super(props);

        this.state = {
            string: this.props.string,
            modifier: this.props.modifier
        };
    }

    getSubmitted = () => {
        return (
            {
                submittedId: this.props.id,
                submittedType: FhirConstant.searchType.string,
                submittedString: this.state.string,
                submittedModifier: this.state.modifier,
            }
        )
    }

    onStringEdit = (e) => {
        e.preventDefault();

        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        const submitted = this.getSubmitted();
        if (name == 'string') {
            submitted.submittedString = value;
        }
        this.props.onStringEdit(submitted);

    }

    onModifierChange = (e, { value }) => {
        e.preventDefault();

        const submitted = this.getSubmitted();
        submitted.submittedModifier = value;
        this.props.onStringEdit(submitted);

        if (value == 'missing') {
            this.setState({
                modifier: value,
                string: ''
            });
        } else {
            this.setState({
                modifier: value
            });
        }
    }

    onOrAdd = () => {
        // e.preventDefault();

        this.props.onOrAddRemoveClick({
            eventId: this.props.id,
            eventIsAdd: true
        })
    }

    onOrRemove = () => {
        // e.preventDefault();

        this.props.onOrAddRemoveClick({
            eventId: this.props.id,
            eventIsAdd: false
        })
    }

    render() {


        const renderSearchOrButton = () => {            
            if (this.props.isLast) {
                return (
                    <SearchOrButton
                        isDisable={false}
                        id={this.state.id}
                        onOrAdd={this.onOrAdd}
                        onOrRemove={this.onOrRemove}
                    />
                )
            } else {
                return (
                    <SearchOrButton
                        isDisable={false}
                        id={this.state.id}
                        //onOrAdd={this.onOrAdd}
                        onOrRemove={this.onOrRemove}
                    />
                )
            }
        }


        const modifierOptions = () => {
            if (this.props.isFirstString) {
                return (
                    [
                        { key: 'none', text: 'None', value: 'none' },
                        { key: 'missing', text: 'Missing', value: 'missing' },
                        { key: 'contains', text: 'Contains', value: 'contains' },
                        { key: 'exact', text: 'Exact', value: 'exact' },
                    ]
                )
            } else {
                return (
                    [
                        { key: 'none', text: 'None', value: 'none' },
                        { key: 'contains', text: 'Contains', value: 'contains' },
                        { key: 'exact', text: 'Exact', value: 'exact' },
                    ]
                )
            }
        }


        const disableDueToMissing = () => {
            if (this.state.modifier == 'missing') {
                return true;
            } else {
                return false;
            }
        }

        const renderModifierSelector = () => {
            if (this.props.isFirstString) {
                return (
                    <Grid.Row columns={3}>
                        <Grid.Column width={3} >
                            <Form>
                                <Form.Group widths='equal'>
                                    <Form.Select width={3} compact label='Modifier' value={modifier} options={modifierOptions()} placeholder='Modifier' onChange={this.onModifierChange} />
                                </Form.Group>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                )
            } else {
                return null;
            }
        }

        const { string, modifier } = this.state
        return (
            <Grid>
                {renderModifierSelector()}
                <Grid.Row columns={3}>
                    <Grid.Column width={14} >
                        <Form>
                            <Form.Group widths='equal'>
                                {/* <Form.Select width={2} compact label='Modifier' value={modifier} options={modifierOptions()} placeholder='Modifier' onChange={this.onModifierChange} /> */}
                                <Form.Field label='String' width={10} name='string' control='input' disabled={disableDueToMissing()} placeholder='value' value={string} onChange={this.onStringEdit} />
                            </Form.Group>
                        </Form>
                    </Grid.Column>
                    <Grid.Column width={1} floated='left' verticalAlign='middle' >
                        {renderSearchOrButton()}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

}
