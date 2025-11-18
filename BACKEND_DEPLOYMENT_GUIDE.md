# 🚀 Backend Deployment Guide for Railway

This guide will help you deploy your contact form backend to Railway in just a few minutes.

## 📋 Prerequisites

1. **GitHub Account** - Your code needs to be in a Git repository
2. **Gmail Account** - For email functionality (or other SMTP service)
3. **Railway Account** - Sign up at [railway.app](https://railway.app)

## 🔧 Step 1: Prepare Your Email Configuration

### Option A: Gmail (Recommended)
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account Settings > Security > App passwords
   - Generate a password for "Mail"
   - Save this password for later

### Option B: Other SMTP Services
- **SendGrid**: Get API key from dashboard
- **Mailgun**: Get SMTP credentials from domains section

## 🚀 Step 2: Deploy to Railway

### 2.1 Push Your Code to GitHub
```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Add backend with contact form functionality"

# Add your GitHub repository as origin
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git push -u origin main
```

### 2.2 Deploy on Railway
1. **Visit** [railway.app](https://railway.app)
2. **Sign in** with your GitHub account
3. **Click** "New Project"
4. **Select** "Deploy from GitHub repo"
5. **Choose** your repository
6. **Railway will automatically detect** it's a Node.js project

### 2.3 Configure Environment Variables
Once deployed, add these environment variables in Railway dashboard:

**Required Variables:**
```
NODE_ENV=production
PORT=5000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=contact@vsecurebytes.com
```

**To add variables in Railway:**
1. Go to your project dashboard
2. Click on "Variables" tab
3. Add each variable one by one
4. Click "Deploy" after adding all variables

## 🌐 Step 3: Get Your Backend URL

After successful deployment:
1. Railway will provide a URL like: `https://your-app-name.railway.app`
2. **Test the API**: Visit `https://your-app-name.railway.app/api/contact`
3. You should see a 405 error (Method Not Allowed) - this is expected for GET requests

## 🔗 Step 4: Update Frontend Configuration

Update your frontend to use the deployed backend URL.

### Option 1: Environment Variable (Recommended)
Create `.env` file in your frontend project:
```env
VITE_API_URL=https://your-app-name.railway.app
```

Then update your API calls to use this URL.

### Option 2: Direct Update
Update the API base URL in your frontend code to point to your Railway deployment.

## 🧪 Step 5: Test the Contact Form

1. **Deploy frontend** to Netlify (with updated backend URL)
2. **Fill out contact form** on your website
3. **Check email** - you should receive both:
   - Notification email at your contact email
   - Confirmation email at the submitted email address

## ⚡ Railway Deployment Features

✅ **Automatic HTTPS** - SSL certificates included
✅ **Auto-scaling** - Handles traffic spikes
✅ **Free tier** - $5 monthly credits
✅ **Custom domains** - Add your own domain
✅ **Monitoring** - Built-in logs and metrics

## 🛠 Troubleshooting

### Common Issues:

**1. Email not sending:**
- Check SMTP credentials in Railway variables
- Verify Gmail app password is correct
- Check Railway logs for email errors

**2. CORS errors:**
- Verify your Netlify URL is in the allowedOrigins array
- Check browser console for specific CORS messages

**3. 500 Server Error:**
- Check Railway logs in the dashboard
- Verify all environment variables are set

### Checking Logs:
1. Go to Railway project dashboard
2. Click on your service
3. Go to "Logs" tab
4. Look for error messages

## 🎯 Alternative Deployment Options

### Render (Alternative)
1. Similar to Railway but slightly different interface
2. Free tier available
3. Connect GitHub repo and deploy

### Vercel (Serverless Functions)
1. Convert Express routes to serverless functions
2. Good for simple APIs
3. Excellent free tier

## 📞 Need Help?

If you encounter issues:
1. Check Railway documentation
2. Review the logs in Railway dashboard
3. Test API endpoints with tools like Postman
4. Ensure all environment variables are correctly set

---

**🎉 Congratulations!** Your backend is now deployed and ready to handle contact form submissions!