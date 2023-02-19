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

![Cruddur - screenshot](week1_assets/Notifications%20page.png)
