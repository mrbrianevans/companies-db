
import {CompanyInsolvency} from './CompanyInsolvency.js'
import {CompanyPscCorporate} from './CompanyPscCorporate.js'
import {CompanyCharges} from './CompanyCharges.js'
import {CompanyPscIndividual} from './CompanyPscIndividual.js'
import {CompanyOfficers} from './CompanyOfficers.js'
import {CompanyPscLegal} from './CompanyPscLegal.js'
import {CompanyProfile} from './CompanyProfile.js'
import {FilingHistory} from './FilingHistory.js'

export type AnyEvent = CompanyInsolvency | CompanyPscCorporate | CompanyCharges | CompanyPscIndividual | CompanyOfficers | CompanyPscLegal | CompanyProfile | FilingHistory
export type PscEvent = CompanyPscCorporate | CompanyPscIndividual | CompanyPscLegal
