# Week 2 — Distributed Tracing

## Instrument Honeycomb with OTEL

In this challenge, I was able to implement honeycomb instrumentation to the backend-flask service.
</br>
See: [commit](https://github.com/djaballah/aws-bootcamp-cruddur-2023/commit/0ded95d137c990ee427fb5968acbfa81828d39a8)
![Honeycomb instrumentation screenshot](week2_assets/Honeycomb%20backend-flask.png)

## Create a custom honeycomb span for the home/activities endpoint.

In this challenge, I create a cusomt honeycomb spand with custom attributes in the home/activities endpoint.
</br>
See: [commit](https://github.com/djaballah/aws-bootcamp-cruddur-2023/commit/2ab3196061bba334c644fee2858cedbed5f0fb1c)
![Honeycomb instrumentation screenshot](week2_assets/Honeycomb%20custom%20span.png)

## Instrument AWS X-Ray
In this challenge I implemented X-ray instrumentation.
</br>
See: [commit](https://github.com/djaballah/aws-bootcamp-cruddur-2023/commit/817fcfacced0903bf8ca05c1a0d3f4c02f2f756d)
![X-ray instrumentation screenshot](week2_assets/X-ray%20instrumentation.png)

## Implement an X-ray custom segment for the user activities endpoint
In this challenge I implemented a custom segment with the attirbute `now` for the user activities endpoint.
</br>
See: [commit](https://github.com/djaballah/aws-bootcamp-cruddur-2023/commit/5ad6ced39348975629b3cc29f195dbcfc23735c8)
![X-ray custom segment instrumentation screenshot](week2_assets/X-ray%20custom%20trace.png)

## Configure custom logger to send to CloudWatch Logs
In this challenge, I implemented a custom logger to send logs to cloudwatch logs.
</br>
See: [commit](https://github.com/djaballah/aws-bootcamp-cruddur-2023/commit/005c7326d93dfda780b90f0d5228a7abf783c1cd)
![Cloudwatch logs](week2_assets/Cloud%20watch%20logs.png)

## Integrate Rollbar and capture errors
In this challenge, I intergrated rollbar to capture and log errors.
</br>
See: [commit](https://github.com/djaballah/aws-bootcamp-cruddur-2023/commit/7ebfb4744432f66159798582dc1568f8df7e3fb8)
![Rollbar screenshot](week2_assets/Rollbar.png)
![Rollbar error screenshot](week2_assets/Rollbar%20error.png)
