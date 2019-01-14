import React, { Component } from 'react';
import { Header, Grid, Divider, Segment, Message, Label, Icon } from 'semantic-ui-react';
import toUpper from 'lodash/toUpper';
import isNil from 'lodash/isNil'
import find from 'lodash/find';
import toLower from 'lodash/toLower';
import startCase from 'lodash/startCase';
//import DatePicker from 'react-datepicker';
import moment from 'moment';
import PropTypes from 'prop-types';
// import 'react-datepicker/dist/react-datepicker.css';
import '../../CustomCss/react-datepicker.css';


export default class SearchResultSegment extends Component {

    static propTypes = {
        parameterResource: PropTypes.object.isRequired,
    };

    static defaultProps = {
    }

    constructor(props) {
        super(props);
    }


    render() {

        const processParameterResource = (parameterResource) => {
            let ResIhiFound = false;
            let ResFamily = '';
            let ResGiven = '';
            let ResDob = '';
            let ResGender = '';
            let ResMedicare = '';
            let ResDva = '';
            let ResIhiValue = '';
            let ResIhiStatus = '';
            let ResIhiRecordStatus = '';
            let ResErrorCode = '';
            let ResErrorReason = '';

            const HiServiceResponse = find(parameterResource.parameter, (o) => (o.name == 'HiServiceResponse'), 0);

            const IHIMatchFound = find(HiServiceResponse.part, (o) => (o.name == 'IHIMatchFound'), 0);
            ResIhiFound = IHIMatchFound.valueBoolean;
            if (IHIMatchFound.valueBoolean) {
                const ResponsePatient = find(HiServiceResponse.part, (o) => (o.name == 'ResponsePatient'), 0);

                const IdentifierIHI = find(ResponsePatient.resource.identifier, (o) => (o.system == 'http://ns.electronichealth.net.au/id/hi/ihi/1.0'), 0);
                if (!isNil(IdentifierIHI)) {
                    ResIhiValue = IdentifierIHI.value;

                    const IdentifierIHIextensionStatus = find(IdentifierIHI.extension, (o) => (o.url == 'http://hl7.org.au/fhir/StructureDefinition/ihi-status'), 0);
                    ResIhiStatus = IdentifierIHIextensionStatus.valueCoding.display;

                    const IdentifierIHIextensionRecordStatus = find(IdentifierIHI.extension, (o) => (o.url == 'http://hl7.org.au/fhir/StructureDefinition/ihi-record-status'), 0);
                    ResIhiRecordStatus = IdentifierIHIextensionRecordStatus.valueCoding.display;
                }

                const IdentifierDVA = find(ResponsePatient.resource.identifier, (o) => (o.system == 'http://ns.electronichealth.net.au/id/dva'), 0);
                if (!isNil(IdentifierDVA)) {
                    ResDva = IdentifierDVA.value;
                }

                const IdentifierMedicare = find(ResponsePatient.resource.identifier, (o) => (o.system == 'http://ns.electronichealth.net.au/id/medicare-number'), 0);
                if (!isNil(IdentifierMedicare)) {
                    ResMedicare = IdentifierMedicare.value;
                }


                ResFamily = ResponsePatient.resource.name[0].family;
                ResGiven = ResponsePatient.resource.name[0].given[0];
                ResGender = ResponsePatient.resource.gender;
                ResDob = moment(ResponsePatient.resource.birthDate);

            } else {

                const HiServiceMessageList = find(HiServiceResponse.part, (o) => (o.name == 'HiServiceMessageList'), 0);
                const CodeParam = find(HiServiceMessageList.part[0].part, (o) => (o.name == 'Code'), 0);
                ResErrorCode = CodeParam.valueCode;

                const ReasonParam = find(HiServiceMessageList.part[0].part, (o) => (o.name == 'Reason'), 0);
                ResErrorReason = ReasonParam.valueString;

                // const SeverityTypeParam = find(HiServiceMessageList.part[0].part, (o) => (o.name == 'SeverityType'), 0);
                // let SeverityType = SeverityTypeParam.valueCode;
            }


            return {
                IHIFound: ResIhiFound,
                Family: ResFamily,
                Given: ResGiven,
                Dob: ResDob,
                Gender: ResGender,
                Medicare: ResMedicare,
                Dva: ResDva,
                IhiValue: ResIhiValue,
                IhiStatus: ResIhiStatus,
                IhiRecordStatus: ResIhiRecordStatus,
                ErrorCode: ResErrorCode,
                ErrorReason: ResErrorReason
            };


        }

        const genderColor = (Gender) => {
            switch (Gender) {
                case 'female':
                    return 'pink';
                case 'male':
                    return 'blue';
                case 'unknown':
                    return 'purple';
                case 'other':
                    return 'black';
            }
        }

        const medicareNumber = (Number) => {
            const value = `${Number.substring(0, 4)} ${Number.substring(4, 9)} ${Number.substring(9, 10)}`;
            if (Number.length == 11)
                value.concat(` ${Number.substring(10, 11)}`);
            if (Number != '') {
                return (
                    <div>
                        <Header sub>Medicare</Header>
                        <span>{value}</span>
                        <Divider hidden />
                    </div>
                )
            }
            return null;
        }

        const dvaNumber = (Number) => {
            if (Number != '') {
                return (
                    <div>
                        <Header sub>DVA</Header>
                        <span>{Number}</span>
                        <Divider hidden />
                    </div>
                )
            }
            return null;
        }

        const ihiNumber = (Number, Status, RecordStatus) => {
            if (Number != '') {
                const value = `${Number.substring(0, 4)} ${Number.substring(4, 8)} ${Number.substring(8, 12)} ${Number.substring(12, 16)}`;

                const statusColor = () => {
                    switch (Status) {
                        case 'Active':
                            return 'green';
                        case 'Deceased':
                            return 'brown';
                        case 'Expired':
                            return 'red';
                        case 'Resolved':
                            return 'orange';
                        case 'Retired  ':
                            return 'purple';
                        default:
                            return 'black'
                    }
                }

                const recordStatusColor = () => {
                    switch (RecordStatus) {
                        case 'Verified':
                            return 'green';
                        case 'Unverified':
                            return 'red';
                        case 'Provisional':
                            return 'orange';
                        default:
                            return 'black'
                    }
                }
                return (
                    <div>
                        <Header sub>IHI</Header>
                        <span>{value}</span><br />
                        <span><Label size='mini' color={statusColor()}>{`Status: ${Status}`}</Label><Label size='mini' color={recordStatusColor()}>{`Record: ${RecordStatus}`}</Label></span><br />
                    </div>
                )
            }
            return null;
        }


        const Result = processParameterResource(this.props.parameterResource);
        if (Result.IHIFound) {

            return (
                <Segment color={genderColor(Result.Gender)}>
                    <Grid columns={16} divided >
                        <Grid.Row>
                            <Grid.Column width={16} >
                                <Header size='large'>
                                    <Icon name='user circle' size='mini' />
                                    {`${toUpper(Result.Family)}, ${startCase(toLower(Result.Given))}`}
                                </Header>
                                <Divider />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={8} >
                                <div>
                                    <Header sub>Dob</Header>
                                    <span>{`${Result.Dob.format('DD/MMM/YYYY')}`}</span>
                                </div>
                            </Grid.Column>
                            <Grid.Column width={8} >
                                <div>
                                    <Header sub>Gender</Header>
                                    <span>{Result.Gender}</span>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16} >
                                <div>
                                    {medicareNumber(Result.Medicare)}
                                    {dvaNumber(Result.Dva)}
                                    {ihiNumber(Result.IhiValue, Result.IhiStatus, Result.IhiRecordStatus)}
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            )
        } else {
            return (
                <Message negative>
                    <Message.Header>Please review search item</Message.Header>
                    <p>Error Code: {Result.ErrorCode}</p>
                    <p>Error Reason: {Result.ErrorReason}</p>
                </Message>
            )
        }

    }
}

