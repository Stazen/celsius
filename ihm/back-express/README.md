# IHM EXPRESS API

This API follow the clean architecture pattern, using Express, Typescript and MongoDB with the Mongoose ORM.
Each module get models, interfaces, controllers and services in their respective folders.

API Endpoints documentation is available at: http://{serverIp}/v1/docs (made with Swagger)

### General architecture informations:

Module:

One module represent a data model and his methods to interact with it.
Inside each module, some files are mandatory:

1. `module.model.ts`:
   Represent the model in the database
2. `module.interface.ts`:
   Represent the typed interfaces needed for services and controllers.
3. `module.controller.ts`:
   http handlers called by the endpoints
4. `module.services.ts`:
   Functions called by the controller to interact with the BDD

We do need separation of concern, a controller mustn't interact directly with the bdd, it will call functions coming from the module service.

### How to run the project locally:

You have to install node version >= 18 < 20
You have to install yarn globally, `npm i -g yarn`
Run `yarn` inside **ihm/back-express** folder to install packages
Run `yarn dev` to start the development server

Some `env` variables are mandatory to start the project, please refer to the `.env.example` file
