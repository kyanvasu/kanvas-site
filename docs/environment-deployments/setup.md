# Initial Setup

## ***Description***

Setting up new environments for testing and production purposes has always been hard. The struggle of setting them up and deploying them fast is a monumental effort to be made between developers and devops. As a solution, a builder was made to make it really easy for any team member to deploy custom environments.

## ***Prerequisites***

- AWS Account Keys
- AWS CLI
- Docker installation
- Kubernetes installation
- Terraform installation
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

* k8s_service_account_name
* k8s_service_account_autoscaler
* eks_api_name
* eks_environment_name
* aws_ecr_repo_name
* aws_ecr_image_tag
* aws_region
* aws_account_id
* aws_ecr_login_command 
* docker_tag_command
* ecr_push_command
* ecr_repo_uri
* aws_env_s3_bucket_name 
* aws_env_s3_bucket_prefix_key

### Changing the ```values.yaml``` file

The ```values.yaml``` file contains all the values for the kubernetes pods and other resources. Change them as you like for your environment. Furthermore, is a brief description of every field:

*