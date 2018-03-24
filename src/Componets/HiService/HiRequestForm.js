import React, { Component } from 'react'
import { Form, Grid } from 'semantic-ui-react'
import replace from 'lodash/replace'


class HiRequestForm extends Component {
    state = {
        family: '', given: '', gender: '', dob: '', medicare: '', dva: '', ihi: '',
        submittedFamily: '', submittedGiven: '', submittedGender: '', submittedDob: '', submittedMedicare: '', submittedDva: '', submittedIhi: '',
        medicareDisable: false, medicareError: false, dvaDisable: false, dvaError: false, ihiDisable: false, ihiError: false,
    };


    handleChange = (e) => {
        const target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (name == 'medicare') {
            const temp = replace(value, /\s/g, '');
            if (isNaN(temp)) {
                this.setState({medicareError: true});
            } else {
                this.setState({medicareError: false});
            }
            if (value.length < 11) {
                this.setState({
                    [name]: value
                });
            }
        } else if (name == 'ihi') {
            const temp = replace(value, /\s/g, '');
            if (isNaN(temp)) {
                this.setState({ihiError: true});
            } else {
                this.setState({ihiError: false});
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

    handleSubmit = () => {
        const { family, given, gender, dob, medicare, dva, ihi } = this.state

        this.setState({
            submittedFamily: family,
            submittedGiven: given,
            submittedGender: gender,
            submittedDob: dob,
            submittedMedicare: medicare,
            submittedDva: dva,
            submittedIhi: ihi,
        })
    }

    render() {
        const { family, given, dob, medicare, dva, ihi, dvaError, ihiError, medicareError } = this.state

        const options = [
            { key: 'm', text: 'Male', value: 'male' },
            { key: 'f', text: 'Female', value: 'female' },
            { key: 'o', text: 'Other', value: 'other' },
            { key: 'u', text: 'Unknown', value: 'unknown' },
        ]

        return (
            <div>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={16} >
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group widths='equal'>
                                <Form.Input width={6} name='ihi' required label='IHI Number' control='input' value={ihi} placeholder='8003 6000 0000 0000' error={ihiError} disabled={dva.length != 0 || medicare.length != 0} onChange={this.handleChange} />
                                    <Form.Input width={6} name='medicare' required label='Medicare Number (Optional IRN)' placeholder='1234 56789 0 1' control='input' value={medicare} error={medicareError} disabled={dva.length != 0 || ihi.length != 0} onChange={this.handleChange} />
                                    <Form.Input width={6} name='dva' required label='DVA Number' control='input' value={dva} placeholder='VA123456A' error={dvaError} disabled={ihi.length != 0 || medicare.length != 0} onChange={this.handleChange} />                                    
                                </Form.Group>
                                <Form.Group >
                                    <Form.Field width={6} name='family' required control='input' label='Family name' placeholder='Family' value={family} onChange={this.handleChange} />                                    
                                    <Form.Field width={6} name='given' control='input' label='Given name' placeholder='Given' value={given} onChange={this.handleChange} />                                    
                                </Form.Group>
                                <Form.Group >                                                                        
                                </Form.Group>
                                <Form.Group >
                                    <Form.Select width={6} name='gender' fluid required label='Gender' options={options} placeholder='Gender'  />
                                    <Form.Field width={6} name='dob' required control='input' label='Date of Birth' placeholder='Date of Birth' value={dob}  onChange={this.handleChange} />
                                </Form.Group>                   
                                <Form.Button content='Search' />
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default HiRequestForm