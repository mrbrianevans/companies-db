
/* this script should be run automatically on the creation of a new database instance, but in the event
 * that it needs to be run again, either:
 *  - in a mongo shell run `.load /docker-entrypoint-initdb.d/createCollections.js`
 *  - in a bash shell run `mongosh /docker-entrypoint-initdb.d/createCollections.js`
 */
db.disableFreeMonitoring()
db = db.getSiblingDB('filingHistory')
const collectionsToCreate = {
    // collections go here like this collectionName: { indexColumn: 1 }
}

const existingCollections = db.getCollectionNames()

for (const colName in collectionsToCreate) {
    // ensure collection exists with compression
    if(!existingCollections.includes(colName)){
        console.log('Creating collection', colName)
        db.createCollection(colName, {
            storageEngine: { wiredTiger: { configString: 'block_compressor=zstd' } }
        })
    }else{
        const collInfo = db.getCollectionInfos({name:colName})[0]
        console.log('Collection', colName, 'already exists with options', collInfo.options)
    }

    // ensure index exists
    const targetIndex = collectionsToCreate[colName]
    if(targetIndex) {
        const indexes = db[colName].getIndexes()

        const indexExists = indexes.findIndex(i => JSON.stringify(i.key) === JSON.stringify(targetIndex)) !== -1

        if (!indexExists) {
            console.log('Creating index on collection', colName, targetIndex)
            db[colName]
                .createIndex({company_number: 1, psc_id: 1}, {unique: true})
        }else{
            console.log('Index already exists on collection', colName, indexes.map(i=>i.name))
        }
    }
}

