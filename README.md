# Z-prefix inventory-project

This project is a basic inventory backend database that stores IT relatede equipment and user accounts with a frontend to interact with it. This project uses Docker to run the server.

# Features
- Account creation
- Inventory tracking and management
- Authentication

# How to run
1. Clone this repo
2. Execute the three commands below to get postgres image up running
   - `docker pull postgres`
   - `mkdir -p $HOME/docker/volumes/postgres`
   - `docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 \ -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres`
3. Identify your postgres container ID with `docker ps -a` and switch to Docker image shell with `docker exec -it <PSQL-Container-ID> bash`
4. Log into your postgres shell with `psql -U postgres` and create your `inventory` database with `CREATE DATABASE inventory;`
5. Enter `/server` folder and run `npm install`
6. Run `npm run reset` to reset migration files and set the table seeds
7. Run `npm start` to start the database server
8. In a new CLI, enter the `/website` folder and run `npm install`
9. Run `npm start` to start the website


