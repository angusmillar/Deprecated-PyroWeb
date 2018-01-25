import React from 'react';
import PropTypes from 'prop-types';
import { Label, Grid } from 'semantic-ui-react'


class RestVerbHeaderComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid stackable floated='left'>
                <Grid.Row columns={1} only='computer'>
                    <Grid.Column width={2} textAlign='left'>
                        {/* <code>{this.props.verb}</code> */}
                        <span>
                            <Label horizontal color={this.props.color}><code>{this.props.verb}</code></Label>
                            <code>{' /'}{this.props.path}</code>
                        </span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1} only='tablet'>
                    <Grid.Column width={2} textAlign='left'>
                        {/* <code>{this.props.verb}</code> */}
                        <span>
                            <Label horizontal color={this.props.color}><code>{this.props.verb}</code></Label>
                            <code>{' /'}{this.props.path}</code>
                        </span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1} only='mobile'>
                    <Grid.Column width={2} textAlign='left'>
                        {/* <code>{this.props.verb}</code> */}
                        <Label horizontal color={this.props.color}><code>{this.props.verb}</code></Label>
                    </Grid.Column>
                    <Grid.Column width={14} textAlign='left'>
                        <code>{' /'}{this.props.path}</code>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

}

RestVerbHeaderComponent.propTypes = {
    verb: PropTypes.string.isRequired,
    path: PropTypes.string,
    color: PropTypes.string,
}

export default RestVerbHeaderComponent;  
