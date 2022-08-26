
/* this script should be run automatically on the creation of a new database instance, but in the event
 * that it needs to be run again, either:
 *  - in a mongo shell run `.load /docker-entrypoint-initdb.d/createCollections.js`
 *  - in a bash shell run `mongosh /docker-entrypoint-initdb.d/createCollections.js`
 */
db.disableFreeMonitoring()
db = db.getSiblingDB('officers')
const collectionsToCreate = {
    officers: {company_number: 1, person_number: 1, officer_role: 1, appointed_on:1}, // also needs an additional index on only person_number
    companies: {company_number: 1}
}

/*

A note about the database structure:

    officer appointment records are uniquely identified by 3 things: person number, company number and appointment type (officer role)
    [maybe also appointment date, as the same person may be appointed multiple times after resigning]

    Companies House database is structured in such as way that a relational database as follows makes sense:
     - persons (person details such as date of birth or nationality) {PK person_number_prefix}
     - sub-persons (variations of a persons details such as name, occupation or address, but still relating to the same human) {PK person_number, FK persons}
     - companies (company details such as company name and status) {PK company_number}
     - appointments (sub-person, company, appointment type, appointment date, resignation date) {PK company_number,person_number,officer_role,appointed_on, FK sub-persons,companies}

 */

const existingCollections = db.getCollectionNames()

for (const colName in collectionsToCreate) {
    // ensure collection exists with compression
    if(!existingCollections.includes(colName)){
        print('Creating collection', colName)
        db.createCollection(colName, {
            storageEngine: { wiredTiger: { configString: 'block_compressor=zstd' } }
        })
    }else{
        const collInfo = db.getCollectionInfos({name:colName})[0]
        print('Collection', colName, 'already exists with options', collInfo.options)
    }

    // ensure index exists
    const targetIndex = collectionsToCreate[colName]
    if(targetIndex) {
        const indexes = db[colName].getIndexes()

        const indexExists = indexes.findIndex(i => JSON.stringify(i.key) === JSON.stringify(targetIndex)) !== -1

        if (!indexExists) {
            print('Creating index on collection', colName, targetIndex)
            db[colName]
                .createIndex(targetIndex, {unique: true})
        }else{
            print('Index already exists on collection', colName, indexes.map(i=>i.name))
        }
    }
}

