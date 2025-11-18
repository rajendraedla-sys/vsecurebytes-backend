# 🚀 Complete Deployment Guide: Frontend + Backend

## 📋 What's Been Configured

✅ **Backend API** with contact form endpoint (`/api/contact`)
✅ **Email functionality** with nodemailer
✅ **CORS configuration** for cross-origin requests
✅ **Frontend API integration** with environment variables
✅ **Deployment configurations** for Railway and Netlify

## 🎯 Quick Deployment Steps

### Step 1: Deploy Backend to Railway (5 minutes)

1. **Push to GitHub:**
```bash
git add .
git commit -m "Backend ready for deployment"
git push origin main
```

2. **Deploy on Railway:**
- Visit [railway.app](https://railway.app)
- Sign in with GitHub
- New Project → Deploy from GitHub repo
- Select your repository

3. **Add Environment Variables in Railway:**
```
NODE_ENV=production
PORT=5000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
CONTACT_EMAIL=contact@vsecurebytes.com
```

4. **Note Your Backend URL:**
- Example: `https://your-app-name.railway.app`

### Step 2: Update Frontend for Production

1. **Create production environment file:**
```bash
# Copy the example file
cp client/.env.production.example client/.env.production

# Edit with your actual Railway URL
echo "VITE_API_URL=https://your-app-name.railway.app" > client/.env.production
```

2. **Rebuild frontend:**
```bash
npm run build:frontend
```

### Step 3: Deploy Frontend to Netlify

The `netlify.toml` is already configured. Your build will:
- Use `dist/public` as publish directory
- Run `npm run build:frontend` automatically
- Handle SPA routing and security headers

## 📧 Gmail Setup for Email Functionality

1. **Enable 2FA** on your Gmail account
2. **Generate App Password:**
   - Google Account → Security → App passwords
   - Select "Mail" → Generate
   - Use this password in `SMTP_PASS`

## 🧪 Testing Your Deployment

1. **Test Backend API:**
   ```bash
   curl -X POST https://your-app-name.railway.app/api/contact \
     -H "Content-Type: application/json" \
     -d '{
       "fullName": "Test User",
       "email": "test@example.com",
       "company": "Test Company",
       "interest": "custom-lora",
       "message": "Test message"
     }'
   ```

2. **Test Frontend:**
   - Visit your Netlify URL
   - Fill out contact form
   - Check for emails

## 🔧 Troubleshooting

### Backend Issues:
- Check Railway logs for errors
- Verify environment variables
- Test SMTP credentials

### Frontend Issues:
- Check browser console for CORS errors
- Verify `VITE_API_URL` is set correctly
- Ensure Netlify build succeeds

### Email Issues:
- Verify Gmail app password
- Check spam folder
- Review Railway logs for email errors

## 🌟 Production URLs Structure

```
Frontend (Netlify):  https://your-site.netlify.app
Backend (Railway):   https://your-app-name.railway.app
API Endpoint:        https://your-app-name.railway.app/api/contact
```

## 🚀 Deployment Commands Summary

```bash
# Build everything locally first
npm run build:frontend
npm run build

# Push to GitHub
git add . && git commit -m "Ready for deployment" && git push

# Deploy backend: Use Railway dashboard
# Deploy frontend: Use Netlify dashboard
```

## 💡 Next Steps After Deployment

1. **Custom Domain** - Add your domain in Railway and Netlify
2. **Monitoring** - Set up uptime monitoring
3. **Analytics** - Add Google Analytics or similar
4. **Error Tracking** - Consider Sentry for error monitoring

---

**🎉 You're all set!** Your contact form will now work end-to-end with email notifications.