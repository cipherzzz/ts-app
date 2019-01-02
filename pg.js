var typeorm = require("typeorm");
var Widget = require("./api/database/entities/widget.js");

typeorm.createConnection({
    type: "postgres",
    username: "postgres",
    password: "admin",
    name: name,
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [
        Widget
    ]
}).then(connection => {
    const projectRepository = connection.getRepository(Widget);
    console.log("Connection has established: ", projectRepository);
  }).catch(error => console.log(error));