import testData from "./testData.json" assert {type: 'json'};

export const getRegisteredOfficeAddressReqs = testData.companyNumbers.map(company_number=>({path: `/company/${company_number}/registered-office-address`}))
export const getCompanyProfileReqs = testData.companyNumbers.map(company_number=>({path: `/company/${company_number}`}))
export const searchAllReqs = []
export const searchCompaniesReqs = []
export const searchOfficersReqs = []
export const searchDisqualifiedOfficersReqs = []
export const searchDissolvedCompaniesReqs = []
export const searchCompaniesAlphabeticallyReqs = []
export const advancedCompanySearchReqs = []
export const listOfficersReqs = testData.companyNumbers.map(company_number=>({path: `/company/${company_number}/officers`}))
export const getOfficersReqs = Object.entries(testData.appointmentIds).flatMap(([company_number, appointment_ids])=>appointment_ids.map(appointment_id=>({path:`/company/${company_number}/appointments/${appointment_id}`})))
export const getRegistersReqs = testData.companyNumbers.map(company_number=>({path: `/company/${company_number}/registers`}))
export const getFilingHistoryReqs = Object.entries(testData.transactionIds).flatMap(([company_number, transaction_ids])=>transaction_ids.map(transaction_id=>({path:`/company/${company_number}/filing-history/${transaction_id}`})))
export const listFilingHistoryReqs = testData.companyNumbers.map(company_number=>({path: `/company/${company_number}/filing-history`}))
export const getExemptionsReqs = testData.companyNumbers.map(company_number=>({path: `/company/${company_number}/exemptions`}))
export const getNaturalOfficerReqs = testData.officerIds.map(officer_id=>({path: `/disqualified-officers/natural/${officer_id}`}))
export const getCorporateOfficerReqs = testData.officerIds.map(officer_id=>({path: `/disqualified-officers/corporate/${officer_id}`}))
export const listOfficerAppointmentsReqs = testData.officerIds.map(officer_id=>({path: `/officers/${officer_id}/appointments`}))
export const listChargesReqs = testData.companyNumbers.map(company_number=>({path: `/company/${company_number}/charges`}))
export const getChargesReqs = Object.entries(testData.chargeIds).flatMap(([company_number, charge_ids])=>charge_ids.map(charge_id=>({path:`/company/${company_number}/charges/${charge_id}`})))
export const getInsolvencyReqs = testData.companyNumbers.map(company_number=>({path: `/company/${company_number}/insolvency`}))
export const getUKEstablishmentsReqs = testData.companyNumbers.map(company_number=>({path: `/company/${company_number}/uk-establishments`}))
export const listPersonsWithSignificantControlReqs = testData.companyNumbers.map(company_number=>({path: `/company/${company_number}/persons-with-significant-control`}))
export const getIndividualReqs = Object.entries(testData.pscIds.individual).flatMap(([company_number, psc_ids])=>psc_ids.map(psc_id=>({path:`/company/${company_number}/persons-with-significant-control/individual/${psc_id}`})))
export const getCorporateEntitiesReqs = Object.entries(testData.pscIds.corporate).flatMap(([company_number, psc_ids])=>psc_ids.map(psc_id=>({path:`/company/${company_number}/persons-with-significant-control/corporate-entity/${psc_id}`})))
export const getLegalPersonsReqs = Object.entries(testData.pscIds.legal).flatMap(([company_number, psc_ids])=>psc_ids.map(psc_id=>({path:`/company/${company_number}/persons-with-significant-control/legal-person/${psc_id}`})))
export const listStatementsReqs = testData.companyNumbers.map(company_number=>({path: `/company/${company_number}/persons-with-significant-control-statements`}))
export const getStatementReqs = Object.entries(testData.statementIds).flatMap(([company_number, statement_ids])=>statement_ids.map(statement_id=>({path:`/company/${company_number}/persons-with-significant-control-statements/${statement_id}`})))
export const getSuperSecurePersonReqs = Object.entries(testData.pscIds.superSecure).flatMap(([company_number, super_secure_ids])=>super_secure_ids.map(super_secure_id=>({path:`/company/${company_number}/persons-with-significant-control/super-secure/${super_secure_id}`})))
