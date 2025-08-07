output "instance_id" {
  description = "The ID of the EC2 instance"
  value       = aws_instance.scheduling_application.id
}

output "key_name" {
  description = "The name of the key pair used for the instance"
  value       = aws_instance.scheduling_application.key_name
  sensitive = true
}
