# Netlify Deployment Guide for vSecureBytes Frontend

This guide explains how to deploy the vSecureBytes frontend to Netlify.

## Prerequisites

✅ Frontend built with correct backend URL
✅ `netlify.toml` configured
✅ `_redirects` file in place
✅ Backend deployed at `https://vsecurebytes-backend.onrender.com`

## Deployment Options

### Option 1: Netlify CLI (Recommended)

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Deploy the site:
```bash
# From the project root directory
netlify deploy --prod --dir=dist/public
```

### Option 2: Git Integration (Automatic)

1. Push the current code to your Git repository:
```bash
git add .
git commit -m "Add Netlify deployment configuration"
git push origin main
```

2. Go to [Netlify](https://netlify.com) and create a new site
3. Connect your GitHub repository
4. Configure build settings:
   - **Build command**: `NODE_ENV=production node node_modules/vite/bin/vite.js build`
   - **Publish directory**: `dist/public`
   - **Environment variables**: `VITE_API_URL=https://vsecurebytes-backend.onrender.com`

### Option 3: Manual Upload

1. Ensure the frontend is built:
```bash
NODE_ENV=production node node_modules/vite/bin/vite.js build
```

2. Go to [Netlify](https://netlify.com) and drag the `dist/public` folder to the deploy area

## Important Configuration Files

### `netlify.toml`
- Configures build settings and redirects
- Sets security headers
- Forces HTTPS
- Handles SPA routing

### `client/.env.production`
- Sets `VITE_API_URL=https://vsecurebytes-backend.onrender.com`
- Ensures frontend connects to correct backend

### `dist/public/_redirects`
- Handles client-side routing for React Router
- Redirects all routes to `index.html`

## Verification

After deployment, verify:

1. **Site loads**: Visit your Netlify URL
2. **Routing works**: Navigate between pages
3. **API connection**: Test the contact form
4. **HTTPS**: Ensure site uses HTTPS
5. **Backend integration**: Check browser network tab for API calls to `https://vsecurebytes-backend.onrender.com`

## Troubleshooting

### Contact Form Issues
- Check browser console for CORS errors
- Verify API calls are going to `https://vsecurebytes-backend.onrender.com/api/contact`
- Ensure backend is responding (check Render logs)

### Build Failures
- Check Netlify build logs
- Verify all dependencies are installed
- Check that `VITE_API_URL` environment variable is set

### Routing Issues
- Ensure `_redirects` file is in the deployed `dist/public` directory
- Check Netlify redirects are configured in `netlify.toml`

## Custom Domain Setup

If using a custom domain (e.g., `vsecurebytes.com`):

1. Add domain in Netlify dashboard
2. Update DNS records to point to Netlify
3. Enable HTTPS in Netlify
4. Update CORS settings in backend if needed

## Environment Variables

The following environment variables are configured:

- `NODE_ENV=production` (set automatically during build)
- `VITE_API_URL=https://vsecurebytes-backend.onrender.com` (connects to backend)

## Security Features

The deployment includes:
- HTTPS enforcement
- Security headers (XSS, CSRF protection)
- Content security policies
- Asset caching optimization

## Support

If you encounter issues:
1. Check Netlify build logs
2. Verify backend is running at `https://vsecurebytes-backend.onrender.com`
3. Test API endpoints directly
4. Review browser console for errors