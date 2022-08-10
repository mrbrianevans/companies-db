FROM mongo:5
    
ADD startupScripts docker-entrypoint-initdb.d

CMD ["--quiet", "--wiredTigerCacheSizeGB", "0.5"]
