const { DataTypes, Sequelize } = require('sequelize');

// Option 1: Passing a connection URI
const sequelize = new Sequelize('postgres://postgres:devpass4444@localhost:5432/testupload'); // Example for postgres

// blob https://sequelize.org/docs/v6/other-topics/other-data-types/#blobs

const Upload = sequelize.define('Upload', {
    file: {
        type: DataTypes.BLOB
    }
});

const User = sequelize.define('User', {
    filePicture: {
        type: DataTypes.STRING
    }
});

Upload.sync();

User.sync();

module.exports = sequelize;
module.exports.Upload = Upload;
module.exports.User = User;
