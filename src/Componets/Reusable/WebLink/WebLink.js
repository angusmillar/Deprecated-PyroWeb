import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil'

export default class WebLink extends React.Component {

    static propTypes = {
        url: PropTypes.string.isRequired,
        display: PropTypes.string.isRequired,
        newTab: PropTypes.bool,
        linkType: PropTypes.string,
    }

    static defaultProps = {
        newTab: true,
    }

    constructor(props) {
        super(props);
    }

    static LinkType = {
        callTo: 'callto',
        fax: 'fax',
        mailto: 'mailto',
        sms: 'sms',
        url: 'url',
    };
    

    render() {
        let type = '';
        if (isNil(this.props.linkType)){
            type = WebLink.LinkType.url;
        } else {
            type = this.props.linkType;
        }
        
        switch (type) {
            case WebLink.LinkType.url:
                {
                    if (this.props.newTab) {
                        return (
                            <a
                                as='a'
                                href={this.props.url}
                                rel="noopener noreferrer"
                                target='_blank'
                            >
                                {this.props.display}
                            </a>
                        );
                    } else {
                        return (
                            <a
                                as='a'
                                href={this.props.url}
                            >
                                {this.props.display}
                            </a>
                        );
                    }
                }                
                default:
                {
                    // In not a url type then can format based on the props linktype
                    return (
                        <a
                            href={`${this.props.linkType}:`.concat(this.props.url)}
                        >
                            {this.props.display}
                        </a>
                    );
                }                           
        }
    }

}
