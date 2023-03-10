# Week 0

## Introduction

In this document, I’ll describe my solutions to the Week 0 homework of the free AWS cloud project boot camp.

### Requirements

- An ephemeral microblogging platform
- Create expiring posts within a time period
- Share content
- Scalable
- An external authentication system
- Engaging an interacting
- Aws cost optimized
- frontend: Javascript && React
- backend: Api with python && flask

### Architecture

- Conceptual diagram

![Cruddur - Conceptual diagram.png](week0_assets/Cruddur%20-%20Conceptual%20diagram.png)

[Lucidchart](https://lucid.app/lucidchart/599b486c-576d-4081-96da-43bf3697eab7/edit?viewport_loc=-770%2C-264%2C2586%2C1066%2C0_0&invitationId=inv_5a30abc0-f8f5-45cc-9ade-77fea0e7eece)

- Logical Diagram

![Cruddur - Logical Diagram.png](week0_assets/Cruddur%20-%20Logical%20Diagram.png)

[Lucidchart](https://lucid.app/lucidchart/4ff4003e-b606-4012-9e39-9e7d8bd326a0/edit?viewport_loc=-236%2C123%2C2582%2C1065%2C0_0&invitationId=inv_8cd4f60b-9b44-4acc-a0ee-7d12a38f69ca)

### Create an IAM admin user

![User list.png](week0_assets/User%20list.png)

![User summary.png](week0_assets/User%20summary.png)

- Generate credentials for the IAM admin user.

![User summary with access key.png](week0_assets/User%20summary%20with%20access%20key.png)

### CloudShell

![Cloud shell.png](week0_assets/Cloud%20shell.png)

### Install AWS CLI

![CLI install.png](week0_assets/CLI%20install.png)

![CLI example.png](week0_assets/CLI%20example.png)

### Budgets

Create t different budgets, one to track credit, and the other to track spending

![Budgets list.png](week0_assets/Budgets%20list.png)

1. **Credit budget**: A 10$ [credit budget](https://github.com/djaballah/aws-bootcamp-cruddur-2023/blob/main/aws/json/credit-budget.json) that sends an email alert to djaballah.djedid@outlook.com when the credit consumption reaches 70%. ([budgets-notification.json](https://github.com/djaballah/aws-bootcamp-cruddur-2023/blob/main/aws/json/budgets-notification.json))

```bash
aws budgets create-budget \
    --account-id $AWS_ACCOUNT_ID \
    --budget file://aws/json/credit-budget.json \
    --notifications-with-subscribers file://aws/json/budgets-notification.json
```

![Credit budget.png](week0_assets/Credit%20budget.png)

2. **Spending budget**: A 10$ [spending budget](https://github.com/djaballah/aws-bootcamp-cruddur-2023/blob/main/aws/json/spending-budget.json) that sends an email alert to djaballah.djedid@outlook.com when the spending reaches 70% of 10$. ([budgets-notification.json](https://github.com/djaballah/aws-bootcamp-cruddur-2023/blob/main/aws/json/budgets-notification.json))

```bash
aws budgets create-budget \
    --account-id $AWS_ACCOUNT_ID \
    --budget file://aws/json/spending-budget.json \
    --notifications-with-subscribers file://aws/json/budgets-notification.json
```

![Spending budget.png](week0_assets/Spending%20budget.png)

### Billing alarm

to create a billing alarm, first we need to create a topic

```bash
aws sns create-topic --name billing-alarm
```

Then, subscribe to that topic

```bash
aws sns subscribe \
    --topic-arn arn:aws:sns:eu-west-3:745258917926:billing-alarm \
    --protocol email \
    --notification-endpoint djaballah.djedid@outlook.com
```

and finally we create the [alarm](https://github.com/djaballah/aws-bootcamp-cruddur-2023/blob/main/aws/json/alarm_config.json)

```bash
aws cloudwatch put-metric-alarm --cli-input-json file://alarm_config.json
```

![Billing alarm.png](week0_assets/Billing%20alarm.png)

## Homework challenges

In this section, I'll list the homework challenges that I implemented.

### Event Bridge

In this homework, I used event bridge with sns to send a notification email when an aws health event occur in aws bridge event.
Here are the steps I followed:

1. Create an sns topic

    ```
    aws sns create-topic --name health-alarm 
    ```

2. Subscribe to the previously created sns topic

    ```
    aws sns subscribe \
            --topic-arn arn:aws:sns:eu-west-3:745258917926:health-alarm \
            --protocol email \
            --notification-endpoint djaballah.djedid@outlook.com
    ```

3. Create a rule with an aws health pattern to capture health events from all services ([aws_services_health_event_bridge_rule.json](https://github.com/djaballah/aws-bootcamp-cruddur-2023/blob/main/aws/json/aws_services_health_event_bridge_rule.json))

    ```
    aws events put-rule --cli-input-json file://aws/json/aws_services_health_event_bridge_rule.json
    ```

4. Assign the sns topic **health-alarm** as a target to the **AWS-services-health-rule** event bridge rule  ([aws_services_health_event_bridge_target.json](https://github.com/djaballah/aws-bootcamp-cruddur-2023/blob/main/aws/json/aws_services_health_event_bridge_target.json)) 

    ```
    aws events put-targets --cli-input-json file://aws/json/aws_services_health_event_bridge_target.json
    ```

Here is the result

![Aws services health event bridge rule](week0_assets/Aws%20services%20health%20event%20bridge%20rule.png)

## Healthcheck in the V3 Docker compose file

Healtch check is a way for a docker compose service to set it's health status and indicate to other docker services wheter it's healthy or not. In this challenge we are going to implement a health check for the backend service, this was done in two steps:
1. Implement a healtch check endpoint in the backend service, that always return the http status code 200 when the app is running:
    ```
    @app.route("/healthy", methods=['GET'])
    def health_check():
      return {}, 200
    ```
2. Implement healthcheck in the backend service in the docker compose file:
    ```
    healthcheck:
      test: curl --fail http://localhost:4567/healthy
      interval: 10s
      timeout: 3s
      retries: 3
      start_period: 5s
    ```

What this is basically doing, is that when the backend service start, the command
```
curl --fail http://localhost:4567/healthy
```
will be regularely executed (every 10s), if this command succeed and return an exist code equal to 0 within 3 seconds the docker container will be considered as healthy, if the command failed for 3 consecutive times the docker will be in an unhealthy state.
</br>
What this healthcheck will allows to do, is to set a deterministic booting order for our services. So we can make the frontend service only start when the backend service is in a healthy state, this can be done with the docker compose **depends_on** which was implemented this way in the docker compose frontend service:
```
depends_on:
  backend-flask:
    condition: service_healthy
```

This challenge was implemented in these two commits:
- [Commit 1](https://github.com/djaballah/aws-bootcamp-cruddur-2023/commit/a191855e0d33aaa7c517edbf1e1338dd0d5e2c67)
- [Commit 2](https://github.com/djaballah/aws-bootcamp-cruddur-2023/commit/28d923ae9d9f17bf56402249efb3baf1640b322e)
