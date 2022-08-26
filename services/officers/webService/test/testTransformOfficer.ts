import test from 'node:test'
import {strict as assert} from "assert";
import {
    transformGetOfficerAppointment,
    transformListCompanyOfficers,
    transformListOfficerAppointments
} from "../transformOfficer.js";
import { OfficerStorage } from '../../shared/storageTypes/Officer.js';
import { CompanyStorage } from '../../shared/storageTypes/Company.js';


test('transform officer from bulk database to response format', async function(t){
    await t.test('list officer appointments', async function(){
        const inputOfficer: OfficerStorage = {
                person_number: 168056490001,
                person_number_prefix: '16805649',
                company_number: 'OC370085',
                appointment_date_origin: 'appointment-document',
                officer_role: 'llp-member',
                resigned: false,
                is_corporate_officer: false,
                appointed_on: '2012-04-02',
                // date_of_birth: { month: 4, year: 1971 },
                name_elements: {
                    title: 'MR',
                    forenames: 'MARK CHARLES DAVID',
                    surname: 'DOWDING'
                },
                address: {
                    postal_code: 'W1K 3JR',
                    address_line_1: '77 GROSVENOR STREET',
                    locality: 'LONDON',
                    region: 'GREATER LONDON'
                },
                // nationality: 'BRITISH',
                country_of_residence: 'UNITED KINGDOM'
            }
            const inputCompany : CompanyStorage = {
                // _id: "62f385680b7769c34bc20d87",
                company_number: 'OC370085',
                company_status: 'active',
                number_of_officers: 7,
                company_name: 'BLUEBAY ASSET MANAGEMENT LLP'
        }

        const expectedOutput = {
            officer_role: 'llp-member',
            appointed_to: {
                company_status: 'active',
                company_name: 'BLUEBAY ASSET MANAGEMENT LLP',
                company_number: 'OC370085'
            },
            country_of_residence: 'United Kingdom',
            address: {
                postal_code: 'W1K 3JR',
                address_line_1: 'Grosvenor Street',
                premises: '77',
                region: 'Greater London',
                locality: 'London'
            },
            name_elements: {
                forename: 'Mark',
                other_forenames: 'Charles David',
                title: 'Mr',
                surname: 'DOWDING'
            },
            appointed_on: '2012-04-02',
            name: 'Mark Charles David DOWDING',
            links: {
                company: '/company/OC370085'
            }
        }

        const actualOutput = transformListOfficerAppointments(inputOfficer, inputCompany)

        assertObjectsEqualCaseInsensitive(actualOutput, expectedOutput)

    })

    await t.test('list company officers item', async function(){
        const inputOfficer: OfficerStorage = {
            // _id: "62f3a48f0b7769c34b2a28ff",
            person_number: 65020360001,
            person_number_prefix: '06502036',
            company_number: '09870307',
            appointment_date_origin: 'incorporation-document',
            officer_role: 'director',
            resigned: false,
            is_corporate_officer: false,
            appointed_on: '2015-11-12',
            date_of_birth: { month: 12, year: 1944 },
            name_elements: { title: 'LORD', forenames: 'GRAHAM', surname: 'KIRKHAM' },
            address: {
                postal_code: 'DN6 7FE',
                address_line_1: '8, EBOR COURT',
                address_line_2: 'REDHOUSE INTERCHANGE, ARDWICK-LE-STREET',
                locality: 'DONCASTER',
                region: 'SOUTH YORKSHIRE',
                country: 'ENGLAND'
            },
            occupation: 'COMPANY DIRECTOR',
            nationality: 'BRITISH',
            country_of_residence: 'ENGLAND'
        }

        const expectedOutput = {
            nationality: 'British',
            country_of_residence: 'England',
            appointed_on: '2015-11-12',
            links: {
                self: '/company/09870307/appointments/65020360001', // modified to person number
                officer: {
                    appointments:
                        '/officers/65020360001/appointments'// modified to person number
                }
            },
            occupation: 'Company Director',
            name: 'KIRKHAM, Graham, Lord',
            date_of_birth: {
                month: 12,
                year: 1944
            },
            officer_role: 'director',
            address: {
                address_line_2: 'Redhouse Interchange, Ardwick-Le-Street',
                postal_code: 'DN6 7FE',
                country: 'England',
                region: 'South Yorkshire',
                address_line_1: 'Ebor Court',
                premises: '8,',
                locality: 'Doncaster'
            }
        }
        const actualOutput = transformListCompanyOfficers(inputOfficer)
        assertObjectsEqualCaseInsensitive(actualOutput, expectedOutput)
    })
})


function assertObjectsEqualCaseInsensitive(actual, expected, objectName = ''){
    const keys = new Set(Object.keys(actual))
    for (const key in expected) {
        const printKey = [objectName, key].join('.')
        assert(keys.has(key), 'Actual object doesn\'t have expected key: '+printKey)
        keys.delete(key)
        const actualValue = actual[key];
        const expectedValue = expected[key];
        assert(typeof actualValue === typeof expectedValue, 'Values are not the same type for key '+printKey+' : \n'+JSON.stringify({actualValue,expectedValue}))
        if(typeof actualValue !== 'object')
            assert.equal(actualValue.toString().toLowerCase(), expectedValue.toString().toLowerCase(), 'Values are not the same for key '+printKey+' : \n'+JSON.stringify({actualValue,expectedValue}))
        else assertObjectsEqualCaseInsensitive(actualValue, expectedValue, printKey)
    }
    assert(keys.size === 0, 'Additional unexpected keys found in actual object: ' + [...keys].map(k=>[objectName, k].join('.')).join(', '))
}
