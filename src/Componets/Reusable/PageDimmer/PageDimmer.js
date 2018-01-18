import React from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Loader, Image, Grid } from 'semantic-ui-react'

export default class PageDimmer extends React.Component {

    static propTypes = {
        wireframeParagraphImage: PropTypes.string,
    }

    static defaultProps = {
        wireframeParagraphImage: require('../../../Images/wireframe/paragraph.png'),
    }

    constructor(props) {
        super(props);        
    }

    render() {
        return (
            <Grid>
                <Dimmer active inverted>
                    <Loader size='large'>Loading</Loader>
                </Dimmer>
                <Image fluid src={this.props.wireframeParagraphImage} />
            </Grid>
        );
    }

}
