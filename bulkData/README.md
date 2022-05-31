 # Bulk data
 
Importing data from the Bulk Files published by Companies House.

## Steps
1. Download ZIP bulk file
2. Unzip to JSON/CSV
3. Import into MongoDB
4. Loop through MongoDB transforming each document 
5. Insert transformed documents into API database
6. Keep database up-to-date by listening on streams


## Runtime
Scripts are written in JavaScript and run by zx, which provides some helper functions.
