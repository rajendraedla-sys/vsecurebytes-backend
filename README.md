# vSecureBytes - AI-Powered Cybersecurity Platform

Enterprise-grade cybersecurity solutions with complete data sovereignty through locally hosted AI infrastructure.

## 🚀 Quick Start

### Local Development
```bash
npm install
npm run dev
```
Visit http://localhost:5000


### Production Deployment on Digital Ocean

1. **Create Ubuntu 22.04 Droplet**
   - 2GB RAM minimum recommended
   - Enable monitoring and backups

2. **Deploy with our automated script**
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

3. **Quick deployment option**
   ```bash
   chmod +x quick-deploy.sh
   ./quick-deploy.sh your-domain.com your-droplet-ip
   ```

## 📋 Features

- **Custom LoRA Model Creation** - Enterprise-specific AI training with complete data privacy
- **RAG+LLM Applications** - Private knowledge base integration without data leaving your infrastructure
- **Autonomous Penetration Testing** - AI-driven vulnerability assessment and exploitation
- **External Surface Monitoring** - Continuous attack surface analysis
- **Enterprise AI Chatbots** - Role-based internal support automation
- **Infrastructure Monitoring** - AI-powered anomaly detection and cost optimization
- **Governance & Compliance** - Automated audit readiness and risk reporting

## 🏗 Architecture

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express
- **Styling**: Cybersecurity-themed with matrix green accents
- **Fonts**: JetBrains Mono, Inter, Roboto
- **Animations**: Custom CSS animations with cyberpunk aesthetics

## 🔧 Technology Stack

- React 18 with TypeScript
- Tailwind CSS for styling
- Express.js backend
- Vite for build tooling
- Nginx for production serving
- Let's Encrypt for SSL
- SystemD for service management

## 🛡 Security Features

- UFW firewall configuration
- Fail2ban intrusion prevention
- SSL/TLS encryption
- Rate limiting
- Security headers
- Automated monitoring and alerting

## 📦 Production Scripts

The deployment includes:
- Automated system setup
- Service configuration
- SSL certificate installation
- Backup scheduling
- Monitoring setup
- Log rotation

## 🔐 Environment Configuration

Copy `production.env` to `.env` on your server and configure:
- SMTP settings for contact form
- Domain configuration
- Security settings

## 📊 Monitoring

The deployment includes:
- Service health monitoring (every 5 minutes)
- Daily automated backups
- Log aggregation
- Fail2ban protection
- System resource monitoring

## 🚀 Scaling

### Vertical Scaling
- Upgrade droplet resources in Digital Ocean console
- No code changes required

### Horizontal Scaling
- Deploy additional instances
- Configure Digital Ocean Load Balancer
- Update DNS for load balancing

## 📝 Maintenance

### Daily Tasks
```bash
# Check service status
sudo systemctl status vsecurebytes

# View logs
sudo journalctl -u vsecurebytes -f
```

### Weekly Tasks
```bash
# Update system
sudo apt update && sudo apt upgrade

# Check backups
ls -la /home/vsecurebytes/backups/
```

## 🆘 Troubleshooting

### Common Issues

**Service won't start:**
```bash
sudo journalctl -u vsecurebytes -n 50
sudo systemctl restart vsecurebytes
```

**Nginx 502 errors:**
```bash
curl http://localhost:5000
sudo nginx -t
sudo systemctl restart nginx
```

**SSL certificate issues:**
```bash
sudo certbot certificates
sudo certbot renew --dry-run
```

## 📞 Support

For deployment assistance:
1. Check service logs
2. Review deployment guide
3. Verify DNS configuration
4. Check firewall settings

## 💰 Cost Estimation

| Component | Monthly Cost (USD) |
|-----------|-------------------|
| Basic Droplet (2GB) | $12.00 |
| Backup Storage | $2.40 |
| **Total** | **$14.40** |

## 🔄 Backup & Recovery

Automated daily backups at 2 AM:
```bash
# Manual backup
/home/vsecurebytes/backup.sh

# Restore from backup
cd /home/vsecurebytes
tar -xzf backups/app_backup_YYYYMMDD_HHMMSS.tar.gz
```

## 🌐 Domain Configuration

Point your domain to the server:
```
A Record: @ -> YOUR_SERVER_IP
A Record: www -> YOUR_SERVER_IP
```

## 📋 Deployment Checklist

- [ ] Digital Ocean droplet created
- [ ] DNS records configured
- [ ] Deployment script executed
- [ ] SSL certificate installed
- [ ] Services running
- [ ] Backups configured
- [ ] Monitoring active
- [ ] Firewall enabled

---

**Enterprise AI-Powered Cybersecurity with Complete Data Sovereignty**