output "instance_id" {
  description = "The ID of the EC2 instance"
  value       = aws_instance.scheduling_application.id
}

output "key_name" {
  description = "The name of the key pair used for the instance"
  value       = aws_instance.scheduling_application.id
  sensitive = false
}
output "instance_public_ip" {
  description = "The public IP address of the EC2 instance"
  value       = aws_instance.scheduling_application.public_ip
} 

output "private_key_path" {
  description = "The path to the private key file"
  value       = local_file.private_key_pem.filename
  sensitive = true

}

output "vpc_id" {
  description = "The VPC ID where the instance is deployed"
  value       = aws_instance.scheduling_application.vpc_security_group_ids
}