# Initial Setup

## Description

## Prerequisites

- AWS Account Keys
- AWS CLI
- Docker installation
- Kubernetes installation
- Terraform installation
- Add all the files from the [environment-builder](https://github.com/kyanvasu/environment_builder) repository to the root of your Kanvas API project.

## Setup AWS CLI

Before deploying your custom environment you need first setup your AWS Account and AWS CLI.

&nbsp;

### ***Download AWS CLI***

Download the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) and follow the necessary steps for the installation

&nbsp;
### ***AWS CLI Configuration Basics***

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
## Setup of the environment

### Changing the locals.tf file

### Changing the values.yaml file