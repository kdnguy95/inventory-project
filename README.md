# Z-prefix inventory-project

This project is a basic inventory backend database that stores IT relatede equipment and user accounts with a frontend to interact with it. This project uses Docker to run the server.

# How to run

1. Execute the three commands below to get postgres image up running
  `docker pull postgres`
  `mkdir -p $HOME/docker/volumes/postgres`
  `docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 \
-v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres`
