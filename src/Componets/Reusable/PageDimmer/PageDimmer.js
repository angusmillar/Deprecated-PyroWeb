import React from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

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
            <Segment>
                <Dimmer active inverted>
                    <Loader size='large'>Loading</Loader>
                </Dimmer>
                <Image fluid src={this.props.wireframeParagraphImage} />
            </Segment>
        );
    }

}
