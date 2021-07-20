# Initial Setup

## ***Description***

Setting up new environments for testing and production purposes has always been hard. The struggle of setting them up and deploying them fast is a monumental effort to be made between developers and devops. As a solution, a builder was made to make it really easy for any team member to deploy custom environments.

## ***Prerequisites***

- AWS Account Keys
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) installation
- [Docker Desktop](https://www.docker.com/products/docker-desktop) installation
- [Kubernetes](https://kubernetes.io/releases/download/) installation
- [Terraform](https://www.terraform.io/downloads.html) installation
- Add all the files from the [environment-builder](https://github.com/kyanvasu/environment_builder) repository to the root of your Kanvas API project.

&nbsp;

## ***Setup AWS CLI***

Before deploying your custom environment you need first setup your AWS Account and AWS CLI.

&nbsp;

### Download AWS CLI

Download the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) and follow the necessary steps for the installation

&nbsp;
### AWS CLI Configuration Basics

For this step you will need your AWS Account Keys which can be created and retrieved from AWS IAM. The following link [Configuration basics](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html) provides a detailed configuration process for AWS CLI using the keys mentioned before.

&nbsp;

### To change AWS CLI Profile

To change between AWS CLI profiles use the following commands:

#### Linux and Mac OS
``` sh 
export AWS_PROFILE=user1
```

#### Windows OS

```sh
setx AWS_PROFILE user1
```
***Notice:*** the value of the user1 is the name of the AWS CLI Profile

&nbsp;

## ***Setup of the environment***

### Changing the ```locals.tf``` file

The ```locals.tf``` file contains all the values for the environment builder with terraform. Change them as you like for your environment. Furthermore, is a brief description of every field:

* ***eks_cluster_name*** : 
    * description : Name of the Kubernetes Cluster in AWS EKS.
    * example : `crm-api`
* ***eks_namespace_name*** : 
    * description : Name of the Kubernetes environment namespace.
    * example : `development` or `staging` or whatever you like.
* ***_k8s_service_account_name*** : 
    * description : Name of the Kubernetes service account.
* ***_k8s_service_account_autoscaler*** : 
    * description : Name of the Kubernetes autoscaler account.
* ***helm_chart_name*** : 
    * description : Name of the Helm Chart in the Kubernetes Cluster.
    * example : `crm-api`
* ***aws_ecr_repo_name*** : 
    * description : Name of the AWS ECR repository.
    * example : `crm-api`
* ***aws_ecr_image_tag*** : 
    * description : Name of the tag for AWS ECR repository image.
    * example : `latest` or `develop`
* ***aws_region*** : 
    * description : AWS Region Name.
    * example : `us-east-1`
* ***aws_account_id*** : 
    * description : Your AWS Acccount Id.
    * example : `23445343455`
* ***_aws_ecr_login_command*** : 
    * description : Default AWS login command for Docker Login in AWS ECR.
* ***_docker_tag_command*** : values for pushing.
    * description : Default docker tag command to tag a docker image with AWS ECR 
* ***_ecr_push_command*** : 
    * description : Default AWS command to push a local docker image to AWS ECR.
* ***_ecr_repo_uri*** : 
    * description : AWS ECR Repository URI.
* ***aws_env_s3_bucket_name*** : 
    * description : AWS S3 bucket name where the environment values are stored.
    * example : `crmapi-cluster`
* ***aws_env_s3_bucket_prefix_key*** : 
    * description : AWS S3 bucket path to environment values file.
    * example : `/crm-api-dev/salesassist_dev` where `salesassist_dev` is the name of the file.

**Warning**: Fields prefixed with  `_`  should not be changed.

### Changing the ```values.yaml``` file

The ```values.yaml``` file contains all the values for the kubernetes pods and other resources. Change them as you like for your environment. Furthermore, is a brief description of every field:

#### General values
* namespace : Name of the namespace in the Kubernetes Cluster.
* apiImage : API Image used for the api and queue pods. This could be empty since the image is created when terraform runs.

#### PHP values
* memoryLimit : Memory limit for php fpm.

#### Services Values

* loadBalancer
    * name : Load Balancer Name
    * appName : The name of the app it belongs to in Kubernetes.
    * annotations : Any other options to add to the load balancer.
        * sslCert: ARN of a custom SSL Certificate in AWS.

#### Pods values

There are two sections here, one for the api and one for queues, each of them has their own values for their pods.

##### ***API pod values***
* api :
    * name : Name of the pod
    * containerName : Name of the container inside de pod.

##### ***Queue pods values***
* jobs :
    * name : Name of the jobs queue pod
    * containerName : Name of the container inside de pod.
* events :
    * name : Name of the events queue pod
    * containerName : Name of the container inside de pod.
* notifications :
    * name : Name of the notifications queue pod
    * containerName: Name of the container inside de pod.
* workflows : 
    * name : Name of the workflows queue pod
    * containerName : Name of the container inside de pod.