module.exports = function (sequelize, DataTypes) {
    return sequelize.define('bupaRel', {
        bpUUID: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        relatedBpUUID: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        relType: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            validate: {
                len: [1, 50]
            }
        },
        validFrom: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        validTo: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        customData: {
            type: DataTypes.JSONB,
            allowNull: false
        }
    },{
        underscored: true,
        freezeTableName: true,
        tableName: 'bupaRel',
        classMethods: {
            associate: function(models) {
                //a BP can have many roles
                models.bupaRel.belongsTo(models.bupaMain, {
                    onDelete: 'cascade',
                    foreignKey: 'bpUUID',
                    constraints: false
                });
            }
        }
    });
};
