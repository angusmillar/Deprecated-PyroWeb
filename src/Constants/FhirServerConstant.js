
export default class FhirServerConstant {

    //GG's Server    
    //static PrimaryFhirServerEndpoint = 'http://test.fhir.org/r3'
    
    //Testing
    // static PrimaryFhirServerEndpoint = 'http://nowherex'

    // PyroHealth
    // static PrimaryFhirServerEndpoint = 'https://pyrohealth.net/test/stu3/fhir'    
    // static PrimaryFhirServerEndpoint = 'http://localhost:8888/fhir'
    static PyroR4FhirServerEndpoint = 'https://r4.test.pyrohealth.net/fhir'
    static PyroStu3FhirServerEndpoint = 'https://stu3.test.pyrohealth.net/fhir'

    //Server Name
    static PyroServerR4Name = 'Pyro Server R4'
    static PyroServerStu3Name = 'Pyro Server STU3'

    static RequestTimeout = 40000;

}