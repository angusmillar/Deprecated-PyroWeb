import isNil from 'lodash/isNil'
import FhirConstant from '../../../Constants/FhirConstant';

export default class SearchUrlFormat {



    static missingModifier(SearchParameterName) {
        return `${SearchParameterName}:${FhirConstant.searchModifierOptions.missing.value}=true`;
    }

    static anyParameter = (parameter) => {
        let query = '';
        for (let i = 0; i < parameter.orList.length; i++) {
            if (i == 0) {
                if (parameter.modifier == FhirConstant.searchModifierOptions.none.value) {
                    query = `${parameter.searchParameterName}=${SearchUrlFormat.anyOrType(parameter.orList[i], parameter.type)}`;                   
                } else {
                    if (parameter.modifier == FhirConstant.searchModifierOptions.missing.value) {
                        query = SearchUrlFormat.missingModifier(parameter.searchParameterName);
                    } else {
                        query = `${parameter.searchParameterName}:${parameter.modifier}=${SearchUrlFormat.anyOrType(parameter.orList[i], parameter.type)}`;
                    }
                }
            } else {
                query = query.concat(`,${SearchUrlFormat.anyOrType(parameter.orList[i], parameter.type)}`)
            }
        }
        return { id: parameter.id, queryString: query, searchType: parameter.type }
    }

   
   
    static anyOrType(orItem, type) {
        switch (type) {
            case FhirConstant.searchType.quantity:
                return this.quantity(orItem);
            case FhirConstant.searchType.string:
                return this.string(orItem);
            case FhirConstant.searchType.token:
                return this.token(orItem);
            case FhirConstant.searchType.date:
                return this.date(orItem);
            case FhirConstant.searchType.uri:
                return this.uri(orItem);
            case FhirConstant.searchType.number:
                return this.number(orItem);
            case FhirConstant.searchType.reference:
                return this.reference(orItem);
            default:
                return '';
        }
    }

    static token(item) {
        let result = '';
        if (!isNil(item) && !isNil(item.system) && item.system != '') {
            result = `${item.system}|`;
        }
        if (!isNil(item) && !isNil(item.code) && item.code != '') {
            result = result.concat(`${item.code}`);
        }
        return result;
    }

    static number(item) {
        let result = '';

        let prefix = '';
        if (item.prefix != 'none') {
            prefix = item.prefix;
        }

        if (!isNil(item) && !isNil(item.number) && item.number != '') {
            result = `${prefix}${item.number}`;

        }
        return result;
    }

    static date(item) {
        let result = '';

        let prefix = '';
        if (item.prefix != 'none') {
            prefix = item.prefix;
        }

        let zone = '';
        if (!isNil(item.zoneString) && item.zoneString != 'none') {
            zone = item.zoneString
        }

        if (!isNil(item) && !isNil(item.dateString) && item.dateString != '') {
            result = `${prefix}${item.dateString}`;
        }
        if (!isNil(item.timeString) && item.timeString != '') {
            result = result.concat(`T${item.timeString}${zone}`)
        }
        return result;
    }

    static string(item) {
        let result = '';
        if (!isNil(item) && !isNil(item.string) && item.string != '') {
            result = item.string;
        }
        return result;
    }


    static quantity(item) {
        let result = '';
        if (!isNil(item) && !isNil(item.number) && item.number != '') {
            result = `${item.prefix}${item.number}|${item.system}|${item.code}`;
        }
        if (!isNil(item) && !isNil(item.code) && item.code != '') {
            result = `${item.prefix}${item.number}|${item.system}|${item.code}`;
        }
        return result;
    }

    static uri(item) {
        let result = '';
        if (!isNil(item) && !isNil(item.uri) && item.uri != '') {
            result = item.uri;
        }
        return result;
    }

    static reference(item) {
        if (item.isChainSearch) {
            return `${item.resource}.${item.selectedSearch}`
        } else {
            return `${item.resource}/${item.resourceId}`
        }
    }

   

}