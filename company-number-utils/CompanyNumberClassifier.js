import {CompanyNumberRegex} from "./CompanyNumberRegex.js";

export const COMPANY_NUMBER_TYPE = {
    /** A domestic company registered in England or Wales. Any other company not falling into one of the specific categories. */
    EnglandWalesRegular: 0,
    /** Company registered in Scotland */
    Scotland: 1,
    /** Scottish company not required to register */
    ScottishNotRequiredToRegister: 2,
    /** English/Welsh company not required to register */
    EnglishOrWelshNotRequiredToRegister: 3,
    /** Overseas Company registered in Scotland */
    OverseasScotland: 4,
    /** Overseas Company registered in England/Wales (prior to 1st October 2009) or
     * Overseas Company registered in UK (from 1st October 2009) */
    OverseasUK: 5,
    /** Company registered in Northern Ireland */
    NorthernIreland: 6,
    /** Overseas Company registered in Northern Ireland */
    OverseasNorthernIreland: 7,
    /** Limited Liability Partnership registered in England/Wales */
    LlpEnglandOrWales: 8,
    /** Limited Liability Partnership registered in Scotland */
    LlpScotland: 9,
    /** Limited Liability Partnership registered in Northern Ireland */
    LlpNorthernIreland: 10,
    /** Societas Europaea/UK Societas registered in England/Wales, Scotland or Northern Ireland */
    SocietasEuropaea: 11,
    /** These are old companies registered in Northern Ireland */
    OldNorthernIreland: 12
}

/**
 * Classify a company number into a type of company, such as where it was registered and if it's foreign.
 * @param companyNumber
 */
export function classifyCompanyNumber(companyNumber){
    const valid = CompanyNumberRegex.test(companyNumber)
    if(!valid) throw new Error(`Company number not valid: '${companyNumber}'`)
    const normalised = companyNumber.padStart(8, '0')
    const prefix = normalised.slice(0,2)
    switch (prefix){
        case 'SC':
            return COMPANY_NUMBER_TYPE.Scotland
        case 'SZ':
            return COMPANY_NUMBER_TYPE.ScottishNotRequiredToRegister
        case 'ZC':
            return COMPANY_NUMBER_TYPE.EnglishOrWelshNotRequiredToRegister
        case 'SF':
            return COMPANY_NUMBER_TYPE.OverseasScotland
        case 'FC':
            return COMPANY_NUMBER_TYPE.OverseasUK
        case 'NI':
            return COMPANY_NUMBER_TYPE.NorthernIreland
        case 'NF':
            return COMPANY_NUMBER_TYPE.OverseasNorthernIreland
        case 'OC':
            return COMPANY_NUMBER_TYPE.LlpEnglandOrWales
        case 'SO':
            return COMPANY_NUMBER_TYPE.LlpScotland
        case 'NC':
            return COMPANY_NUMBER_TYPE.LlpNorthernIreland
        case 'SE':
            return COMPANY_NUMBER_TYPE.SocietasEuropaea
        case 'R':
            return COMPANY_NUMBER_TYPE.OldNorthernIreland
        default:
            try{
                parseInt(prefix)
            }catch (e) {
                throw new Error(`Could not parse prefix of company number: '${companyNumber}'`)
            }
            return COMPANY_NUMBER_TYPE.EnglandWalesRegular
    }
}

export const COMPANY_NUMBER_COUNTRY = {
    ENGLAND_WALES: 0,
    NORTHERN_IRELAND: 1,
    SCOTLAND: 2,
    UK: 3
}

export function getCompanyNumberCountry(companyNumber){
    const classification = classifyCompanyNumber(companyNumber)
    switch (classification) {
        case COMPANY_NUMBER_TYPE.EnglishOrWelshNotRequiredToRegister:
        case COMPANY_NUMBER_TYPE.LlpEnglandOrWales:
        case COMPANY_NUMBER_TYPE.EnglandWalesRegular:
            return COMPANY_NUMBER_COUNTRY.ENGLAND_WALES
        case COMPANY_NUMBER_TYPE.Scotland:
        case COMPANY_NUMBER_TYPE.ScottishNotRequiredToRegister:
        case COMPANY_NUMBER_TYPE.OverseasScotland:
        case COMPANY_NUMBER_TYPE.LlpScotland:
            return COMPANY_NUMBER_COUNTRY.SCOTLAND
        case COMPANY_NUMBER_TYPE.NorthernIreland:
        case COMPANY_NUMBER_TYPE.OldNorthernIreland:
        case COMPANY_NUMBER_TYPE.LlpNorthernIreland:
        case COMPANY_NUMBER_TYPE.OverseasNorthernIreland:
            return COMPANY_NUMBER_COUNTRY.NORTHERN_IRELAND
        case COMPANY_NUMBER_TYPE.OverseasUK:
        case COMPANY_NUMBER_TYPE.SocietasEuropaea:
            return COMPANY_NUMBER_COUNTRY.UK
        default:
            throw new Error('Company number not classified into any country')
    }
}
