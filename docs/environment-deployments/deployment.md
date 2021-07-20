# Deploying the development environment

## Initial Command

Before executing any terraform commands, you need to have terraform CLI installed and be inside the terraform folder in order for the commands to work.

### Terraform Init

The first command to execute is the following: 
```sh 
terraform init 
```

This command downloads and prepares all the packages necessary for terraform project to work.

## Deployment Command

The command to actually deploy all the elements of the environment is:

```sh
terraform apply
```

The process should take about 25 minutes to complete. What terraform is basically doing is creating and configurating everything that is necessary for the custom environment to work. From the AWS EC2 instance and load balancers to the Kubernetes Cluster itself with all the pods running.

## Connecting to the Kubernetes Cluster

To connect to the Kubernetes Cluster you will to logging via the AWS Cli command:

```sh
aws eks --region us-east-1 update-kubeconfig --name name_of_cluster
```

The name of the cluster is the same used in the `locals.tf` file on the field `eks_cluster_name`.

## Checking that everything is working correctly

After connecting to the Kubernetes Cluster using the command mentioned in the previous section, use the following commands to:

### Check that all pods are running

```sh
kubectl get pods -n namespace
```

Where namespace could be `development` or `staging` or whatever you want.

The namespace for your cluster is defined on the `eks_namespace_name` in the `locals.tf` file.

the output of the command should be something like this:

```sh
NAME                                   READY   STATUS    RESTARTS   AGE
api-95f787698-kzxnm                    2/2     Running   0          84m
events-queue-86d84d7dd7-2ml2f          1/1     Running   4          19h
jobs-queue-5d4ff7645b-7bn59            1/1     Running   5          19h
notifications-queue-766dcd95fb-r9mgb   1/1     Running   4          19h
workflows-queue-68f6f97bc6-8ktcg       1/1     Running   4          19h
```

### Check if the Load Balancer is running

```sh
kubectl get services -n namespace
```
Where namespace could be `development` or `staging` or whatever you want.

the output of the command should be something like this:

```sh
NAME      TYPE           CLUSTER-IP      EXTERNAL-IP                                                               PORT(S)                      AGE
alb-api   LoadBalancer   10.100.191.46   a5570e060fd6742368c3cb8ab6db4089-1490387668.us-east-1.elb.amazonaws.com   80:30183/TCP,443:30869/TCP   20h
```


## Kubernetes GUI using Lens

Alternatively, you can use a GUI to connect and manage your Kubernetes Cluster. For that, you will need to download [Lens](https://k8slens.dev/)