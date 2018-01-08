import React from 'react';
import PropTypes from 'prop-types';

import RestRequestAndResponseComponent from './RestRequestAndResponseComponent'

export default class RestResponseComponent extends React.Component {

    static propTypes = {
        resourceName: PropTypes.string.isRequired,        
        httpHeaders: PropTypes.array.isRequired,        
    
        contentTypeElement: PropTypes.element,
        selectedContentType: PropTypes.string,
        acceptElement: PropTypes.element,
        searchParameters: PropTypes.array,        
        exampleRequests: PropTypes.array,
        includeHttpBody: PropTypes.bool,
    }

    static defaultProps = {        
    }

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <RestRequestAndResponseComponent
                {...this.props}           
                tableTitle='Response'
                tableTitleIcon='cloud download'
                color='pink'                
                includeHeaders={true}
                includeSearchParameters={false}
                includeHttpBody={true}
            />
        )
    }
}
