import moment from 'moment'

export default class DateTimeSupport {

    //01-May-2017 08:00:00 (+08:00)
    static NowdateTimeHumanReadable = DateTimeSupport.dateTimeHumanReadable(moment());
    static dateTimeHumanReadable(Datetime) {
        return moment(Datetime).format('DD-MMM-YYYY hh:mm:ss (Z)');
    }

    //2018-01-03T09:04:44+00:00
    static NowdateTimeFhirSec = DateTimeSupport.dateTimeFhirSec(moment());
    static dateTimeFhirSec(Datetime) {
        return moment(Datetime).format('YYYY-MM-DDThh:mm:ssZ');
    }

    //2018-01-03T09:04:44.456+00:00
    static NowdateTimeFhirMilliSec = DateTimeSupport.dateTimeFhirSec(moment());
    static dateTimeFhirMilliSec(Datetime) {
        return moment(Datetime).format('YYYY-MM-DDThh:mm:ss.SSSZ');
    }

    //2018-01-03
    static NowdateFhir = DateTimeSupport.dateTimeFhirSec(moment());
    static dateFhir(Datetime) {
        return moment(Datetime).format('YYYY-MM-DD');
    }

    //Wed, 03 Jan 2018 09:04:44 GMT
    static NowdateTimeHttpHeader = DateTimeSupport.dateTimeHttpHeader(moment());
    static dateTimeHttpHeader(Datetime) {
        return `${moment(Datetime).utc().format('ddd, DD MMM YYYY hh:mm:ss')} GMT`;
    }

    ////No time-zone showen as this converts the datetime given to the users local time
    static NowdateTimeHttpHeader = DateTimeSupport.dateTimeLocal(moment());
    static dateTimeLocal(DateTime) {
        return moment(DateTime).local().format('DD-MMM-YYYY hh:mm A')
    }

    //A stright moment datetime now
    static NowMomentDefault = moment();

}

