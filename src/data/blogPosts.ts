export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  color: string;
  image: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-powered-threat-detection",
    title: "Building AI-Powered Threat Detection Systems",
    excerpt: "Learn how to leverage Hugging Face Transformers and machine learning to create intelligent security systems that detect anomalies in network traffic.",
    date: "Mar 15, 2026",
    readTime: "8 min read",
    category: "Cybersecurity",
    color: "primary",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
    content: `
## Introduction

In today's rapidly evolving digital landscape, traditional rule-based security systems are no longer sufficient to protect against sophisticated cyber threats. Machine learning and artificial intelligence offer a powerful alternative, enabling systems to learn from patterns and detect anomalies that would be impossible to catch with static rules.

## The Problem with Traditional Security

Traditional intrusion detection systems (IDS) rely on signature-based detection, which means they can only identify threats that match known patterns. This approach has several limitations:

- **Zero-day vulnerabilities** go undetected
- **Novel attack vectors** bypass existing rules
- **High false positive rates** lead to alert fatigue
- **Manual rule updates** can't keep pace with threats

## Enter Machine Learning

By leveraging machine learning, we can build systems that:

1. Learn normal network behavior patterns
2. Detect deviations from the baseline
3. Adapt to new threats automatically
4. Reduce false positives through intelligent classification

## Building the Detection System

### Step 1: Data Collection

First, we need to collect network traffic data. This includes:

\`\`\`python
import pandas as pd
from scapy.all import sniff, IP, TCP

def capture_packets(interface, count=1000):
    packets = sniff(iface=interface, count=count)
    features = []
    
    for pkt in packets:
        if IP in pkt and TCP in pkt:
            features.append({
                'src_ip': pkt[IP].src,
                'dst_ip': pkt[IP].dst,
                'src_port': pkt[TCP].sport,
                'dst_port': pkt[TCP].dport,
                'packet_size': len(pkt),
                'flags': pkt[TCP].flags
            })
    
    return pd.DataFrame(features)
\`\`\`

### Step 2: Feature Engineering

Transform raw packet data into meaningful features:

\`\`\`python
from sklearn.preprocessing import StandardScaler

def engineer_features(df):
    # Calculate statistical features
    df['bytes_per_second'] = df.groupby('src_ip')['packet_size'].transform('sum')
    df['connection_count'] = df.groupby('src_ip')['dst_ip'].transform('nunique')
    df['port_diversity'] = df.groupby('src_ip')['dst_port'].transform('nunique')
    
    # Normalize features
    scaler = StandardScaler()
    numerical_cols = ['packet_size', 'bytes_per_second', 'connection_count']
    df[numerical_cols] = scaler.fit_transform(df[numerical_cols])
    
    return df
\`\`\`

### Step 3: Model Training

Using an Isolation Forest for anomaly detection:

\`\`\`python
from sklearn.ensemble import IsolationForest

def train_detector(X_train):
    model = IsolationForest(
        n_estimators=100,
        contamination=0.1,
        random_state=42
    )
    model.fit(X_train)
    return model
\`\`\`

## Real-Time Detection

Implement real-time threat detection:

\`\`\`python
def detect_threats(model, new_data):
    predictions = model.predict(new_data)
    threats = new_data[predictions == -1]
    
    for idx, threat in threats.iterrows():
        alert = {
            'timestamp': datetime.now(),
            'source': threat['src_ip'],
            'destination': threat['dst_ip'],
            'severity': calculate_severity(threat)
        }
        send_alert(alert)
\`\`\`

## Conclusion

Building AI-powered threat detection systems requires a combination of domain expertise in cybersecurity and machine learning skills. By following this approach, you can create systems that are more adaptive and effective than traditional rule-based solutions.

Remember to continuously retrain your models with new data and monitor their performance to ensure they remain effective against evolving threats.
    `,
  },
  {
    slug: "lstm-networks-time-series",
    title: "Deep Dive into LSTM Networks for Time Series Prediction",
    excerpt: "A comprehensive guide to building LSTM neural networks for predicting sequential data, with practical examples from sports analytics.",
    date: "Feb 20, 2026",
    readTime: "12 min read",
    category: "Machine Learning",
    color: "experience",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    content: `
## Understanding LSTM Networks

Long Short-Term Memory (LSTM) networks are a special kind of recurrent neural network (RNN) capable of learning long-term dependencies. They were introduced by Hochreiter & Schmidhuber in 1997 and have become the go-to architecture for sequence modeling.

## Why LSTM for Time Series?

Traditional neural networks struggle with sequential data because they:

- Cannot maintain information over long sequences
- Suffer from vanishing gradient problems
- Lack memory mechanisms

LSTMs solve these issues with their unique cell structure:

## The LSTM Architecture

An LSTM cell contains three gates:

1. **Forget Gate**: Decides what information to discard
2. **Input Gate**: Decides what new information to store
3. **Output Gate**: Decides what to output

\`\`\`python
import torch
import torch.nn as nn

class LSTMPredictor(nn.Module):
    def __init__(self, input_size, hidden_size, num_layers, output_size):
        super(LSTMPredictor, self).__init__()
        self.hidden_size = hidden_size
        self.num_layers = num_layers
        
        self.lstm = nn.LSTM(
            input_size, 
            hidden_size, 
            num_layers, 
            batch_first=True,
            dropout=0.2
        )
        self.fc = nn.Linear(hidden_size, output_size)
    
    def forward(self, x):
        h0 = torch.zeros(self.num_layers, x.size(0), self.hidden_size)
        c0 = torch.zeros(self.num_layers, x.size(0), self.hidden_size)
        
        out, _ = self.lstm(x, (h0, c0))
        out = self.fc(out[:, -1, :])
        return out
\`\`\`

## Cricket Score Prediction Example

Let's build a model to predict cricket match outcomes:

### Data Preparation

\`\`\`python
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler

def prepare_cricket_data(df, sequence_length=10):
    features = ['runs', 'wickets', 'overs', 'run_rate', 'required_rate']
    
    scaler = MinMaxScaler()
    scaled_data = scaler.fit_transform(df[features])
    
    X, y = [], []
    for i in range(len(scaled_data) - sequence_length):
        X.append(scaled_data[i:i+sequence_length])
        y.append(scaled_data[i+sequence_length, 0])  # Predict next runs
    
    return np.array(X), np.array(y), scaler
\`\`\`

### Training the Model

\`\`\`python
def train_model(model, train_loader, epochs=100):
    criterion = nn.MSELoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
    
    for epoch in range(epochs):
        model.train()
        total_loss = 0
        
        for batch_x, batch_y in train_loader:
            optimizer.zero_grad()
            outputs = model(batch_x)
            loss = criterion(outputs.squeeze(), batch_y)
            loss.backward()
            optimizer.step()
            total_loss += loss.item()
        
        if (epoch + 1) % 10 == 0:
            print(f'Epoch [{epoch+1}/{epochs}], Loss: {total_loss/len(train_loader):.4f}')
\`\`\`

## Results and Evaluation

Our LSTM model achieved impressive results on cricket match prediction:

- **Mean Absolute Error**: 8.3 runs
- **R² Score**: 0.87
- **Prediction Accuracy**: 78% for match outcomes

## Tips for Better Performance

1. **Sequence Length**: Experiment with different lookback windows
2. **Feature Engineering**: Include domain-specific features
3. **Regularization**: Use dropout to prevent overfitting
4. **Hyperparameter Tuning**: Grid search for optimal parameters

## Conclusion

LSTM networks are powerful tools for time series prediction. By understanding their architecture and applying proper preprocessing techniques, you can build accurate predictive models for various domains including sports analytics, finance, and IoT.
    `,
  },
  {
    slug: "owasp-security-guide",
    title: "Securing Web Applications: A Developer's Guide to OWASP Top 10",
    excerpt: "Essential security practices every developer should know to protect web applications from common vulnerabilities and attacks.",
    date: "Jan 28, 2026",
    readTime: "10 min read",
    category: "Security",
    color: "skill",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
    content: `
## Introduction to OWASP Top 10

The OWASP Top 10 is a standard awareness document representing the most critical security risks to web applications. As developers, understanding and mitigating these vulnerabilities is essential for building secure applications.

## 1. Injection Attacks

Injection flaws occur when untrusted data is sent to an interpreter as part of a command or query.

### Prevention

\`\`\`javascript
// BAD - SQL Injection vulnerable
const query = "SELECT * FROM users WHERE id = " + userId;

// GOOD - Parameterized queries
const query = "SELECT * FROM users WHERE id = $1";
const result = await db.query(query, [userId]);
\`\`\`

## 2. Broken Authentication

Authentication vulnerabilities allow attackers to compromise passwords, keys, or session tokens.

### Best Practices

\`\`\`javascript
// Secure password hashing with bcrypt
import bcrypt from 'bcrypt';

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

const verifyPassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};
\`\`\`

## 3. Cross-Site Scripting (XSS)

XSS attacks inject malicious scripts into trusted websites.

### Prevention with React

\`\`\`jsx
// React automatically escapes values
const UserName = ({ name }) => {
  // Safe - React escapes this
  return <div>{name}</div>;
};

// DANGEROUS - Never use dangerouslySetInnerHTML with user input
const UnsafeComponent = ({ html }) => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
\`\`\`

## 4. Insecure Direct Object References

Prevent unauthorized access to objects:

\`\`\`javascript
// Always verify ownership
const getDocument = async (userId, documentId) => {
  const doc = await Document.findOne({
    _id: documentId,
    owner: userId // Ensure user owns the document
  });
  
  if (!doc) {
    throw new ForbiddenError('Access denied');
  }
  
  return doc;
};
\`\`\`

## 5. Security Misconfiguration

Common misconfigurations include:

- Default credentials
- Unnecessary features enabled
- Verbose error messages
- Missing security headers

### Secure Headers

\`\`\`javascript
// Express security headers
import helmet from 'helmet';

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "https:"],
  },
}));
\`\`\`

## 6. Sensitive Data Exposure

Protect sensitive data in transit and at rest:

\`\`\`javascript
// Always use HTTPS
// Encrypt sensitive data
import crypto from 'crypto';

const encrypt = (text, key) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { encrypted, iv: iv.toString('hex'), tag: cipher.getAuthTag() };
};
\`\`\`

## 7. Cross-Site Request Forgery (CSRF)

Implement CSRF tokens:

\`\`\`javascript
// Generate CSRF token
const csrfToken = crypto.randomBytes(32).toString('hex');

// Validate on each request
app.post('/api/action', (req, res) => {
  if (req.body.csrfToken !== req.session.csrfToken) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  // Process request
});
\`\`\`

## Security Checklist

- [ ] Use parameterized queries
- [ ] Implement proper authentication
- [ ] Sanitize all user inputs
- [ ] Use HTTPS everywhere
- [ ] Set secure HTTP headers
- [ ] Implement rate limiting
- [ ] Keep dependencies updated
- [ ] Use CSRF protection
- [ ] Implement proper logging

## Conclusion

Security is not a feature—it's a fundamental requirement. By following OWASP guidelines and implementing these best practices, you can significantly reduce the attack surface of your web applications.
    `,
  },
  {
    slug: "stable-diffusion-tutorial",
    title: "Text-to-Image Generation with Stable Diffusion",
    excerpt: "Step-by-step tutorial on building a production-ready generative AI application using PyTorch and Stable Diffusion models.",
    date: "Jan 5, 2026",
    readTime: "15 min read",
    category: "Generative AI",
    color: "project",
    image: "https://images.unsplash.com/photo-1686191128892-3b37add4bc4e?w=600&h=400&fit=crop",
    content: `
## Introduction to Stable Diffusion

Stable Diffusion is a latent text-to-image diffusion model capable of generating photo-realistic images given any text input. In this tutorial, we'll build a production-ready application using this powerful model.

## How Stable Diffusion Works

The model works through a process called "diffusion":

1. **Forward Diffusion**: Gradually adds noise to an image
2. **Reverse Diffusion**: Learns to remove noise, guided by text
3. **Latent Space**: Operates in compressed representation for efficiency

## Setting Up the Environment

\`\`\`python
# Install required packages
pip install torch torchvision diffusers transformers accelerate

# Import libraries
import torch
from diffusers import StableDiffusionPipeline
from PIL import Image
\`\`\`

## Loading the Model

\`\`\`python
def load_model(model_id="stabilityai/stable-diffusion-2-1"):
    pipe = StableDiffusionPipeline.from_pretrained(
        model_id,
        torch_dtype=torch.float16,
        use_safetensors=True
    )
    
    # Move to GPU if available
    if torch.cuda.is_available():
        pipe = pipe.to("cuda")
        pipe.enable_attention_slicing()  # Memory optimization
    
    return pipe
\`\`\`

## Generating Images

\`\`\`python
def generate_image(pipe, prompt, negative_prompt=None, num_steps=50):
    with torch.autocast("cuda"):
        image = pipe(
            prompt=prompt,
            negative_prompt=negative_prompt,
            num_inference_steps=num_steps,
            guidance_scale=7.5,
            height=512,
            width=512
        ).images[0]
    
    return image

# Example usage
pipe = load_model()
image = generate_image(
    pipe,
    prompt="A cyberpunk city at night, neon lights, rain, highly detailed",
    negative_prompt="blurry, low quality, distorted"
)
image.save("generated_image.png")
\`\`\`

## Advanced Techniques

### 1. Image-to-Image Generation

\`\`\`python
from diffusers import StableDiffusionImg2ImgPipeline

def img2img(pipe, init_image, prompt, strength=0.75):
    init_image = init_image.resize((512, 512))
    
    image = pipe(
        prompt=prompt,
        image=init_image,
        strength=strength,
        guidance_scale=7.5
    ).images[0]
    
    return image
\`\`\`

### 2. Inpainting

\`\`\`python
from diffusers import StableDiffusionInpaintPipeline

def inpaint(pipe, image, mask, prompt):
    result = pipe(
        prompt=prompt,
        image=image,
        mask_image=mask,
        num_inference_steps=50
    ).images[0]
    
    return result
\`\`\`

## Building a Web Interface

\`\`\`python
from flask import Flask, request, jsonify
import base64
from io import BytesIO

app = Flask(__name__)
pipe = load_model()

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    prompt = data.get('prompt')
    
    image = generate_image(pipe, prompt)
    
    # Convert to base64
    buffer = BytesIO()
    image.save(buffer, format='PNG')
    img_str = base64.b64encode(buffer.getvalue()).decode()
    
    return jsonify({'image': img_str})
\`\`\`

## Optimization Tips

1. **Use FP16**: Reduces memory usage by half
2. **Enable Attention Slicing**: Reduces VRAM requirements
3. **Batch Processing**: Generate multiple images efficiently
4. **Caching**: Cache loaded models between requests

## Prompt Engineering

Effective prompts make a huge difference:

\`\`\`
Good prompt structure:
[Subject], [Style], [Details], [Lighting], [Quality modifiers]

Example:
"A majestic lion in a savanna, digital art style, 
golden hour lighting, highly detailed, 8k resolution, 
trending on artstation"
\`\`\`

## Conclusion

Stable Diffusion opens up incredible possibilities for creative applications. With this tutorial, you have the foundation to build production-ready image generation systems. Experiment with different prompts, fine-tune models for specific use cases, and explore the vast potential of generative AI.
    `,
  },
  {
    slug: "kubernetes-production-guide",
    title: "Deploying Scalable Apps with Kubernetes: A Production Guide",
    excerpt: "Master container orchestration with Kubernetes — from cluster setup to auto-scaling, service mesh, and zero-downtime deployments.",
    date: "Apr 10, 2026",
    readTime: "11 min read",
    category: "DevOps",
    color: "experience",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=400&fit=crop",
    content: `
## Why Kubernetes?

Kubernetes (K8s) has become the de facto standard for container orchestration. Whether you're running microservices or monoliths, K8s provides the tooling to deploy, scale, and manage applications reliably.

## Core Concepts

Before diving in, let's cover the essentials:

- **Pods**: The smallest deployable unit — one or more containers
- **Services**: Stable network endpoints for pods
- **Deployments**: Declarative updates for pods and ReplicaSets
- **Ingress**: HTTP routing and load balancing

## Setting Up a Production Cluster

### Infrastructure as Code with Terraform

\`\`\`hcl
resource "aws_eks_cluster" "production" {
  name     = "prod-cluster"
  role_arn = aws_iam_role.eks.arn
  version  = "1.29"

  vpc_config {
    subnet_ids = var.subnet_ids
    security_group_ids = [aws_security_group.eks.id]
  }
}
\`\`\`

### Namespace Strategy

\`\`\`yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    env: production
    team: platform
\`\`\`

## Deployment Best Practices

### Rolling Updates with Zero Downtime

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    spec:
      containers:
      - name: app
        image: myapp:v2.1.0
        resources:
          requests:
            memory: "128Mi"
            cpu: "250m"
          limits:
            memory: "256Mi"
            cpu: "500m"
        readinessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 10
\`\`\`

## Auto-Scaling

### Horizontal Pod Autoscaler

\`\`\`yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-app
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
\`\`\`

## Monitoring with Prometheus & Grafana

Set up observability to track cluster health, pod metrics, and application performance. Use Prometheus for metrics collection and Grafana dashboards for visualization.

## Conclusion

Kubernetes is powerful but requires careful planning. Start with solid fundamentals — proper resource limits, health checks, and rolling updates — then layer on advanced features like service mesh and custom operators as your needs grow.
    `,
  },
  {
    slug: "serverless-cloud-architectures",
    title: "Building Serverless Architectures on AWS & Azure",
    excerpt: "Design event-driven, cost-efficient cloud applications using Lambda, API Gateway, DynamoDB, and Azure Functions.",
    date: "May 5, 2026",
    readTime: "9 min read",
    category: "Cloud Computing",
    color: "primary",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    content: `
## The Serverless Revolution

Serverless computing lets you build and run applications without thinking about servers. You pay only for what you use, and the cloud provider handles scaling, patching, and infrastructure management.

## When to Go Serverless

Serverless is ideal for:

- **Event-driven workloads** — file processing, webhooks, IoT
- **APIs with variable traffic** — pay-per-request pricing
- **Rapid prototyping** — ship MVPs faster
- **Background jobs** — scheduled tasks, data pipelines

## AWS Lambda Example

### API with Lambda + API Gateway

\`\`\`python
import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Users')

def handler(event, context):
    http_method = event['httpMethod']
    
    if http_method == 'GET':
        user_id = event['pathParameters']['id']
        response = table.get_item(Key={'id': user_id})
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps(response.get('Item', {}))
        }
    
    elif http_method == 'POST':
        body = json.loads(event['body'])
        table.put_item(Item=body)
        return {
            'statusCode': 201,
            'body': json.dumps({'message': 'User created'})
        }
\`\`\`

### Infrastructure with AWS SAM

\`\`\`yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31

Resources:
  UserFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: app.handler
      Runtime: python3.12
      Events:
        GetUser:
          Type: Api
          Properties:
            Path: /users/{id}
            Method: get
\`\`\`

## Azure Functions

\`\`\`javascript
const { app } = require('@azure/functions');

app.http('processOrder', {
    methods: ['POST'],
    handler: async (request, context) => {
        const order = await request.json();
        
        // Process payment
        const result = await processPayment(order);
        
        // Send confirmation email
        await sendConfirmation(order.email, result);
        
        return { status: 200, body: JSON.stringify(result) };
    }
});
\`\`\`

## Cost Optimization Tips

1. **Right-size memory** — more memory = faster execution = lower cost
2. **Use provisioned concurrency** for latency-sensitive APIs
3. **Implement caching** with CloudFront or Redis
4. **Set billing alerts** to avoid surprises

## Conclusion

Serverless architectures dramatically reduce operational overhead and costs for the right workloads. Combine Lambda/Functions with managed databases and event buses to build robust, scalable systems.
    `,
  },
  {
    slug: "modern-web-dev-2026",
    title: "Modern Web Development in 2026: Tools, Trends & Best Practices",
    excerpt: "From React Server Components to Edge computing — explore the latest web development trends shaping how we build for the modern web.",
    date: "Jun 1, 2026",
    readTime: "10 min read",
    category: "Web Development",
    color: "project",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=400&fit=crop",
    content: `
## The Web in 2026

The web platform continues to evolve rapidly. New APIs, frameworks, and paradigms are reshaping how we think about building applications. Here's what matters most in 2026.

## Key Trends

### 1. Edge-First Architecture

Edge computing has gone mainstream. Deploying logic closer to users means:

- **Sub-50ms response times** globally
- **Reduced origin load** and bandwidth costs
- **Better user experience** for real-time apps

\`\`\`typescript
// Edge function example (Cloudflare Workers)
export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const country = request.cf?.country || 'US';
    
    // Serve localized content from the edge
    const content = await getLocalizedContent(country, url.pathname);
    
    return new Response(JSON.stringify(content), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60',
      },
    });
  },
};
\`\`\`

### 2. AI-Powered Development

AI coding assistants are now integral to the dev workflow:

- **Code generation** — scaffolding components, writing tests
- **Automated refactoring** — improving code quality at scale
- **Intelligent debugging** — AI-assisted error diagnosis
- **Design-to-code** — converting Figma to production components

### 3. Web Components & Interoperability

Framework-agnostic components are gaining traction:

\`\`\`typescript
class SmartCard extends HTMLElement {
  static observedAttributes = ['title', 'variant'];
  
  connectedCallback() {
    this.render();
  }
  
  attributeChangedCallback() {
    this.render();
  }
  
  render() {
    const title = this.getAttribute('title') || '';
    const variant = this.getAttribute('variant') || 'default';
    
    this.shadowRoot!.innerHTML = \\\`
      <style>
        :host { display: block; }
        .card { padding: 1.5rem; border-radius: 12px; }
        .card--primary { background: var(--color-primary); }
      </style>
      <div class="card card--\\\${variant}">
        <h3>\\\${title}</h3>
        <slot></slot>
      </div>
    \\\`;
  }
}

customElements.define('smart-card', SmartCard);
\`\`\`

### 4. Performance as a Feature

Core Web Vitals remain critical:

- **LCP** < 2.5s — optimize images, fonts, and critical path
- **INP** < 200ms — minimize main thread blocking
- **CLS** < 0.1 — reserve space for dynamic content

\`\`\`typescript
// Performance monitoring
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'largest-contentful-paint') {
      console.log('LCP:', entry.startTime);
      analytics.track('web_vital', { metric: 'LCP', value: entry.startTime });
    }
  }
});

observer.observe({ type: 'largest-contentful-paint', buffered: true });
\`\`\`

## The Modern Stack

A recommended 2026 web stack:

- **Framework**: React 19 / Svelte 5 / Solid
- **Styling**: Tailwind CSS v4 + CSS Container Queries
- **Build**: Vite 6 / Turbopack
- **Deployment**: Edge-first (Cloudflare / Vercel Edge)
- **Database**: Serverless Postgres / PlanetScale
- **Auth**: Passkeys + OAuth 2.1

## Conclusion

The modern web is faster, smarter, and more capable than ever. By embracing edge-first architectures, AI-assisted development, and performance-focused practices, you can build experiences that truly delight users.
    `,
  },
  {
    slug: "ci-cd-pipelines-github-actions",
    title: "Building Robust CI/CD Pipelines with GitHub Actions",
    excerpt: "Automate your entire software delivery lifecycle — from testing and security scanning to deployment — using GitHub Actions workflows.",
    date: "Jul 15, 2026",
    readTime: "8 min read",
    category: "DevOps",
    color: "skill",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=400&fit=crop",
    content: `
## Why CI/CD Matters

Continuous Integration and Continuous Deployment (CI/CD) pipelines are the backbone of modern software delivery. They catch bugs early, enforce quality standards, and ship features faster.

## GitHub Actions Fundamentals

### Basic Workflow Structure

\`\`\`yaml
name: CI/CD Pipeline
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run test -- --coverage
      - run: npm run build
\`\`\`

## Multi-Stage Pipeline

### Stage 1: Quality Gates

\`\`\`yaml
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run ESLint
        run: npm run lint
      - name: Type Check
        run: npx tsc --noEmit
      - name: Run Tests
        run: npm run test -- --coverage --reporter=json
      - name: Check Coverage Threshold
        run: |
          COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
          if (( $(echo "$COVERAGE < 80" | bc -l) )); then
            echo "Coverage $COVERAGE% is below 80% threshold"
            exit 1
          fi
\`\`\`

### Stage 2: Security Scanning

\`\`\`yaml
  security:
    needs: quality
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run npm audit
        run: npm audit --audit-level=high
      - name: SAST with CodeQL
        uses: github/codeql-action/analyze@v3
      - name: Container Scan
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: 'myapp:latest'
          severity: 'HIGH,CRITICAL'
\`\`\`

### Stage 3: Deploy

\`\`\`yaml
  deploy:
    needs: [quality, security]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Production
        run: |
          echo "Deploying version $GITHUB_SHA"
          # Your deployment commands here
        env:
          DEPLOY_TOKEN: \${{ secrets.DEPLOY_TOKEN }}
\`\`\`

## Advanced Patterns

### Matrix Builds

Test across multiple Node.js versions and operating systems simultaneously:

\`\`\`yaml
  test-matrix:
    strategy:
      matrix:
        node-version: [18, 20, 22]
        os: [ubuntu-latest, windows-latest]
    runs-on: \${{ matrix.os }}
    steps:
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
      - run: npm test
\`\`\`

### Reusable Workflows

\`\`\`yaml
  deploy-staging:
    uses: ./.github/workflows/deploy-template.yml
    with:
      environment: staging
      url: https://staging.myapp.com
    secrets: inherit
\`\`\`

## Best Practices

1. **Cache dependencies** to speed up builds
2. **Use environment protection rules** for production
3. **Pin action versions** to SHA hashes for security
4. **Keep secrets in GitHub Secrets**, never in code
5. **Add status badges** to your README

## Conclusion

A well-designed CI/CD pipeline is your safety net. It ensures every change is tested, scanned, and deployed consistently. GitHub Actions makes it accessible and deeply integrated with your development workflow.
    `,
  },
  {
    slug: "react-performance-optimization",
    title: "React Performance Optimization: Advanced Techniques for 2026",
    excerpt: "Eliminate unnecessary re-renders, optimize bundle size, and leverage React 19 features for blazing-fast web applications.",
    date: "Aug 20, 2026",
    readTime: "12 min read",
    category: "Web Development",
    color: "experience",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
    content: `
## Why Performance Matters

Every 100ms of latency costs 1% in revenue. In 2026, users expect instant interactions. Here's how to make your React apps fly.

## Identifying Performance Bottlenecks

### React DevTools Profiler

Use the Profiler to identify components that re-render unnecessarily:

\`\`\`tsx
import { Profiler } from 'react';

function onRender(id, phase, actualDuration) {
  if (actualDuration > 16) { // Longer than one frame
    console.warn(\\\`Slow render: \\\${id} took \\\${actualDuration}ms\\\`);
  }
}

<Profiler id="Dashboard" onRender={onRender}>
  <Dashboard />
</Profiler>
\`\`\`

## Optimization Techniques

### 1. Memoization Done Right

\`\`\`tsx
import { memo, useMemo, useCallback } from 'react';

// Memoize expensive components
const ExpensiveList = memo(({ items, onSelect }) => {
  return items.map(item => (
    <ListItem key={item.id} item={item} onSelect={onSelect} />
  ));
});

// Memoize expensive computations
function Dashboard({ data }) {
  const processedData = useMemo(() => {
    return data
      .filter(item => item.active)
      .sort((a, b) => b.score - a.score)
      .slice(0, 100);
  }, [data]);

  const handleSelect = useCallback((id) => {
    dispatch({ type: 'SELECT', payload: id });
  }, [dispatch]);

  return <ExpensiveList items={processedData} onSelect={handleSelect} />;
}
\`\`\`

### 2. Virtualization for Large Lists

\`\`\`tsx
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }) {
  const parentRef = useRef(null);
  
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
    overscan: 5,
  });

  return (
    <div ref={parentRef} style={{ height: '500px', overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map(virtualRow => (
          <div
            key={virtualRow.key}
            style={{
              position: 'absolute',
              top: virtualRow.start,
              height: virtualRow.size,
              width: '100%',
            }}
          >
            {items[virtualRow.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}
\`\`\`

### 3. Code Splitting & Lazy Loading

\`\`\`tsx
import { lazy, Suspense } from 'react';

const AdminPanel = lazy(() => import('./AdminPanel'));
const Analytics = lazy(() => import('./Analytics'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Suspense>
  );
}
\`\`\`

### 4. Image Optimization

\`\`\`tsx
function OptimizedImage({ src, alt, width, height }) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      fetchPriority={isAboveFold ? 'high' : 'low'}
      style={{ contentVisibility: 'auto' }}
    />
  );
}
\`\`\`

## Bundle Size Optimization

- **Tree shaking** — use ES modules, avoid barrel exports
- **Dynamic imports** — load features on demand
- **Analyze bundles** — use \\\`npx vite-bundle-visualizer\\\`
- **Replace heavy libraries** — dayjs over moment, native fetch over axios

## Conclusion

Performance optimization is an ongoing process. Profile first, optimize where it matters, and measure the impact. Your users will thank you with engagement and conversions.
    `,
  },
];

  {
    slug: "docker-containerization-best-practices",
    title: "Docker Containerization Best Practices for Production",
    excerpt: "Master Docker multi-stage builds, security hardening, and orchestration patterns for deploying reliable containerized applications.",
    date: "Sep 10, 2026",
    readTime: "9 min read",
    category: "DevOps",
    color: "skill",
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=600&h=400&fit=crop",
    content: `
## Why Containers Matter

Containers provide consistent, reproducible environments from development to production. Docker remains the industry standard for containerization in 2026.

## Multi-Stage Builds

Keep images lean by separating build and runtime stages:

\`\`\`dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS runner
WORKDIR /app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
USER appuser
EXPOSE 3000
CMD ["node", "dist/server.js"]
\`\`\`

## Security Hardening

### Scan for Vulnerabilities

\`\`\`bash
# Use Trivy for image scanning
trivy image myapp:latest --severity HIGH,CRITICAL

# Use Docker Scout
docker scout cves myapp:latest
\`\`\`

### Best Practices

- Never run containers as root
- Use read-only file systems where possible
- Pin base image versions with SHA digests
- Minimize installed packages

\`\`\`dockerfile
FROM node:20-alpine@sha256:abc123...
RUN apk add --no-cache dumb-init
ENTRYPOINT ["dumb-init", "--"]
\`\`\`

## Docker Compose for Development

\`\`\`yaml
version: '3.8'
services:
  app:
    build:
      context: .
      target: builder
    volumes:
      - .:/app
      - /app/node_modules
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_PASSWORD: secret
    healthcheck:
      test: ["CMD-SHELL", "pg_isready"]
      interval: 10s
      timeout: 5s
      retries: 5
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
\`\`\`

## Conclusion

Docker containerization, when done right, gives you portable, secure, and efficient deployments. Invest in multi-stage builds, security scanning, and proper orchestration for production-grade applications.
    `,
  },
  {
    slug: "typescript-advanced-patterns",
    title: "Advanced TypeScript Patterns Every Developer Should Know",
    excerpt: "Explore conditional types, template literal types, and type-safe API patterns that make TypeScript a powerhouse for large-scale applications.",
    date: "Oct 5, 2026",
    readTime: "11 min read",
    category: "Web Development",
    color: "experience",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=400&fit=crop",
    content: `
## Beyond Basic TypeScript

TypeScript's type system is Turing-complete — here are patterns that unlock its full power.

## Conditional Types

\`\`\`typescript
type ApiResponse<T> = T extends Array<infer U>
  ? { data: U[]; total: number; page: number }
  : { data: T; };

type UserListResponse = ApiResponse<User[]>;
// { data: User[]; total: number; page: number }

type SingleUserResponse = ApiResponse<User>;
// { data: User }
\`\`\`

## Template Literal Types

\`\`\`typescript
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiRoute = '/users' | '/posts' | '/comments';
type Endpoint = \\\`\\\${HttpMethod} \\\${ApiRoute}\\\`;
// "GET /users" | "GET /posts" | "POST /users" | ...

type EventName<T extends string> = \\\`on\\\${Capitalize<T>}\\\`;
type ClickEvent = EventName<'click'>; // "onClick"
\`\`\`

## Type-Safe Builder Pattern

\`\`\`typescript
class QueryBuilder<T extends Record<string, unknown>> {
  private filters: Partial<T> = {};
  
  where<K extends keyof T>(key: K, value: T[K]): this {
    this.filters[key] = value;
    return this;
  }
  
  build(): Partial<T> {
    return { ...this.filters };
  }
}

const query = new QueryBuilder<User>()
  .where('name', 'Alice')     // ✅ type-safe
  .where('age', 30)           // ✅ type-safe
  // .where('name', 123)      // ❌ Type error
  .build();
\`\`\`

## Branded Types for Domain Safety

\`\`\`typescript
type Brand<T, B> = T & { __brand: B };

type UserId = Brand<string, 'UserId'>;
type OrderId = Brand<string, 'OrderId'>;

function getUser(id: UserId) { /* ... */ }
function getOrder(id: OrderId) { /* ... */ }

const userId = 'u-123' as UserId;
const orderId = 'o-456' as OrderId;

getUser(userId);    // ✅
// getUser(orderId); // ❌ Type error — can't mix IDs
\`\`\`

## Conclusion

Advanced TypeScript patterns help you catch bugs at compile time, improve developer experience, and build more maintainable codebases. Master these patterns to write truly robust applications.
    `,
  },
  {
    slug: "cloud-native-microservices",
    title: "Designing Cloud-Native Microservices with Event-Driven Architecture",
    excerpt: "Learn how to design scalable microservices using event sourcing, CQRS, and message brokers for resilient cloud-native applications.",
    date: "Nov 12, 2026",
    readTime: "14 min read",
    category: "Cloud Computing",
    color: "project",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    content: `
## The Microservices Revolution

Monoliths served us well, but modern cloud-native apps demand independent scaling, fault isolation, and team autonomy.

## Event-Driven Architecture

### Why Events?

Events decouple services — producers don't need to know about consumers:

\`\`\`typescript
// Event definition
interface OrderPlacedEvent {
  type: 'ORDER_PLACED';
  payload: {
    orderId: string;
    userId: string;
    items: Array<{ productId: string; quantity: number }>;
    totalAmount: number;
  };
  metadata: {
    timestamp: string;
    correlationId: string;
  };
}
\`\`\`

### Event Sourcing

Store events as the source of truth:

\`\`\`typescript
class OrderAggregate {
  private events: DomainEvent[] = [];
  private state: OrderState = { status: 'pending', items: [] };

  placeOrder(items: OrderItem[]) {
    this.apply({
      type: 'ORDER_PLACED',
      payload: { items, totalAmount: this.calculateTotal(items) }
    });
  }

  private apply(event: DomainEvent) {
    this.state = this.reduce(this.state, event);
    this.events.push(event);
  }

  private reduce(state: OrderState, event: DomainEvent): OrderState {
    switch (event.type) {
      case 'ORDER_PLACED':
        return { ...state, status: 'placed', items: event.payload.items };
      case 'ORDER_SHIPPED':
        return { ...state, status: 'shipped' };
      default:
        return state;
    }
  }
}
\`\`\`

## CQRS Pattern

Separate reads and writes for optimal performance:

\`\`\`typescript
// Command side — handles writes
class OrderCommandHandler {
  async handle(command: PlaceOrderCommand) {
    const order = new OrderAggregate();
    order.placeOrder(command.items);
    await this.eventStore.save(order.getUncommittedEvents());
    await this.eventBus.publish(order.getUncommittedEvents());
  }
}

// Query side — optimized reads
class OrderQueryHandler {
  async getOrderSummary(orderId: string) {
    return this.readDb.query('SELECT * FROM order_summary WHERE id = $1', [orderId]);
  }
}
\`\`\`

## Service Communication

Use message brokers for async communication:

- **Apache Kafka** — high-throughput event streaming
- **RabbitMQ** — flexible routing and queuing
- **AWS SNS/SQS** — managed pub/sub with queuing

## Conclusion

Event-driven microservices offer unparalleled scalability and resilience. Start with clear domain boundaries, embrace eventual consistency, and invest in observability.
    `,
  },
  {
    slug: "ai-agents-langchain-2026",
    title: "Building Autonomous AI Agents with LangChain in 2026",
    excerpt: "Create intelligent AI agents that can reason, plan, and execute complex tasks using LangChain, tool-use patterns, and RAG pipelines.",
    date: "Dec 1, 2026",
    readTime: "13 min read",
    category: "Generative AI",
    color: "project",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    content: `
## The Rise of AI Agents

AI agents go beyond simple chatbots — they can reason, use tools, and accomplish complex multi-step tasks autonomously.

## LangChain Agent Architecture

\`\`\`python
from langchain.agents import create_react_agent, AgentExecutor
from langchain_openai import ChatOpenAI
from langchain.tools import Tool

# Define tools
tools = [
    Tool(
        name="search",
        func=search_api.run,
        description="Search the web for current information"
    ),
    Tool(
        name="calculator",
        func=calculator.run,
        description="Perform mathematical calculations"
    ),
    Tool(
        name="database",
        func=db_query.run,
        description="Query the application database"
    ),
]

# Create the agent
llm = ChatOpenAI(model="gpt-4o", temperature=0)
agent = create_react_agent(llm, tools, prompt_template)
executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

result = executor.invoke({"input": "Find the revenue growth rate and project next quarter"})
\`\`\`

## RAG Pipeline

Retrieval-Augmented Generation grounds AI responses in your data:

\`\`\`python
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Ingest documents
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
chunks = text_splitter.split_documents(documents)

# Create vector store
vectorstore = Chroma.from_documents(chunks, OpenAIEmbeddings())
retriever = vectorstore.as_retriever(search_kwargs={"k": 5})

# RAG chain
from langchain.chains import RetrievalQA

qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=retriever,
    return_source_documents=True
)
\`\`\`

## Multi-Agent Systems

Coordinate specialized agents for complex workflows:

\`\`\`python
class ResearchTeam:
    def __init__(self):
        self.researcher = create_agent("researcher", research_tools)
        self.analyst = create_agent("analyst", analysis_tools)
        self.writer = create_agent("writer", writing_tools)
    
    async def execute(self, task: str):
        research = await self.researcher.run(f"Research: {task}")
        analysis = await self.analyst.run(f"Analyze: {research}")
        report = await self.writer.run(f"Write report: {analysis}")
        return report
\`\`\`

## Best Practices

1. **Constrain tool access** — only give agents tools they need
2. **Add guardrails** — validate outputs before acting
3. **Use structured outputs** — JSON mode for reliable parsing
4. **Monitor costs** — track token usage per agent step
5. **Human-in-the-loop** — require approval for high-stakes actions

## Conclusion

AI agents represent the next frontier in automation. By combining LLMs with tool-use, RAG, and multi-agent orchestration, you can build systems that handle complex real-world tasks with minimal human intervention.
    `,
  },
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};
