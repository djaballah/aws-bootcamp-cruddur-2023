# Week 1 — App Containerization

## Creating Docker files

I created two docker files:
 - [Backend docker file](https://github.com/djaballah/aws-bootcamp-cruddur-2023/blob/main/backend-flask/Dockerfile).
 - [Frontend docker file](https://github.com/djaballah/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/Dockerfile).

I created the docker-compose file:
 - [Docker compose file](https://github.com/djaballah/aws-bootcamp-cruddur-2023/blob/main/docker-compose.yml).

I was able to run the application with these commands:
```bash
npm install
docker compose up
```

And here is screenshot of the running application

![Cruddur - screenshot](week1_assets/Crudder%20running%20screenshot.png)

## Implementing notifications

In order to implement notifications, we need to implemend an endpoint api on the backend and a page to lists
the notifications in the frontend. I implemented this in the following steps:
- Adding the notifications endpoint specifications to the openApi file. ([Commit](https://github.com/djaballah/aws-bootcamp-cruddur-2023/commit/be13c0ddded3b14cfac82519ac86dcd088254d51))
- Implementing the notifications endpoint on the backend. ([Commit](https://github.com/djaballah/aws-bootcamp-cruddur-2023/commit/3f19ffc3bc24e66d072fa4f5c4e07660317b428b))
- Implementing the notifications page in the frontend. ([Commit](https://github.com/djaballah/aws-bootcamp-cruddur-2023/commit/b5c435a1bbbc84552711ac2fb566af9d5f2809e6))

And here is screenshot of the notifications page

![Notification page](week1_assets/Notifications%20page.png)

## Creating DynamoDB local && PostgreSql docker images.

Add the configuration for DynamoDB local && PostgreSql docker images to the project docker compose file. ([Commit](https://github.com/djaballah/aws-bootcamp-cruddur-2023/commit/575ec0838b68ddb89d8ae61e4c0b2134f4c8d370)).

And check that the their docker containers are correctly set up and running.
![Dynamodb local docker screenshot](week1_assets/Dynamodb%20local%20docker%20screenshot.png)
![Postgres docker screenshot.png](week1_assets/Postgres%20docker%20screenshot.png)

## Run the dockerfile CMD as an external script

CMD can be used to run external script. I did this by creating two shell scripts that are going to be used with CMD to start the backend and frontend applications.

- Backend start_script.sh

```bash
#!/bin/bash

python3 -m flask run --host=0.0.0.0 --port=4567
```

- Frontend start_script.sh

```bash
#!/bin/bash

npm start
```

The backend and frontend Docker files have been updated accordingly to run those scripts

- Backend Dockerfile

```
CMD ["/backend-flask/start_script.sh"]
```

- Frontend Dockerfile

```
CMD ["/frontend-react-js/start_script.sh"]
```

This was implemented in these two commits:
- [Commit 1](https://github.com/djaballah/aws-bootcamp-cruddur-2023/commit/dba887f007f4cecb25db2161ea3debe4effa588b)
- [Commit 2](https://github.com/djaballah/aws-bootcamp-cruddur-2023/commit/1635319c6041334dc38d9454a90d891817812bea)

## Push and tag an image to DockerHub

In this challenge, it was requested to push and tag an image to DockerHub, I achived this through the following steps:

1. Login to my DockerHub account
2. Create a repository name **free-aws-cloud-project-bootcamp**
3. Build the backend docker image and tag it with **djaballah/free-aws-cloud-project-bootcamp:backend-image-dev**
    ```bash
    docker build -t djaballah/free-aws-cloud-project-bootcamp:backend-image-dev ./backend-flask
    ```
4. Push the backend docker image to dockerHub
    ```bash
    docker push djaballah/free-aws-cloud-project-bootcamp:backend-image-dev
    ````
5. Build the frontend docker image and tag it with **djaballah/free-aws-cloud-project-bootcamp:frontend-image-dev**
    ```bash
    docker build -t djaballah/free-aws-cloud-project-bootcamp:frontend-image-dev ./frontend-react-js/
    ```
6. Push the frontend docker image to dockerHub
    ```bash
    docker push djaballah/free-aws-cloud-project-bootcamp:frontend-image-dev
    ```
At first when I tried to push the backend image after I build it, I had a permission denied error
```bash
denied: requested access to the resource is denied
```
This is because, in order to push we need to login to our dockerhub through the cli, I did it this way
```bash
docker login -u {DOCKER_HUB_USERNAME} -p {DOCKER_HUB_PASSWORD}
```

You can find the docker images in my [docker hub repository](https://hub.docker.com/repository/docker/djaballah/free-aws-cloud-project-bootcamp/general).
