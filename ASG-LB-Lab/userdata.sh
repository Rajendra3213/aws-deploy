#!/bin/bash
# Update packages
apt update -y

# Install Nginx
apt install -y nginx

# Start and enable Nginx
systemctl start nginx
systemctl enable nginx

# Fetch EC2 metadata
TOKEN=$(curl -X PUT "http://169.254.169.254/latest/api/token" \
  -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
AZ=$(curl -H "X-aws-ec2-metadata-token: $TOKEN" \
  -s http://169.254.169.254/latest/meta-data/placement/availability-zone)
INSTANCE_ID=$(curl -H "X-aws-ec2-metadata-token: $TOKEN" \
  -s http://169.254.169.254/latest/meta-data/instance-id)

# Create HTML file
cat > /var/www/html/index.html << EOF
<!DOCTYPE html>
<html>
<head>
   <title>EC2 Instance Info</title>
</head>
<body>
   <h1>EC2 Instance Information</h1>
   <p><strong>Availability Zone:</strong> $AZ</p>
   <p><strong>Instance ID:</strong> $INSTANCE_ID</p>
</body>
</html>
EOF

# Adjust permissions (in case default user is www-data)
chown www-data:www-data /var/www/html/index.html

# Restart Nginx to ensure changes are applied
systemctl restart nginx
