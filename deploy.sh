#!/bin/bash

# vSecureBytes Website Deployment Script for Digital Ocean Ubuntu
# This script handles end-to-end deployment including server setup, domain configuration, and SSL

set -e  # Exit on any error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DOMAIN="vsecurbytes.com"
PROJECT_NAME="vsecurebytes"
APP_PORT="5000"
NGINX_PORT="80"
SSL_PORT="443"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if running as root
check_root() {
    if [[ $EUID -eq 0 ]]; then
        print_error "This script should not be run as root for security reasons."
        print_status "Please run as a regular user with sudo privileges."
        exit 1
    fi
}

# Function to check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    # Check if user has sudo privileges
    if ! sudo -n true 2>/dev/null; then
        print_error "This script requires sudo privileges."
        exit 1
    fi
    
    # Check internet connectivity
    if ! ping -c 1 google.com &> /dev/null; then
        print_error "No internet connection available."
        exit 1
    fi
    
    print_success "Prerequisites check passed."
}

# Function to update system
update_system() {
    print_status "Updating system packages..."
    sudo apt update && sudo apt upgrade -y
    print_success "System updated successfully."
}

# Function to install Node.js 20
install_nodejs() {
    print_status "Installing Node.js 20..."
    
    # Remove existing Node.js if present
    sudo apt remove -y nodejs npm 2>/dev/null || true
    
    # Install Node.js 20 via NodeSource repository
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
    
    # Verify installation
    node_version=$(node --version)
    npm_version=$(npm --version)
    
    print_success "Node.js $node_version and npm $npm_version installed successfully."
}

# Function to install system dependencies
install_dependencies() {
    print_status "Installing system dependencies..."
    
    sudo apt install -y \
        nginx \
        ufw \
        certbot \
        python3-certbot-nginx \
        git \
        curl \
        wget \
        unzip \
        build-essential \
        htop \
        fail2ban \
        postgresql \
        postgresql-contrib \
        redis-server \
        pm2
    
    print_success "System dependencies installed successfully."
}

# Function to setup PostgreSQL database
setup_postgresql() {
    print_status "Setting up PostgreSQL database..."
    
    # Start and enable PostgreSQL
    sudo systemctl start postgresql
    sudo systemctl enable postgresql
    
    # Generate secure password
    DB_PASSWORD="vsecure_$(openssl rand -base64 16 | tr -d '/+=' | head -c 16)"
    
    # Create database and user
    sudo -u postgres psql << EOF
CREATE DATABASE ${PROJECT_NAME}_db;
CREATE USER ${PROJECT_NAME}_user WITH ENCRYPTED PASSWORD '$DB_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE ${PROJECT_NAME}_db TO ${PROJECT_NAME}_user;
ALTER USER ${PROJECT_NAME}_user CREATEDB;
\q
EOF
    
    # Set global DATABASE_URL for use in other functions
    DATABASE_URL="postgresql://${PROJECT_NAME}_user:${DB_PASSWORD}@localhost:5432/${PROJECT_NAME}_db"
    
    print_success "PostgreSQL database configured successfully."
}

# Function to setup Redis for session storage
setup_redis() {
    print_status "Setting up Redis for session storage..."
    
    sudo systemctl start redis-server
    sudo systemctl enable redis-server
    
    # Configure Redis for production
    sudo tee -a /etc/redis/redis.conf > /dev/null << EOF

# Production settings
maxmemory 256mb
maxmemory-policy allkeys-lru
save 900 1
save 300 10
save 60 10000
EOF
    
    sudo systemctl restart redis-server
    
    print_success "Redis configured successfully."
}

# Function to configure firewall
configure_firewall() {
    print_status "Configuring UFW firewall..."
    
    sudo ufw --force reset
    sudo ufw default deny incoming
    sudo ufw default allow outgoing
    sudo ufw allow ssh
    sudo ufw allow 80/tcp
    sudo ufw allow 443/tcp
    sudo ufw allow $APP_PORT/tcp
    sudo ufw --force enable
    
    print_success "Firewall configured successfully."
}

