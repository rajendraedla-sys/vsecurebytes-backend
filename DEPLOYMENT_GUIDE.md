# vSecureBytes Digital Ocean Deployment Guide

This guide provides step-by-step instructions for deploying your vSecureBytes website on Digital Ocean with Ubuntu.

## Prerequisites

- Digital Ocean account
- Domain name (vsecurbytes.com) with DNS management access
- Local machine with SSH access

## Step 1: Create Digital Ocean Droplet

1. **Login to Digital Ocean Console**
   - Go to https://cloud.digitalocean.com/
   - Click "Create" → "Droplet"

2. **Droplet Configuration**
   - **Image**: Ubuntu 22.04 LTS x64
   - **Plan**: Basic ($12/month, 2GB RAM, 1 vCPU, 50GB SSD)
   - **Region**: Choose closest to your target audience
   - **Authentication**: SSH Key (recommended) or Password
   - **Hostname**: vsecurebytes-prod

3. **Additional Options**
   - Enable monitoring
   - Enable backup (optional, $2.40/month)

## Step 2: Initial Server Setup

```bash
# Connect to your droplet
ssh root@YOUR_DROPLET_IP

# Create a non-root user with sudo privileges
adduser deploy
usermod -aG sudo deploy

# Copy SSH keys to new user (if using SSH keys)
rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy

# Switch to deploy user
su - deploy
```

## Step 3: Deploy Application

1. **Upload the deployment script**
   ```bash
   # From your local machine, copy the project and deployment script
   scp -r . deploy@YOUR_DROPLET_IP:/home/deploy/vsecurebytes-deploy/
   ```

2. **Run the deployment script**
   ```bash
   # On the server
   cd /home/deploy/vsecurebytes-deploy/
   chmod +x deploy.sh
   ./deploy.sh
   ```

3. **Follow the script prompts**
   - Enter your email for SSL certificate
   - Confirm SSL setup when prompted

## Step 4: Configure DNS

1. **Add DNS Records in your domain provider**
   ```
   Type: A Record
   Name: @
   Value: YOUR_DROPLET_IP
   TTL: 3600

   Type: A Record  
   Name: www
   Value: YOUR_DROPLET_IP
   TTL: 3600
   ```

2. **Verify DNS propagation**
   ```bash
   # Check if DNS is working
   nslookup vsecurbytes.com
   nslookup www.vsecurbytes.com
   ```

## Step 5: Verify Deployment

1. **Check service status**
   ```bash
   sudo systemctl status vsecurebytes
   sudo systemctl status nginx
   ```

2. **View logs**
   ```bash
   # Application logs
   sudo journalctl -u vsecurebytes -f

   # Nginx logs
   sudo tail -f /var/log/nginx/access.log
   sudo tail -f /var/log/nginx/error.log
   ```

3. **Test website**
   - Visit http://vsecurbytes.com
   - Verify SSL: https://vsecurbytes.com

## Step 6: Post-Deployment Security

1. **Update firewall rules**
   ```bash
   # Disable password authentication for SSH
   sudo nano /etc/ssh/sshd_config
   # Set: PasswordAuthentication no
   sudo systemctl restart ssh
   ```

2. **Setup monitoring alerts**
   ```bash
   # Install additional monitoring
   sudo apt install -y htop iftop nethogs
   ```

## Ongoing Maintenance

### Daily Tasks
- Monitor application logs
- Check disk space: `df -h`
- Monitor system resources: `htop`

### Weekly Tasks
- Update system packages: `sudo apt update && sudo apt upgrade`
- Review fail2ban logs: `sudo fail2ban-client status`
- Check backup logs

### Monthly Tasks
- Review SSL certificate status: `sudo certbot certificates`
- Rotate log files if needed
- Review security updates

## Troubleshooting

### Common Issues

1. **Application won't start**
   ```bash
   # Check logs
   sudo journalctl -u vsecurebytes -n 50
   
   # Check if port is in use
   sudo netstat -tlnp | grep 5000
   
   # Restart service
   sudo systemctl restart vsecurebytes
   ```

2. **Nginx 502 Bad Gateway**
   ```bash
   # Check if application is running
   curl http://localhost:5000
   
   # Check Nginx config
   sudo nginx -t
   
   # Restart Nginx
   sudo systemctl restart nginx
   ```

3. **SSL Certificate Issues**
   ```bash
   # Renew certificate manually
   sudo certbot renew --dry-run
   
   # Force renewal
   sudo certbot renew --force-renewal
   ```

4. **High Memory Usage**
   ```bash
   # Check memory usage
   free -h
   
   # Check processes
   ps aux --sort=-%mem | head
   
   # Restart application if needed
   sudo systemctl restart vsecurebytes
   ```

### Performance Optimization

1. **Enable Nginx gzip compression** (already configured in script)

2. **Setup Redis for session storage** (optional)
   ```bash
   sudo apt install redis-server
   sudo systemctl enable redis-server
   ```

3. **Configure log rotation**
   ```bash
   sudo nano /etc/logrotate.d/vsecurebytes
   ```

## Backup and Recovery

### Manual Backup
```bash
# Run backup script
/home/vsecurebytes/backup.sh
```

### Restore from Backup
```bash
# Stop services
sudo systemctl stop vsecurebytes

# Extract backup
cd /home/vsecurebytes
tar -xzf backups/app_backup_YYYYMMDD_HHMMSS.tar.gz

# Restart services
sudo systemctl start vsecurebytes
```

## Scaling Considerations

### Vertical Scaling (Upgrade Droplet)
1. Create snapshot of current droplet
2. Resize droplet in Digital Ocean console
3. Restart services

### Horizontal Scaling (Load Balancer)
1. Create additional droplets
2. Setup Digital Ocean Load Balancer
3. Configure sticky sessions if needed

## Security Checklist

- [ ] SSH key authentication enabled
- [ ] Password authentication disabled
- [ ] UFW firewall configured
- [ ] Fail2ban installed and configured
- [ ] SSL certificate installed
- [ ] Regular security updates scheduled
- [ ] Backup system operational
- [ ] Monitoring system active
- [ ] Log rotation configured

## Support and Monitoring

### Health Check Endpoints
- Application: http://YOUR_DOMAIN:5000
- Nginx status: Create custom endpoint if needed

### Monitoring Services
Consider integrating:
- Digital Ocean Monitoring (included)
- UptimeRobot for external monitoring
- LogRocket for error tracking

## Cost Estimation

| Component | Monthly Cost |
|-----------|-------------|
| Basic Droplet (2GB RAM) | $12.00 |
| Backup (optional) | $2.40 |
| Load Balancer (if scaling) | $12.00 |
| **Total (Basic)** | **$12.00** |

## Contact Information

For deployment issues or questions:
- Check application logs first
- Review this guide
- Contact system administrator

---

**Note**: Replace `YOUR_DROPLET_IP` and `vsecurbytes.com` with your actual values throughout this guide.