
/* this script should be run automatically on the creation of a new database instance, but in the event
 * that it needs to be run again, either:
 *  - in a mongo shell run `.load /docker-entrypoint-initdb.d/createCollections.js`
 *  - in a bash shell run `mongosh /docker-entrypoint-initdb.d/createCollections.js`
 */
db.disableFreeMonitoring()
db = db.getSiblingDB('personsWithSignificantControl')
const collectionsToCreate = {
    getLegalPersons: { company_number: 1, psc_id: 1 },
    listStatements: { company_number: 1 },
    listPersonsWithSignificantControl: { company_number: 1 },
    getIndividual: { company_number: 1, psc_id: 1 },
    getSuperSecurePerson: { company_number: 1, super_secure_id: 1 },
    getCorporateEntities: { company_number: 1, psc_id: 1 },
    getExemptions: { company_number: 1 },
    getStatement: { company_number: 1, statement_id: 1 },
    summary: undefined
}

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