# Function to create application user
create_app_user() {
    print_status "Creating application user..."
    
    if ! id "$PROJECT_NAME" &>/dev/null; then
        sudo useradd -m -s /bin/bash $PROJECT_NAME
        sudo usermod -aG www-data $PROJECT_NAME
        print_success "User $PROJECT_NAME created successfully."
    else
        print_warning "User $PROJECT_NAME already exists."
    fi
}

# Function to setup application directory
setup_app_directory() {
    print_status "Setting up application directory..."
    
    APP_DIR="/home/$PROJECT_NAME/app"
    sudo mkdir -p $APP_DIR
    sudo chown -R $PROJECT_NAME:$PROJECT_NAME /home/$PROJECT_NAME
    
    print_success "Application directory created at $APP_DIR"
}

# Function to clone and setup application
setup_application() {
    print_status "Setting up vSecureBytes application..."
    
    APP_DIR="/home/$PROJECT_NAME/app"
    
    # Copy current directory contents to app directory
    sudo cp -r . $APP_DIR/
    sudo chown -R $PROJECT_NAME:$PROJECT_NAME $APP_DIR
    
    # Create environment file with database configuration
    sudo -u $PROJECT_NAME tee $APP_DIR/.env > /dev/null << EOF
NODE_ENV=production
PORT=$APP_PORT
DATABASE_URL=$DATABASE_URL
REDIS_URL=redis://localhost:6379
SESSION_SECRET=$(openssl rand -base64 32)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
CONTACT_EMAIL=contact@$DOMAIN
EOF
    
    # Switch to app user and install dependencies
    sudo -u $PROJECT_NAME bash << EOF
cd $APP_DIR
npm install --production
npm run build
npm run db:push 2>/dev/null || echo "Database migration skipped"
EOF
    
    print_success "Application setup completed."
}

# Function to create systemd service
create_systemd_service() {
    print_status "Creating systemd service..."
    
    sudo tee /etc/systemd/system/$PROJECT_NAME.service > /dev/null << EOF
[Unit]
Description=vSecureBytes Website
After=network.target postgresql.service redis-server.service
Wants=postgresql.service redis-server.service

[Service]
Type=simple
User=$PROJECT_NAME
WorkingDirectory=/home/$PROJECT_NAME/app
ExecStart=/usr/bin/node dist/index.js
Restart=always
RestartSec=10
EnvironmentFile=/home/$PROJECT_NAME/app/.env

# Resource limits
LimitNOFILE=65536
LimitNPROC=4096

# Security settings
NoNewPrivileges=true
PrivateTmp=true
ProtectHome=true
ProtectSystem=strict
ReadWritePaths=/home/$PROJECT_NAME/app
ReadWritePaths=/tmp

[Install]
WantedBy=multi-user.target
EOF
    
    sudo systemctl daemon-reload
    sudo systemctl enable $PROJECT_NAME
    
    print_success "Systemd service created and enabled."
}

# Function to configure Nginx
configure_nginx() {
    print_status "Configuring Nginx..."
    
    # Remove default Nginx site
    sudo rm -f /etc/nginx/sites-enabled/default
    
    # Create Nginx configuration
    sudo tee /etc/nginx/sites-available/$PROJECT_NAME > /dev/null << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss;
    
    # Rate limiting
    limit_req_zone \$binary_remote_addr zone=api:10m rate=10r/s;
    
    location / {
        proxy_pass http://localhost:$APP_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        # Rate limiting
        limit_req zone=api burst=20 nodelay;
    }
    
    # Static files caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:$APP_PORT;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Security
    location ~ /\. {
        deny all;
    }
}
EOF
    
    # Enable the site
    sudo ln -sf /etc/nginx/sites-available/$PROJECT_NAME /etc/nginx/sites-enabled/
    
    # Test Nginx configuration
    sudo nginx -t
    
    print_success "Nginx configured successfully."
}

# Function to start services
start_services() {
    print_status "Starting services..."
    
    sudo systemctl restart nginx
    sudo systemctl start $PROJECT_NAME
    
    # Check service status
    if sudo systemctl is-active --quiet $PROJECT_NAME; then
        print_success "vSecureBytes service started successfully."
    else
        print_error "Failed to start vSecureBytes service."
        sudo systemctl status $PROJECT_NAME
        exit 1
    fi
    
    if sudo systemctl is-active --quiet nginx; then
        print_success "Nginx started successfully."
    else
        print_error "Failed to start Nginx."
        sudo systemctl status nginx
        exit 1
    fi
}

