To output a create statement for a table in an operational database, one with appropriate and valid permissions can do the following:

~~~~
pg_dump -t 'yourSchema.yourTableName' --schema-only yourDatabase > /path/to/filename.sql
~~~~

This is especially useful for incremental backups of changing operational database.
