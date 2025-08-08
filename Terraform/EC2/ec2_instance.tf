terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

provider "aws" {
  region = var.region
  access_key = var.access_key
  secret_key = var.secret_key
}

data "aws_ami" "latest_amazon_linux" {
  most_recent = true
  owners = ["099720109477"] # Canonical
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
   filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}


resource "aws_instance" "scheduling_application" {
    ami =  data.aws_ami.latest_amazon_linux.id
    instance_type = var.instance_type
    key_name =  aws_key_pair.name.key_name
    security_groups = [aws_security_group.name.name]
    tags = {
    Name = "HelloWorld"
  }
}

# Save the private key to a local file




