# Week 0 — Billing and Architecture

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

![Cruddur - Conceptual diagram.png](Week%200%20291005c47de3456fa9b7999f3d7cea5b/Cruddur_-_Conceptual_diagram.png)

[Lucidchart](https://lucid.app/lucidchart/599b486c-576d-4081-96da-43bf3697eab7/edit?viewport_loc=-770%2C-264%2C2586%2C1066%2C0_0&invitationId=inv_5a30abc0-f8f5-45cc-9ade-77fea0e7eece)

- Logical Diagram

![Cruddur - Logical Diagram.png](Week%200%20291005c47de3456fa9b7999f3d7cea5b/Cruddur_-_Logical_Diagram.png)

[Lucidchart](https://lucid.app/lucidchart/4ff4003e-b606-4012-9e39-9e7d8bd326a0/edit?viewport_loc=-236%2C123%2C2582%2C1065%2C0_0&invitationId=inv_8cd4f60b-9b44-4acc-a0ee-7d12a38f69ca)

### Create an IAM admin user

![User list.png](Week%200%20291005c47de3456fa9b7999f3d7cea5b/User_list.png)

![User summary.png](Week%200%20291005c47de3456fa9b7999f3d7cea5b/User_summary.png)

- Generate credentials for the IAM admin user.

![User summary with access key.png](Week%200%20291005c47de3456fa9b7999f3d7cea5b/User_summary_with_access_key.png)

### CloudShell

![Cloud shell.png](Week%200%20291005c47de3456fa9b7999f3d7cea5b/Cloud_shell.png)

### Install AWS CLI

![CLI install.png](Week%200%20291005c47de3456fa9b7999f3d7cea5b/CLI_install.png)

![CLI example.png](Week%200%20291005c47de3456fa9b7999f3d7cea5b/CLI_example.png)

### Budgets

Create t different budgets, one to track credit, and the other to track spending

![Budgets list.png](Week%200%20291005c47de3456fa9b7999f3d7cea5b/Budgets_list.png)

1. **Credit budget**: A 10$ credit budget that sends an email alert to djaballah.djedid@outlook.com when the credit consumption reaches 70%.

```bash
aws budgets create-budget \
    --account-id $AWS_ACCOUNT_ID \
    --budget file://aws/json/credit-budget.json \
    --notifications-with-subscribers file://aws/json/credit-budget-notification.json
```

![Credit budget.png](Week%200%20291005c47de3456fa9b7999f3d7cea5b/Credit_budget.png)

1. **Spending budget**: A 10$ spending budget that sends an email alert to djaballah.djedid@outlook.com when the spending reaches 70% of 10$.

![Spending budget.png](Week%200%20291005c47de3456fa9b7999f3d7cea5b/Spending_budget.png)

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

and finally we create the alarm

```bash
aws cloudwatch put-metric-alarm --cli-input-json file://alarm_config.jso
```

![Billing alarm.png](Week%200%20291005c47de3456fa9b7999f3d7cea5b/Billing_alarm.png)
