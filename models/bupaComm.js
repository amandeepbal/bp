module.exports = function (sequelize, DataTypes) {
    return sequelize.define('bupaComm', {
        bpUUID: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        commType: {
            type: DataTypes.ENUM,
            primaryKey: true,
            values: ['EMAIL','ADDRESS','GEO_LOCATION','VIRTUAL_ADDRESS','FAX']
        },
        adrUUID: {
            type: DataTypes.STRING,
            allowNull: true
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
        url: {
            type: DataTypes.STRING,
            validate:{
                isUrl: true
            }
        },
        customData: {
            type: DataTypes.JSONB,
            allowNull: true
        }
    },{
        underscored: true,
        freezeTableName: true,
        tableName: 'bupaComm',
        classMethods: {
            associate: function(models) {
                //a BP can have many roles
                models.bupaComm.belongsTo(models.bupaMain, {
                    onDelete: 'cascade',
                    foreignKey: 'bpUUID',
                    constraints: false
                });
            }
        }
    });
};
