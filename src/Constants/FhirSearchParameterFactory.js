import uniqueId from 'lodash/uniqueId'
import FhirConstant from './FhirConstant';

export default class FhirSearchParameterFactory {


    static create = (searchType, searchName) => {
        switch (searchType) {
            case FhirConstant.searchType.quantity:
                return null;
            case FhirConstant.searchType.string:
                return null;
            case FhirConstant.searchType.token:                
                return FhirSearchParameterFactory.token(searchName);                                                      
            case FhirConstant.searchType.date:
                return null;
            case FhirConstant.searchType.uri:
                return null;
            case FhirConstant.searchType.number:
                return null;
            case FhirConstant.searchType.reference:
                return null;
            default:
        }
    }

    static tokenOr = () => {
        return (
            {
                id: uniqueId(`${FhirConstant.searchType.token}Or_`),
                system: '',
                code: '',
            })
    }

    static token = (parameterName) => {
        return (
            {
                id: uniqueId(`${FhirConstant.searchType.token}_`),
                searchParameterName: parameterName,
                type: FhirConstant.searchType.token,
                modifier: FhirConstant.searchModifierOptions.none.value,
                orList: [FhirSearchParameterFactory.tokenOr()],
                isVisable: true,
                isDisabled: false,
            })
    }

}