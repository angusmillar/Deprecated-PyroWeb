import React from 'react';
import PropTypes from 'prop-types';
import { Table, Icon } from 'semantic-ui-react'
import map from 'lodash/map';
import isNil from 'lodash/isNil';

import MetadataHeaderTableRow from './MetadataHeaderTableRow'
import ColorConstant from '../../Constants/ColorConstant'
import Resource_Table from '../Conformance/Resource_Table'


// import Software_Table from './Software_Table'


class Rest_Table extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const renderResource = (Resources) => {
            if (isNil(Resources)) {
                return null;
            } else {
                return (
                    map(Resources, (Resource, Index) => {
                        return (
                            <Resource_Table key={Index} resource={Resource} />
                        )
                    })
                )

            }
        };


        return (
            <div>
                <Table padded >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='3' singleLine>
                                <Icon bordered color={ColorConstant.IconBackground} name='exchange' /> REST
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <MetadataHeaderTableRow RowLabel='Mode' RowValue={this.props.rest.mode} />
                        <MetadataHeaderTableRow RowLabel='Documentation' RowValue={this.props.rest.documentation} />                        
                        <Table.Row>
                            <Table.Cell colSpan='3' singleLine>
                                <div>
                                  {renderResource(this.props.rest.resource)}
                                </div>
                            </Table.Cell>
                        </Table.Row>     
                    </Table.Body>                    
                </Table>
            </div>
        )
    }

}
//Type Checking
Rest_Table.propTypes = {
    rest: PropTypes.object
}



export default Rest_Table;  
