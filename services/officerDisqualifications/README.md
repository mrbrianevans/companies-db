 # Disqualified officers

## Endpoints
 - get natural officer `/disqualified-officers/natural/{officer_id}`
 - get corporate officer `/disqualified-officers/corporate/{officer_id}`
 - search disqualified officers `/search/disqualified-officers?q={query}`

## Database
The database is loaded from a bulk file obtained from the Companies House FTP server.
The file is about 3.5MB in size, and uses about 2.8MB of storage once loaded into the database.
There are around 16,000 records, and a new file is produced every Saturday.
There is a streaming API endpoint that provides updates to the dataset.
