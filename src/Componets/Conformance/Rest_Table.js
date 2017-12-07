import React from 'react';
// import PropTypes from 'prop-types';
// import moment from 'moment'
import { Table, Icon } from 'semantic-ui-react'
// import map from 'lodash/map';
// import isNil from 'lodash/isNil';
// import upperFirst from 'lodash/upperFirst';
// import toLower from 'lodash/toLower';

import ColorConstant from '../../Constants/ColorConstant'


// import Software_Table from './Software_Table'


class Rest_Table extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <Table padded >
                    <Table.Header>
                        <Table.Row>                           
                            <Table.HeaderCell colSpan='2' singleLine>
                                <Icon bordered color={ColorConstant.IconBackground} name='exchange' /> REST
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                </Table>
            </div>
        )
    }

}
//Type Checking
// Rest_Table.propTypes = {
//     Name: PropTypes.string.isRequired,
    
// }



export default Rest_Table;  
