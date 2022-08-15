import test from 'node:test'
import assert from "assert";
import {
    transformGetOfficerAppointment,
    transformListCompanyOfficers,
    transformListOfficerAppointments
} from "../transformOfficer.js";


test('transform officer from bulk database to response format', function(t){
    t.test('list officer appointments', function(){
        const input = {
            officer : {
                _id: "62f3a7c20b7769c34b237fa3",
                personNumber: 168056490001,
                personNumberPrefix: '16805649',
                companyNumber: 'OC370085',
                appointmentDateOrigin: 'appointment-document',
                appointmentType: 'llp-member',
                corporateIndicator: false,
                appointmentDate: { day: 2, month: 4, year: 2012 },
                dateOfBirth: { month: 4, year: 1971 },
                name: {
                    title: 'MR',
                    forenames: 'MARK CHARLES DAVID',
                    surname: 'DOWDING'
                },
                address: {
                    postCode: 'W1K 3JR',
                    addressLine1: '77 GROSVENOR STREET',
                    postTown: 'LONDON',
                    county: 'GREATER LONDON'
                },
                nationality: 'BRITISH',
                usualResidentialCountry: 'UNITED KINGDOM'
            },
            company : {
                _id: "62f385680b7769c34bc20d87",
                companyNumber: 'OC370085',
                status: 'active',
                numberOfOfficers: 7,
                name: 'BLUEBAY ASSET MANAGEMENT LLP'
            }
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

        const actualOutput = transformListOfficerAppointments(input.officer, input.company)

        assertObjectsEqualCaseInsensitive(actualOutput, expectedOutput)

    })

    t.test('list company officers item', function(){
        const inputOfficer = {
            _id: "62f3a48f0b7769c34b2a28ff",
            personNumber: 65020360001,
            personNumberPrefix: '06502036',
            companyNumber: '09870307',
            appointmentDateOrigin: 'incorporation-document',
            appointmentType: 'director',
            corporateIndicator: false,
            appointmentDate: { day: 12, month: 11, year: 2015 },
            dateOfBirth: { month: 12, year: 1944 },
            name: { title: 'LORD', forenames: 'GRAHAM', surname: 'KIRKHAM' },
            address: {
                postCode: 'DN6 7FE',
                addressLine1: '8, EBOR COURT',
                addressLine2: 'REDHOUSE INTERCHANGE, ARDWICK-LE-STREET',
                postTown: 'DONCASTER',
                county: 'SOUTH YORKSHIRE',
                country: 'ENGLAND'
            },
            occupation: 'COMPANY DIRECTOR',
            nationality: 'BRITISH',
            usualResidentialCountry: 'ENGLAND'
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
        assert.equal(typeof actualValue, typeof expectedValue, 'Values are not the same type for key '+printKey+' : \n'+JSON.stringify({actualValue,expectedValue}))
        if(typeof actualValue !== 'object')
            assert.equal(actualValue.toString().toLowerCase(), expectedValue.toString().toLowerCase(), 'Values are not the same for key '+printKey+' : \n'+JSON.stringify({actualValue,expectedValue}))
        else assertObjectsEqualCaseInsensitive(actualValue, expectedValue, printKey)
    }
    assert(keys.size === 0, 'Additional unexpected keys found in actual object: ' + [...keys].map(k=>[objectName, k].join('.')).join(', '))
}
