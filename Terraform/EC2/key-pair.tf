
resource tls_private_key "ec2_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "name" {
    key_name   = var.key_name
    public_key = tls_private_key.ec2_key.public_key_openssh # Adjust the path to your public key
}

resource "local_file" "private_key_pem" {
  content              = tls_private_key.ec2_key.private_key_pem
  filename             = "${path.module}/scheduling_application_key.pem"
  file_permission      = "0400"
  directory_permission = "0700"
}
