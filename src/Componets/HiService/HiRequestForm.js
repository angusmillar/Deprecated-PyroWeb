import React, { Component } from 'react'
import { Form, Divider } from 'semantic-ui-react'
import replace from 'lodash/replace'
import DatePicker from 'react-datepicker';
//import moment from 'moment';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';

//reactdatepicker

export default class HiRequestForm extends Component {

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        loading: PropTypes.bool,
    };

    static defaultProps = {
        loading: false
    }

    constructor(props) {
        super(props);
        this.state = {
            family: '', given: '', gender: '', dob: null, medicare: '', dva: '', ihi: '',
            submittedFamily: '', submittedGiven: '', submittedGender: '', submittedDob: '', submittedMedicare: '', submittedDva: '', submittedIhi: '',
            medicareDisable: false, medicareError: false, dvaDisable: false, dvaError: false, ihiDisable: false, ihiError: false,
        };
    }


    handleChange = (date) => {
        this.setState({
            dob: date
        });
    }

    onChange = (e, { value }) => {
        this.setState({
            gender: value
        });
    }

    handleFormChange = (e) => {
        const target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (name == 'medicare') {
            const temp = replace(value, /\s/g, '');
            if (isNaN(temp)) {
                this.setState({ medicareError: true });
            } else {
                this.setState({ medicareError: false });
            }
            if (value.length < 11) {
                this.setState({
                    [name]: value
                });
            }
        } else if (name == 'ihi') {
            const temp = replace(value, /\s/g, '');
            if (isNaN(temp)) {
                this.setState({ ihiError: true });
            } else {
                this.setState({ ihiError: false });
            }
            if (value.length >= 16) {

                if (!isNaN(temp)) {
                    value = `${temp.substring(0, 4)} ${temp.substring(4, 8)} ${temp.substring(8, 12)} ${temp.substring(12, 16)}`;
                }
            }
            this.setState({
                [name]: value
            });
        } else if (name == 'dva') {
            if (value.length < 9) {
                this.setState({
                    [name]: value
                });
            }
        } else {
            this.setState({
                [name]: value
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { family, given, gender, dob, medicare, dva, ihi } = this.state

        this.props.onSubmit({
            submittedFamily: family,
            submittedGiven: given,
            submittedGender: gender,
            submittedDob: dob,
            submittedMedicare: medicare,
            submittedDva: dva,
            submittedIhi: ihi
        });
    }

    render() {
        const { family, given, dob, medicare, gender, dva, ihi, dvaError, ihiError, medicareError } = this.state

        const options = [
            { key: 'm', text: 'Male', value: 'male' },
            { key: 'f', text: 'Female', value: 'female' },
            { key: 'o', text: 'Other', value: 'other' },
            { key: 'u', text: 'Unknown', value: 'unknown' },
        ]

        return (

            <Form onSubmit={this.handleSubmit} loading={this.props.loading} size='small'>
                <Form.Group >
                    <Form.Field width={6} name='family' required control='input' label='Family' placeholder='Family' value={family} onChange={this.handleFormChange} />
                    <Form.Field width={5} name='given' control='input' label='Given' placeholder='Given' value={given} onChange={this.handleFormChange} />
                    <Form.Select width={4} name='gender' fluid required label='Gender' options={options} placeholder='Gender' selected={gender} onChange={this.onChange} />
                </Form.Group>
                <Form.Group>
                    
                    <Form.Field width={5} required>
                        <label>Date of birth</label>
                        <DatePicker
                            selected={dob}
                            onChange={this.handleChange}
                            disabled={false}
                            showYearDropdown
                            dropdownMode="select"
                            placeholderText="DD/MM/YYYY"
                            dateFormat="DD/MM/YYYY"
                            isClearable={true} />
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Input width={8} name='ihi' required label='IHI' control='input' value={ihi} placeholder='8003 6000 0000 0000' error={ihiError} disabled={dva.length != 0 || medicare.length != 0} onChange={this.handleFormChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Input width={6} name='medicare' required label='Medicare (Optional IRN)' placeholder='1234 56789 0 1' control='input' value={medicare} error={medicareError} disabled={dva.length != 0 || ihi.length != 0} onChange={this.handleFormChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Input width={6} name='dva' required label='DVA' control='input' value={dva} placeholder='VA123456A' error={dvaError} disabled={ihi.length != 0 || medicare.length != 0} onChange={this.handleFormChange} />                                        
                </Form.Group>
                <Divider hidden />
                <Form.Button                       
                    width={6}    
                    disabled={
                        !((dva.length > 0 || ihi.length > 0 || medicare.length > 0) &&
                            family.length > 0 &&
                            gender.length > 0 &&
                            dob != null)}
                    content='Search' />
            </Form>

        )
    }
}

