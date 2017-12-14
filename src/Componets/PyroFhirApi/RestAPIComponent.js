import React from 'react';
import PropTypes from 'prop-types';
// import moment from 'moment'
import { Label } from 'semantic-ui-react'
// import map from 'lodash/map';
// import isNil from 'lodash/isNil';
//import filter from 'lodash/filter'
// import upperFirst from 'lodash/upperFirst';
// import toLower from 'lodash/toLower';


class RestAPIComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <Label as='a' color='black' ribbon><h4>Server Name</h4></Label>                        
            </div>
        )
    }

}
//Type Checking
RestAPIComponent.propTypes = {
    
}



export default RestAPIComponent;  
