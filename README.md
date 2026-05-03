# 🌿 AgriScan AI - Protect Your Crops with Intelligence

![AgriScan AI Banner](https://via.placeholder.com/1200x600/059669/ffffff?text=AgriScan+AI)

**AgriScan AI** is a cutting-edge, mobile-first web application designed to help farmers detect crop diseases instantly using Artificial Intelligence. With offline capabilities and English language support, it empowers farmers to protect their yields and ensure food security.

## 🚀 Key Features

*   **🔍 Instant AI Diagnosis**: Snap a photo and get immediate disease detection results with 94%+ accuracy.
*   **📶 Works Offline**: Powered by MediaPipe technology, running directly on your device without needing an active internet connection.
*   **📱 Mobile Optimized**: A responsive, app-like experience designed for all devices, from high-end smartphones to basic tablets.
*   **🛡️ Treatment Solutions**: verified actionable advice on how to treat detected diseases.
*   **🌍 Language Support**: Clear English instructions for broad accessibility.

## 🛠️ Tech Stack

*   **React 19**: For a high-performance, component-based UI.
*   **Vite**: Next-generation frontend tooling for lightning-fast builds.
*   **Tailwind CSS 4**: For a modern, responsive, and beautiful design system.
*   **TypeScript**: Ensuring code reliability and maintainability.

## 🏁 Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/RoyalRDGpower/Protect-Your-Crops-with-AI-Intelligence.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd Protect-Your-Crops-with-AI-Intelligence
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

### Running Locally

Start the development server:

```bash
npm run dev
```

### Building for Production

Create a production-ready build:

```bash
npm run build
```

## 🤝 Validation & Trust

AgriScan AI is recognized and validated by agricultural experts.
*   **Validated against thousands of disease samples.**
*   **Endorsed by agricultural extension officers.**
*   [Read the full Validation Report](https://elitehustlevaultcentral.blogspot.com/2026/02/ai-revolutionizing-crop-protection.html)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Built with ❤️ for Farmers Worldwide</p>
  <p>
    <a href="https://elitehustlevaultcentral.blogspot.com/p/privacy-policy.html">Privacy Policy</a> • 
    <a href="https://elitehustlevaultcentral.blogspot.com/p/about-royal-digital-empire_10.html">About Us</a>
  </p>
</div>

## ☁️ GitHub Actions Deployment to AWS

This repository now includes a GitHub Actions workflow at `.github/workflows/deploy-aws.yml` that:

1. Installs dependencies and builds the app (`npm ci` + `npm run build`).
2. Runs `sam build` automatically **only if** `template.yaml` or `template.yml` exists.
3. Deploys `dist/` to your AWS S3 hosting bucket.
4. Optionally invalidates CloudFront.

### Required GitHub configuration

Set these in your GitHub repository:

#### **Repository Secrets**
- `AWS_ROLE_TO_ASSUME`: IAM role ARN for GitHub OIDC (example: `arn:aws:iam::<account-id>:role/github-actions-deploy`).

#### **Repository Variables**
- `AWS_REGION`: e.g. `us-east-1`
- `S3_BUCKET`: target hosting bucket name
- `CLOUDFRONT_DISTRIBUTION_ID` (optional): for cache invalidation

### Trigger

Deployment runs on:
- Push to `main`
- Manual trigger from Actions tab (`workflow_dispatch`)
