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

## Implement Dockerfile best practices

In this challenge I'll try to implement some best practices from the [official Dockerfile best practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/).

1. .dockerignore

    When building a docker image, docker will take all the files in the directory used for the build and use them as
    the build context. But many times, some of those files are not required for building the image which will result
    in a more build time and an unnecessary larger docker images.
    </br>
    To solve this, we can use `.dockerignore`, that is a file we can create in the same directory as the one we 
    are using for building the images, and put in it some ignore rules to exclude irrelevant files from the build
    context.
    </br>
    </br>
    To build our backend image, the files `.gitignore, .dockerignore, .env.example, openapi-3.0.yml, README.md` are not needed,
    thus they will be excluded with the `.dockerignore`
    </br>
    To build our frontend image, the files `.gitignore, .dockerignore, .env.example, README.md` are not needed,
    thus they will be excluded with the `.dockerignore`.
    </br>
    </br>
    This challenge is implemented in this two commits:
    - [Commit 1](https://github.com/djaballah/aws-bootcamp-cruddur-2023/commit/6cc46b6dc454c3b3b88598ac0a2924d492bf464f)
    - [Commit 2](https://github.com/djaballah/aws-bootcamp-cruddur-2023/commit/9bd8099754c57f9104f8d9e6592ba921afd44b3b)

2. Minimize the number of layers

    The instructions `RUN`, `COPY` and `ADD` create layers which can increase the size of the final image. We can
    apply some best practices to minimize created layers, such as combining multiple RUN and COPY instructions
    when possible.
    </br>
    I'll try to apply these best practices in the backend Dockefile.
    1. Remove the `COPY requirements.txt requirements.txt` instruction, and move the command `COPY . .` before
       installing the requiremnts, since requirements.txt will also be be copied with this instruction.
    2. Combine the two `RUN` commands into one command.

    This was implemented in this [commit](https://github.com/djaballah/aws-bootcamp-cruddur-2023/commit/e2788c02bda9573d5767c3985374739046bef479)
    
## Install docker and run the app in my local machine

In this challenge I tried to install docker and run the containers in my local machine. I was able to achieve this throught the following steps:
1. Installing the docker in my local machine following the instruction from the offcial docker website [Installation tutorial](https://docs.docker.com/engine/install/ubuntu/)
2. Clone my aws-bootcamp-cruddur-2023 repository
    ```bash
    git clone https://github.com/djaballah/aws-bootcamp-cruddur-2023.git
    ```
3. Update the environment variable in the docker compose file
    ```
      backend-flask:
        environment:
          FRONTEND_URL: http://localhost:3000 
          BACKEND_URL: http://localhost:4567
      frontend-react-js:
        environment:
          REACT_APP_BACKEND_URL: http://localhost:4567
    ```
4. Then run the containers
    ```
    sudo docker compose up
    ``` 
And I had the application running smoothly
![Crudder running locally](https://github.com/djaballah/aws-bootcamp-cruddur-2023/blob/main/journal/week1_assets/Local%20crudder.png)
    
