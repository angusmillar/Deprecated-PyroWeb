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
            return FhirSearchParameterFactory.reference(searchName);                                                      
            default:
        }
    }

    static referenceOr = () => {
        return (
            {
                id: uniqueId(`${FhirConstant.searchType.reference}Or_`),
                resourceList: [],
                resourceSelectOptions: [],
                resource: '',
                resourceId: '',
                url: '',
                selectedSearch: '',
                childReferenceElement: null,
                modifier: FhirConstant.searchModifierOptions.none.value,
                isFirst: true,
                referenceType: FhirConstant.referenceType.relative,
                endValueElement: []
            })
    }

    static reference = (parameterName) => {
        return (
            {
                id: uniqueId(`${FhirConstant.searchType.reference}_`),
                searchParameterName: parameterName,
                type: FhirConstant.searchType.token,
                referenceType: FhirConstant.referenceType.relative,
                modifier: FhirConstant.searchModifierOptions.none.value,
                orList: [FhirSearchParameterFactory.referenceOr()],
                isVisable: true,
                isDisabled: false,
            })
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