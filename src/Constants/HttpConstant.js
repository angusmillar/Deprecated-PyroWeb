import find from 'lodash/find'

export default class HttpConstant {

    // static STU3_SpecWebsite = 'http://hl7.org/fhir/STU3'

    static StatusCodeArray = [
        { number: '200', description: 'Ok', color: 'olive' },
        { number: '400', description: 'Bad Request', color: 'red' },        
        { number: '410', description: 'Gone', color: 'orange' },   
        { number: '404', description: 'Not Found', color: 'orange' },   
    ];
    

    static getStatusCodeByNumber(number) {
        return find(HttpConstant.StatusCodeArray, ['number', number])
    }    

}