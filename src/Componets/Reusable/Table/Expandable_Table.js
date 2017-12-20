import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Table, Transition, Label } from 'semantic-ui-react'
import isNil from 'lodash/isNil';

// import ColorConstant from '../../../Constants/ColorConstant'


class Expandable_Table extends React.Component {
    constructor(props) {
        super(props);
        this.mouseOverExpandEvent = this.mouseOverExpandEvent.bind(this);
        this.mouseOutRowEvent = this.mouseOutRowEvent.bind(this);
        this.onClickExpand = this.onClickExpand.bind(this);

        this.state = { animation: 'jiggle', duration: 800, visible: true, expandRows: false, expandIconType: 'plus square outline', rowActive: false };
    }

    mouseOverExpandEvent() {
        this.setState({ visible: !this.state.visible, rowActive: !this.state.rowActive })
    }

    mouseOutRowEvent() {
        this.setState({ rowActive: !this.state.rowActive })
    }

    onClickExpand() {
        if (this.state.expandRows) {
            this.setState({ expandRows: false, expandIconType: 'plus square outline' })
        }
        else {
            this.setState({ expandRows: true, expandIconType: 'minus square outline' })
        }
    }

    render() {

        const renderFormats = () => {
            if (this.state.expandRows) {
                //The user has expanded the full list so show all soretd by Rank if found
                return this.props.tableRowsFunction(true);
            }
            else {
                return this.props.tableRowsFunction(false);
            }
        };

        const renderHeader = () => {
            if (!isNil(this.props.tableHeadingComponent)) {
                return (
                    <div>
                        {this.props.tableHeadingComponent}
                    </div>
                )
            } else if (!isNil(this.props.tableHeadingIconType)) {
                return (
                    <div>
                        <Icon bordered color={this.props.tableColorType} name={this.props.tableHeadingIconType} /> {this.props.tableHeadingTitle}
                    </div>
                )
            }
            else {
                return (
                    <div>
                        <Label color={this.props.tableColorType} content={this.props.tableHeadingTitle} />
                    </div>
                )
            }
        };

        //A second header under the expandable header if required
        const renderSubHeaderRow = () => {
            if (!isNil(this.props.tableSubHeadingComponent)) {
                if (this.state.expandRows) {
                    return this.props.tableSubHeadingComponent();
                }
            }
            return null;
        };


        return (
            <Table padded color={this.props.tableColorType} inverted={this.props.tableColorInverted} >
                <Table.Header>
                    <Table.Row positive={this.state.rowActive} onMouseOver={this.mouseOverExpandEvent} onMouseOut={this.mouseOutRowEvent} onClick={this.onClickExpand}>
                        <Table.HeaderCell colSpan='2' singleLine>
                            {renderHeader()}
                        </Table.HeaderCell>
                        <Table.HeaderCell colSpan='1' singleLine textAlign='right'>
                            <Transition animation={this.state.animation} duration={this.state.duration} visible={this.state.visible}>
                                <Icon name={this.state.expandIconType} size='large' color='grey' />
                            </Transition>
                        </Table.HeaderCell>
                    </Table.Row>
                    {renderSubHeaderRow()}
                </Table.Header>
                {renderFormats()}
            </Table>
        )

    }

}
//Type Checking
Expandable_Table.propTypes = {
    //The strig heading for the table
    tableHeadingTitle: PropTypes.string.isRequired,
    //The string for the icon requires e.g (<Icon bordered color='teal' name='tableHeadingIconType' />)
    tableHeadingIconType: PropTypes.string,
    //must be a funtion that returns a react componet which will be placed in the Expandable header cell.
    tableHeadingComponent: PropTypes.element,
    //must be a funtion that returns a react componet that renders a <Table.Row> which will be placed under the expandable header row.
    tableSubHeadingComponent: PropTypes.func,    
    //must be a funtion that returns <Table.Body> and takes a bolean to expand, where true retuns that expneded state.
    tableRowsFunction: PropTypes.func.isRequired,
    //Color for the table, default if not set
    tableColorType: PropTypes.string,
    //Inverted the table color, so whole table has color if True
    tableColorInverted: PropTypes.bool
}

Expandable_Table.defaultProps = {
    tableColorInverted: false,
};

export default Expandable_Table
