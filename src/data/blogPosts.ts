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
    date: "Nov 28, 2024",
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
    date: "Oct 20, 2024",
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
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};