# Function to setup SSL with Let's Encrypt
setup_ssl() {
    print_status "Setting up SSL certificate with Let's Encrypt..."
    
    read -p "Enter your email address for Let's Encrypt notifications: " email
    
    if [[ -z "$email" ]]; then
        print_warning "Email not provided. Skipping SSL setup."
        print_warning "You can run 'sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN' later."
        return
    fi
    
    sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --email $email --agree-tos --non-interactive
    
    # Setup auto-renewal
    sudo crontab -l 2>/dev/null | sudo tee /tmp/crontab.bak > /dev/null || true
    (sudo crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | sudo crontab -
    
    print_success "SSL certificate installed and auto-renewal configured."
}

# Function to configure fail2ban
configure_fail2ban() {
    print_status "Configuring fail2ban..."
    
    sudo tee /etc/fail2ban/jail.local > /dev/null << EOF
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5
ignoreip = 127.0.0.1/8

[sshd]
enabled = true
port = ssh
logpath = /var/log/auth.log

[nginx-http-auth]
enabled = true
logpath = /var/log/nginx/error.log

[nginx-limit-req]
enabled = true
logpath = /var/log/nginx/error.log
EOF
    
    sudo systemctl restart fail2ban
    print_success "Fail2ban configured successfully."
}

# Function to create backup script
create_backup_script() {
    print_status "Creating backup script..."
    
    sudo tee /home/$PROJECT_NAME/backup.sh > /dev/null << EOF
#!/bin/bash
BACKUP_DIR="/home/$PROJECT_NAME/backups"
DATE=\$(date +%Y%m%d_%H%M%S)
APP_DIR="/home/$PROJECT_NAME/app"

mkdir -p \$BACKUP_DIR

# Create application backup
tar -czf \$BACKUP_DIR/app_backup_\$DATE.tar.gz -C /home/$PROJECT_NAME app

# Create database backup
sudo -u postgres pg_dump ${PROJECT_NAME}_db > \$BACKUP_DIR/db_backup_\$DATE.sql

# Create Redis backup
redis-cli --rdb \$BACKUP_DIR/redis_backup_\$DATE.rdb

# Keep only last 7 backups
cd \$BACKUP_DIR
ls -t app_backup_*.tar.gz | tail -n +8 | xargs rm -f 2>/dev/null || true
ls -t db_backup_*.sql | tail -n +8 | xargs rm -f 2>/dev/null || true
ls -t redis_backup_*.rdb | tail -n +8 | xargs rm -f 2>/dev/null || true

echo "Backup completed: app_backup_\$DATE.tar.gz, db_backup_\$DATE.sql, redis_backup_\$DATE.rdb"
EOF
    
    sudo chmod +x /home/$PROJECT_NAME/backup.sh
    sudo chown $PROJECT_NAME:$PROJECT_NAME /home/$PROJECT_NAME/backup.sh
    
    # Add to crontab for daily backups
    sudo -u $PROJECT_NAME bash << EOF
(crontab -l 2>/dev/null; echo "0 2 * * * /home/$PROJECT_NAME/backup.sh") | crontab -
EOF
    
    print_success "Backup script created and scheduled daily at 2 AM."
}

# Function to create monitoring script
create_monitoring() {
    print_status "Creating monitoring script..."
    
    sudo tee /home/$PROJECT_NAME/monitor.sh > /dev/null << EOF
#!/bin/bash
SERVICE_NAME="$PROJECT_NAME"
LOG_FILE="/home/$PROJECT_NAME/monitor.log"

if ! systemctl is-active --quiet \$SERVICE_NAME; then
    echo "\$(date): Service \$SERVICE_NAME is down. Attempting restart..." >> \$LOG_FILE
    systemctl restart \$SERVICE_NAME
    
    if systemctl is-active --quiet \$SERVICE_NAME; then
        echo "\$(date): Service \$SERVICE_NAME restarted successfully." >> \$LOG_FILE
    else
        echo "\$(date): Failed to restart service \$SERVICE_NAME." >> \$LOG_FILE
    fi
fi
EOF
    
    sudo chmod +x /home/$PROJECT_NAME/monitor.sh
    sudo chown $PROJECT_NAME:$PROJECT_NAME /home/$PROJECT_NAME/monitor.sh
    
    # Add to crontab for monitoring every 5 minutes
    sudo -u $PROJECT_NAME bash << 'EOF'
(crontab -l 2>/dev/null; echo "*/5 * * * * /home/vsecurebytes/monitor.sh") | crontab -
EOF
    
    print_success "Monitoring script created and scheduled every 5 minutes."
}

# Function to display deployment summary
display_summary() {
    print_success "Deployment completed successfully!"
    echo
    echo "=== DEPLOYMENT SUMMARY ==="
    echo "Domain: $DOMAIN"
    echo "Application Directory: /home/$PROJECT_NAME/app"
    echo "Service Name: $PROJECT_NAME"
    echo "Application Port: $APP_PORT"
    echo "Database: PostgreSQL (${PROJECT_NAME}_db)"
    echo "Cache: Redis"
    echo "Nginx Config: /etc/nginx/sites-available/$PROJECT_NAME"
    echo
    echo "=== DATABASE INFORMATION ==="
    echo "PostgreSQL Database: ${PROJECT_NAME}_db"
    echo "Database User: ${PROJECT_NAME}_user"
    echo "Redis: localhost:6379"
    echo "Connection: Configured via DATABASE_URL in .env"
    echo
    echo "=== USEFUL COMMANDS ==="
    echo "Check service status: sudo systemctl status $PROJECT_NAME"
    echo "View service logs: sudo journalctl -u $PROJECT_NAME -f"
    echo "Restart service: sudo systemctl restart $PROJECT_NAME"
    echo "Check database: sudo -u postgres psql -d ${PROJECT_NAME}_db"
    echo "Check Redis: redis-cli ping"
    echo "Check Nginx status: sudo systemctl status nginx"
    echo "View Nginx logs: sudo tail -f /var/log/nginx/error.log"
    echo "Run backup: /home/$PROJECT_NAME/backup.sh"
    echo
    echo "=== STORAGE FEATURES ==="
    echo "- PostgreSQL database for persistent data storage"
    echo "- Redis for session management and caching"
    echo "- Automated database migrations via Drizzle ORM"
    echo "- Contact form submissions stored in database"
    echo "- In-memory storage fallback for development"
    echo
    echo "=== SECURITY NOTES ==="
    echo "- UFW firewall is enabled"
    echo "- Fail2ban is configured for SSH and Nginx protection"
    echo "- SSL certificate is configured (if email was provided)"
    echo "- Database access restricted to application user"
    echo "- Redis configured with production settings"
    echo "- Daily backups are scheduled at 2 AM (app + database + redis)"
    echo "- Service monitoring runs every 5 minutes"
    echo
    echo "=== DNS CONFIGURATION ==="
    echo "Point your domain '$DOMAIN' to this server's IP address:"
    echo "A record: $DOMAIN -> $(curl -s ipinfo.io/ip 2>/dev/null || echo 'YOUR_SERVER_IP')"
    echo "A record: www.$DOMAIN -> $(curl -s ipinfo.io/ip 2>/dev/null || echo 'YOUR_SERVER_IP')"
    echo
    print_success "Your vSecureBytes website should be accessible at http://$DOMAIN"
}

# Main execution
main() {
    echo "=================================="
    echo "vSecureBytes Deployment Script"
    echo "=================================="
    echo
    
    check_root
    check_prerequisites
    
    print_status "Starting deployment process..."
    
    update_system
    install_nodejs
    install_dependencies
    setup_postgresql
    setup_redis
    configure_firewall
    create_app_user
    setup_app_directory
    setup_application
    create_systemd_service
    configure_nginx
    start_services
    configure_fail2ban
    create_backup_script
    create_monitoring
    
    # Ask about SSL setup
    echo
    read -p "Do you want to setup SSL certificate with Let's Encrypt? (y/n): " setup_ssl_choice
    if [[ $setup_ssl_choice =~ ^[Yy]$ ]]; then
        setup_ssl
    else
        print_warning "SSL setup skipped. You can run 'sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN' later."
    fi
    
    echo
    display_summary
}

# Run main function
main "$@"