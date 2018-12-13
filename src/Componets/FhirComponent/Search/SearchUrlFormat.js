import isNil from 'lodash/isNil'
import FhirConstant from '../../../Constants/FhirConstant';

export default class SearchUrlFormat {



    static missingModifier(SearchParameterName) {
        return `${SearchParameterName}:missing=true`;
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

    // static composite(item) {
    //     let result = '';
    //     return result;   
    // }

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
        if (item.selectedSearch != '') {
            return `:${item.resource}.${item.selectedSearch}`
        } else {
            return `:${item.resource}/${item.resourceId}`
        }
    }

    static anyType(item) {
        switch (item.type) {
            case FhirConstant.searchType.quantity:
                return this.quantity(item);
            case FhirConstant.searchType.string:
                return this.string(item);
            case FhirConstant.searchType.token:
                return this.token(item);
            case FhirConstant.searchType.date:
                return this.date(item);
            case FhirConstant.searchType.uri:
                return this.uri(item);
            case FhirConstant.searchType.number:
                return this.number(item);
            case FhirConstant.searchType.reference:
                return this.reference(item);
            default:
                return '';
        }
    }

}