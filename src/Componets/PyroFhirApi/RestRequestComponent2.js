import React from 'react';
import PropTypes from 'prop-types';

import RestRequestAndResponseComponent from './RestRequestAndResponseComponent'

export default class RestRequestComponent2 extends React.Component {

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
                tableTitle='Requests'
                tableTitleIcon='cloud upload'
                color='violet'                
                includeHeaders={true}
                includeSearchParameters={true}
            />
        )
    }
}
