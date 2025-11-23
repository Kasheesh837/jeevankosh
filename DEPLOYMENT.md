# DEPLOYMENT GUIDE

## Prerequisites
- Deployed MongoDB (Atlas recommended)
- Node.js hosting (Heroku, Render, Railway, etc.)
- React hosting (Vercel, Netlify, etc.)

## Backend Deployment (Heroku Example)

1. Install Heroku CLI:
   ```
   npm install -g heroku
   heroku login
   ```

2. Create Heroku app:
   ```
   cd backend
   heroku create your-app-name
   ```

3. Set environment variables:
   ```
   heroku config:set MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/jeevankosh
   heroku config:set GEMINI_API_KEY=your_key_here
   heroku config:set NODE_ENV=production
   ```

4. Deploy:
   ```
   git push heroku main
   ```

5. Backend URL: https://your-app-name.herokuapp.com

## Frontend Deployment (Vercel Example)

1. Install Vercel CLI:
   ```
   npm i -g vercel
   ```

2. Deploy:
   ```
   cd frontend
   vercel
   ```

3. Update API endpoint in App.jsx:
   ```javascript
   const API_BASE = 'https://your-app-name.herokuapp.com'
   ```

4. Redeploy frontend

## Alternative: Docker Deployment

### Backend Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Frontend Dockerfile
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=mongodb://mongo:27017/jeevankosh
      - GEMINI_API_KEY=${GEMINI_API_KEY}
    depends_on:
      - mongo
  
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
  
  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

## MongoDB Atlas Setup

1. Create MongoDB Atlas account
2. Create cluster
3. Create database user with password
4. Whitelist IP addresses
5. Get connection string:
   `mongodb+srv://user:pass@cluster.mongodb.net/jeevankosh`

## SSL/HTTPS

- Heroku: Automatic SSL
- Vercel: Automatic SSL
- Custom domain: Use Let's Encrypt

## CORS Configuration

Update backend server.js for production:
```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com',
  credentials: true
}));
```

## Rate Limiting

Add to backend (install express-rate-limit):
```bash
npm install express-rate-limit
```

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);
```

## Monitoring

- Use Sentry for error tracking
- CloudWatch for logs
- Datadog for performance
- Uptime monitoring via StatusPage

## Security Checklist

- [ ] Use HTTPS everywhere
- [ ] Set CORS headers correctly
- [ ] Validate all inputs
- [ ] Use environment variables
- [ ] Enable MongoDB authentication
- [ ] Setup rate limiting
- [ ] Use strong API keys
- [ ] Implement CSRF protection
- [ ] Add logging/monitoring
- [ ] Regular security audits

## Troubleshooting

**CORS errors:**
- Check backend CORS origin
- Verify API endpoint URL
- Clear browser cache

**API not responding:**
- Check backend logs
- Verify environment variables
- Check MongoDB connection
- Verify API key validity

**Voice not working:**
- HTTPS required for production
- Check browser permissions
- Verify microphone access

## Performance Optimization

- Enable gzip compression
- Use CDN for static files
- Optimize images
- Minify CSS/JS (Vite handles this)
- Cache API responses
- Use database indexes

## Backup Strategy

- Daily MongoDB backups
- Environment variable backups
- Git history backups
- Test restore procedures regularly
