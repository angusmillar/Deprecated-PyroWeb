import React from 'react';

import { Button, Icon } from 'semantic-ui-react'

import PropTypes from 'prop-types';
import UuidSupport from '../../../SupportTools/UuidSupport';

export default class FhirQueryButton extends React.Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        delimiter: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        onRemoveClick: PropTypes.func.isRequired,
    }

    static defaultProps = {
        id: UuidSupport.createGUID(),
    }

    constructor(props) {
        super(props);
    }


    onClick = (e) => {
        e.preventDefault();

        this.props.onClick({
            eventId: this.props.id,
        })
    }

    onRemoveClick  = (e) => {
        e.preventDefault();

        this.props.onRemoveClick({
            eventId: this.props.id,
        })
    }

    render() {

        return (
            <React.Fragment key={this.props.id}>
                <Button basic compact size='tiny' color='grey'>{this.props.delimiter}</Button>
                <Button.Group size='tiny'>
                    <Button basic compact onClick={this.onClick} color={this.props.color} animated='fade' >
                        <Button.Content visible>{this.props.value}</Button.Content>
                        <Button.Content hidden>
                            <b>Edit{' '}</b>
                            <Icon name='edit' />
                        </Button.Content>
                    </Button>
                    <Button icon basic compact onClick={this.onRemoveClick} color={this.props.color}><Icon name='remove circle' /></Button>
                </Button.Group>
            </React.Fragment>
        )
    }

}
