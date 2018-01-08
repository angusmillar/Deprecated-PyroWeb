import toLower from 'lodash/toLower';
import includes from 'lodash/includes';

export default class FormatSupport {
    
    // supported format types
    static FormatType = {
        XML: { code: 'xml' },
        JSON: { code: 'json' }
    };
    
    // If the FormatString contains 'xml' or 'json' then that FormatType will be returned
    static resolveFormatFromString = (FormatString) => {
        if (includes(toLower(FormatString), FormatSupport.FormatType.JSON.code)) {
            return FormatSupport.FormatType.JSON;
        } else if (includes(toLower(FormatString), FormatSupport.FormatType.XML.code)) {
            return FormatSupport.FormatType.XML;
        } else {
            return `unkown FormatString was: ${FormatString}`;
        }
    }

}

