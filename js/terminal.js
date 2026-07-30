$ ssh ubuntu@aws-prod

Connected.

$ kubectl get pods

bank-api-746d9 Running

redis Running

mysql Running

$ docker compose up -d

Creating network...

Done.

$ terraform apply

Apply complete!

Resources: 8 added.

$ gh workflow run deploy.yml

✓ Deployment successful
