mongo -- "$MONGO_INITDB_DATABASE" <<EOF
    var rootUser = '$MONGO_INITDB_ROOT_USERNAME';
    var rootPassword = '$MONGO_INITDB_ROOT_PASSWORD';
    var admin = db.getSiblingDB('admin');
    admin.auth(rootUser, rootPassword);

    var user = '$DB_NOTE_USERNAME';
    var passwd = '$DB_NOTE_PASSWORD';
    db.createUser({user: user, pwd: passwd, roles: [{ role: 'readWrite', db: '$MONGO_INITDB_DATABASE' }]});
    db.createCollection("users");
    db.users.insert({ "user_name": user, "password": "abf57a2a20fc39a5c3305705530a87d48429b4b71b9d35b4a47f416dc395cd3d"})

EOF