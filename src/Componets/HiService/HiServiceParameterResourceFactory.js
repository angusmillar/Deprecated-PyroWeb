import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';


export default class HiServiceParameterResourceFactory {
    
    static resource(RequestFamily, RequestGiven, RequestGender, RequestDob, RequestIhi, RequestMedicare, RequestDva, RequestUserId) {

        let CodingSystem = '';
        let CodingCode = '';
        let CodingDisplay = '';
        let TypeText = '';
        let IdentiferSystem = '';
        let IdentiferValue = '';
        let given = [RequestGiven] ;
        

        if (!isNil(RequestMedicare) && !isEmpty(RequestMedicare)) {
            CodingSystem = 'http://hl7.org/fhir/v2/0203';
            CodingCode = 'MC';
            CodingDisplay = 'Patient\'s Medicare Number';
            TypeText = 'Medicare Number';
            IdentiferSystem = 'http://ns.electronichealth.net.au/id/medicare-number';
            IdentiferValue = RequestMedicare;
        } else if (!isNil(RequestDva) && !isEmpty(RequestDva)) {
            CodingSystem = 'http://hl7.org.au/fhir/v2/0203';
            CodingCode = 'DVA';
            CodingDisplay = 'DVA Number';
            TypeText = 'DVA Number';
            IdentiferSystem = 'http://ns.electronichealth.net.au/id/dva';
            IdentiferValue = RequestDva;
        } else if (!isNil(RequestIhi) && !isEmpty(RequestIhi)) {
            CodingSystem = 'http://hl7.org.au/fhir/v2/0203';
            CodingCode = 'NI';
            CodingDisplay = 'National unique individual identifier';
            TypeText = 'IHI';
            IdentiferSystem = 'http://ns.electronichealth.net.au/id/hi/ihi/1.0';
            IdentiferValue = RequestIhi;
        }
        
        if (isNil(RequestGiven)) {
            given = null;
         }

        return {
            resourceType: 'Parameters',
            parameter: [
                {
                    name: 'UserId',
                    valueString: RequestUserId
                },
                {
                    name: 'UserIdQualifier',
                    valueUri: 'http://ns.yourcompany.com.au/id/yoursoftware/userid/1.0'
                },
                {
                    name: 'ReturnSoapRequestAndResponseData',
                    valueBoolean: false
                },
                {
                    name: 'RequestPatient',
                    resource: {                    
                        resourceType: 'Patient',
                        identifier: [
                            {
                                type: {
                                    coding: [
                                        {
                                            system: CodingSystem,
                                            code: CodingCode,
                                            display: CodingDisplay
                                        }
                                    ],
                                    text: TypeText
                                },
                                system: IdentiferSystem,
                                value: IdentiferValue                                
                            }
                        ],
                        name: [
                            {
                                family: RequestFamily,
                                given
                            }
                        ],
                        gender: RequestGender,
                        birthDate: RequestDob
                    }
                }
            ]
        }        
    }

    
}