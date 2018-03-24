class AppConstants {
    static Resource = {
        'resourceType': 'Parameters',    
        'parameter': [
            {
                'name': 'UserId',
                'valueString': 'UserABC'
            },
            {
                'name': 'UserIdQualifier',
                'valueUri': 'http://ns.yourcompany.com.au/id/yoursoftware/userid/1.0'
            },
            {
                'name': 'ReturnSoapRequestAndResponseData',
                'valueBoolean': false
            },
            {
                'name': 'RequestPatient',
                'resource': {
                    'resourceType': 'Patient',
                    'identifier': [
                        {
                            'type': {
                                'coding': [
                                    {
                                        'system': 'http://hl7.org/fhir/v2/0203',
                                        'code': 'MC',
                                        'display': 'Patient\'s Medicare Number'
                                    }
                                ],
                                'text': 'Medicare Number'
                            },
                            'system': 'http://ns.electronichealth.net.au/id/medicare-number',
                            'value': '2950156481',
                            'period': {
                                'end': '2019-05'
                            }
                        }
                    ],
                    'name': [
                        {
                            'family': 'MARCELLE',
                            'given': [
                                'JUANITA'
                            ]
                        }
                    ],
                    'gender': 'female',
                    'birthDate': '1982-01-24'
                }
            }
        ]
    }
    
}
export default AppConstants