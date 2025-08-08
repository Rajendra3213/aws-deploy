data "aws_vpc" "default" {
  default = true
}

resource "aws_security_group" "name" {
    name        = var.security_group_name
    description = "Security group for EC2 instance"
    vpc_id      = data.aws_vpc.default.id
    
    ingress {
        from_port   = 22
        to_port     = 22
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"] # Allow SSH from anywhere, adjust as needed"]
    }
}