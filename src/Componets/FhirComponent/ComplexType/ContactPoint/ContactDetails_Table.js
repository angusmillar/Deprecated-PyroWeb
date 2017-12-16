import React from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy'
import filter from 'lodash/filter'
import take from 'lodash/take'

import isNil from 'lodash/isNil';
import { Icon, Table, Transition } from 'semantic-ui-react'

import ContactPoint_Row from './ContactPoint_Row'
import ColorConstant from '../../../../Constants/ColorConstant'

class ContactDetails_Table extends React.Component {
    constructor(props) {
        super(props);
        this.mouseOverExpandEvent = this.mouseOverExpandEvent.bind(this);
        this.onClickExpand = this.onClickExpand.bind(this);

        this.state = { animation: 'jiggle', duration: 800, visible: true, expandRows: false, expandIconType: 'plus square outline' };
    }

    mouseOverExpandEvent() {
        this.setState({ visible: !this.state.visible })
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

        const renderTelcom = (Contact) => {
            if (isNil(Contact)) {
                return null
            }
            else {
                if (this.state.expandRows) {
                    //The user has expanded the full list so show all soretd by Rank if found
                    return (
                        map(orderBy(Contact, ['rank']), (telecom, key) => {
                            return (
                                <ContactPoint_Row
                                    key={key}
                                    system={telecom.system}
                                    value={telecom.value}
                                    use={telecom.use}
                                    rank={telecom.rank}
                                    period={telecom.period} />
                            )
                        })
                    )
                }
                else {
                    //Filter by only thoses with a Rank that is equal to 1
                    const contactsWithRankOfOne = filter(Contact, { 'rank': 1 });
                    //If none have a rank of 1 then only take the first contact and showe it
                    if (contactsWithRankOfOne.length === 0) {
                        return (
                            map(take(Contact, 1), (telecom, key) => {
                                return (
                                    <ContactPoint_Row
                                        key={key}
                                        system={telecom.system}
                                        value={telecom.value}
                                        use={telecom.use}
                                        rank={telecom.rank}
                                        period={telecom.period} />
                                )
                            })
                        )
                    }
                    else {
                        //If we have some ranks of 1 then show them all
                        return (
                            map(filter(Contact, { 'rank': 1 }), (telecom, key) => {
                                return (
                                    <ContactPoint_Row
                                        key={key}
                                        system={telecom.system}
                                        value={telecom.value}
                                        use={telecom.use}
                                        rank={telecom.rank}
                                        period={telecom.period} />
                                )
                            })
                        )
                    }
                }

            }
        };

        if (isUndefined(this.props.Telecom)) {
            return null;
        } else {
            return (
                <Table padded >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='2' singleLine>
                                <Icon bordered color={ColorConstant.IconBackground} name='teletype' /> {this.props.Name}
                            </Table.HeaderCell>
                            <Table.HeaderCell colSpan='1' singleLine textAlign='right'>
                                <Transition animation={this.state.animation} duration={this.state.duration} visible={this.state.visible}>
                                    <Icon name={this.state.expandIconType} size='large' color='grey' onMouseOver={this.mouseOverExpandEvent} onClick={this.onClickExpand} />
                                </Transition>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {renderTelcom(this.props.Telecom)}
                    </Table.Body>
                </Table>
            )
        }
    }

}
//Type Checking
ContactDetails_Table.propTypes = {
    Telecom: PropTypes.array,
    Name: PropTypes.string,
}

export default ContactDetails_Table
