const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('character', {
    id: {
      type: DataTypes.UUID,
      defaultValue:UUIDV4,
      allowNull: false,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday:{
      type:DataTypes.STRING,
      allowNull:false
    },
    status:{
      type:DataTypes.ENUM('Alive','Deceased','Presumed dead','Unknown'),
    },
    img:{
      type:DataTypes.STRING,
    },
    createdInDb:{
      type:DataTypes.BOOLEAN,  //Todos los creados en bd se crean con esta propiedad para luego traer todos los que estan en base de datos en el filtro !!!!!
      allowNull:false,
      defaultValue:true,
    }
  });
};

/*Nickname *
Cumpleaños *
Status
Imagen*/
