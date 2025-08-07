variable "access_key" {
  description = "AWS Access Key"
  type        = string
  default = ""
}

variable "secret_key" {
  description = "AWS Secret Key"
  type        = string
  default = ""
}

variable "region" {
  description = "AWS Region"
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "Type of EC2 instance"
  type        = string
  default     = "t2.micro"
  
}
variable "key_name" {
  description = "Name of the key pair to use for the instance"
  type        = string
  default     = "your-key-pair-name" # Replace with your key pair name
  
}

variable "tags" {
  type = string
  default = "ec2 test"
}