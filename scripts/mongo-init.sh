mongo -- "$MONGO_INITDB_DATABASE" <<EOF
    var rootUser = '$MONGO_INITDB_ROOT_USERNAME';
    var rootPassword = '$MONGO_INITDB_ROOT_PASSWORD';
    var admin = db.getSiblingDB('admin');
    admin.auth(rootUser, rootPassword);

    var user = '$DB_NOTE_USERNAME';
    var passwd = '$DB_NOTE_PASSWORD';
    db.createUser({user: user, pwd: passwd, roles: [{ role: 'readWrite', db: '$MONGO_INITDB_DATABASE' }]});
EOF