module.exports = function (sequelize, DataTypes) {
    return sequelize.define('bupaRole', {
        bpUUID: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        bpRole: {
            type: DataTypes.ENUM,
            primaryKey: true,
            values: ['PO_RECEPIENT','SHIP_LOCATION']
        },
        validFrom: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        validTo: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        customData: {
            type: DataTypes.JSONB,
            allowNull: true
        }
    },{
        underscored: true,
        freezeTableName: true,
        tableName: 'bupaRole',
        classMethods: {
            associate: function(models) {
                //a BP can have many roles
                models.bupaRole.hasOne(models.bupaMain, {
                    onDelete: 'cascade',
                    foreignKey: 'bpUUID',
                    constraints: false
                });
            }
        }
    });
};
