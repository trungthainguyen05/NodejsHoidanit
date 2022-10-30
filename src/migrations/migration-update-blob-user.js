//Adding new collum
module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn(
                'Users',
                'image',
                {
                    type: Sequelize.BLOB
                }
            ),
            // queryInterface.addColumn(
            //     'tableName',
            //     'columnName2',
            //     {
            //         type: Sequelize.STRING
            //     }
            // ),
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('Users', 'image'),
            // queryInterface.removeColumn('tableName', 'columnName2')
        ]);
    }
};


//Adjust colmum
// module.exports = {
//     up: (queryInterface, Sequelize) => {
//         return Promise.all([
//             queryInterface.changeColumn('Users', 'image', {
//                 type: Sequelize.BLOB,
//                 allowNull: true,
//             }
//         ])
//     },

//     down: (queryInterface, Sequelize) => {
//         return Promise.all([
//             queryInterface.changeColumn('Users', 'image', {
//                 type: Sequelize.STRING,
//                 allowNull: true,
//             })
//         ])
//     }
// };