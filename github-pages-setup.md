# 🌐 GitHub Pages Deployment for PhishGuard AI

## Frontend-Only Demo Deployment

Since GitHub Pages only supports static sites, we can deploy the frontend as a demo with mock data.

### Setup Steps:

1. **Go to your GitHub repository**: https://github.com/Hafsah-Khathoon/PhishGuard-ai

2. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` (we'll create this)

3. **Create GitHub Pages workflow**:

```yaml
# .github/workflows/pages.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: |
        cd frontend
        npm install
    
    - name: Build for GitHub Pages
      run: |
        cd frontend
        npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./frontend/dist
```

### Demo Features:
- ✅ Full UI/UX experience
- ✅ Mock AI responses for demonstration
- ✅ Interactive dashboard with sample data
- ✅ Responsive design showcase
- ⚠️ No real AI analysis (requires backend)

### Live Demo URL:
After setup: `https://hafsah-khathoon.github.io/PhishGuard-ai/`

This allows people to see and interact with your beautiful UI design without needing to set up the full backend infrastructure!