#!/bin/bash

# Quick Deploy Script for vSecureBytes on Digital Ocean
# Usage: ./quick-deploy.sh [domain] [droplet-ip]

set -e

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

DOMAIN=${1:-"vsecurbytes.com"}
DROPLET_IP=${2}

if [[ -z "$DROPLET_IP" ]]; then
    echo -e "${YELLOW}Usage: ./quick-deploy.sh [domain] [droplet-ip]${NC}"
    echo "Example: ./quick-deploy.sh vsecurbytes.com 192.168.1.100"
    exit 1
fi

echo -e "${BLUE}=== vSecureBytes Quick Deployment ===${NC}"
echo "Domain: $DOMAIN"
echo "Server: $DROPLET_IP"
echo

# Step 1: Create deployment package
echo -e "${GREEN}Creating deployment package...${NC}"
tar --exclude='.git' --exclude='node_modules' --exclude='dist' -czf vsecurebytes-deploy.tar.gz .

# Step 2: Upload to server
echo -e "${GREEN}Uploading to server...${NC}"
scp vsecurebytes-deploy.tar.gz deploy@$DROPLET_IP:/home/deploy/

# Step 3: Deploy on server
echo -e "${GREEN}Running deployment on server...${NC}"
ssh deploy@$DROPLET_IP << EOF
cd /home/deploy
tar -xzf vsecurebytes-deploy.tar.gz
cd /home/deploy
chmod +x deploy.sh
sed -i 's/DOMAIN="vsecurbytes.com"/DOMAIN="$DOMAIN"/' deploy.sh
./deploy.sh
EOF

# Cleanup
rm vsecurebytes-deploy.tar.gz

echo -e "${GREEN}Deployment completed!${NC}"
echo "Your website should be available at: http://$DOMAIN"
echo
echo "Next steps:"
echo "1. Point your domain DNS to: $DROPLET_IP"
echo "2. Wait for DNS propagation (up to 24 hours)"
echo "3. Access your site at https://$DOMAIN"