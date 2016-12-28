module.exports = function (sequelize, DataTypes) {
    return sequelize.define('bupaMain', {
        bpUUID: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV1
        },
        bpFirstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50]
            }
        },
        bpLastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50]
            }
        },
        bpKind: {
            type: DataTypes.ENUM,
            values: ['PERSON', 'ORGANIZATION']
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        customData: {
            type: DataTypes.JSONB,
            allowNull: false
        }
    },{
        scopes: {
            active: {
                where: {
                    deleted: false
                }
            }
        },
            underscored: true,
            freezeTableName: true,
            tableName: 'bupaMain',
            classMethods: {
                associate: function(models) {
                    //a BP can have many roles
                    models.bupaMain.hasMany(models.bupaRole, {
                        onDelete: 'cascade',
                        foreignKey: 'bpUUID',
                        constraints: false
                    });
                    models.bupaMain.hasMany(models.bupaComm, {
                        onDelete: 'cascade',
                        foreignKey: 'bpUUID',
                        constraints: false
                    });
                }
            }
    }
    );
};
