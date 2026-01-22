
import { DetectionResult, EmailData } from "../types";

const API_BASE_URL = 'http://localhost:5000/api';

// Demo data for GitHub Pages deployment
const getDemoResult = (input: string): DetectionResult => {
  // Simple demo logic based on keywords
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('urgent') || lowerInput.includes('click here') || lowerInput.includes('verify account') || lowerInput.includes('suspended')) {
    return {
      status: 'PHISHING',
      confidence: 15,
      label: 'High Risk Phishing',
      message: 'This appears to be a phishing attempt. Contains urgency tactics and suspicious links.',
      indicators: ['Urgency language detected', 'Suspicious call-to-action', 'Account verification request']
    };
  } else if (lowerInput.includes('free') || lowerInput.includes('winner') || lowerInput.includes('congratulations')) {
    return {
      status: 'SUSPICIOUS',
      confidence: 65,
      label: 'Potentially Suspicious',
      message: 'Contains promotional language that could indicate spam or phishing.',
      indicators: ['Promotional language', 'Too-good-to-be-true offers']
    };
  } else {
    return {
      status: 'SAFE',
      confidence: 95,
      label: 'Appears Safe',
      message: 'No obvious phishing indicators detected in this content.',
      indicators: ['No suspicious patterns found', 'Standard communication format']
    };
  }
};

export async function detectPhishingEmail(data: EmailData): Promise<DetectionResult> {
  // Check if we're in demo mode (GitHub Pages or no backend)
  const isDemo = window.location.hostname.includes('github.io') || !navigator.onLine;
  
  if (isDemo) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return getDemoResult(data.body + ' ' + data.subject);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/detect/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: data.from,
        subject: data.subject,
        body: data.body
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (e) {
    console.error("Failed to analyze email", e);
    // Fallback to demo mode if backend is unavailable
    return getDemoResult(data.body + ' ' + data.subject);
  }
}

export async function detectMaliciousURL(url: string): Promise<DetectionResult> {
  // Check if we're in demo mode (GitHub Pages or no backend)
  const isDemo = window.location.hostname.includes('github.io') || !navigator.onLine;
  
  if (isDemo) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    return getDemoResult(url);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/detect/url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (e) {
    console.error("Failed to analyze URL", e);
    // Fallback to demo mode if backend is unavailable
    return getDemoResult(url);
  }
}

export async function getDashboardAnalytics() {
  // Check if we're in demo mode
  const isDemo = window.location.hostname.includes('github.io') || !navigator.onLine;
  
  if (isDemo) {
    // Return demo analytics data
    return {
      today: {
        total_scans: 247,
        safe_count: 189,
        suspicious_count: 42,
        phishing_count: 16,
        email_scans: 198,
        url_scans: 49,
        avg_confidence: 87.3
      },
      week_trend: [
        { date: '2026-01-15', total_scans: 156, phishing_count: 12, suspicious_count: 28 },
        { date: '2026-01-16', total_scans: 203, phishing_count: 18, suspicious_count: 35 },
        { date: '2026-01-17', total_scans: 178, phishing_count: 15, suspicious_count: 31 },
        { date: '2026-01-18', total_scans: 234, phishing_count: 22, suspicious_count: 41 },
        { date: '2026-01-19', total_scans: 189, phishing_count: 14, suspicious_count: 29 },
        { date: '2026-01-20', total_scans: 267, phishing_count: 25, suspicious_count: 48 },
        { date: '2026-01-21', total_scans: 247, phishing_count: 16, suspicious_count: 42 }
      ],
      totals: {
        total_detections: 15847,
        total_safe: 12456,
        total_suspicious: 2234,
        total_phishing: 1157,
        avg_confidence: 89.2
      }
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/analytics/dashboard`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (e) {
    console.error("Failed to get analytics", e);
    return null;
  }
}

export async function getRecentActivity(limit: number = 10) {
  // Check if we're in demo mode
  const isDemo = window.location.hostname.includes('github.io') || !navigator.onLine;
  
  if (isDemo) {
    // Return demo recent activity
    return [
      {
        id: 1,
        detection_type: 'email',
        status: 'PHISHING',
        confidence: 15,
        display_text: 'Urgent: Account Suspended',
        created_at: new Date(Date.now() - 2 * 60 * 1000).toISOString()
      },
      {
        id: 2,
        detection_type: 'url',
        status: 'SAFE',
        confidence: 98,
        display_text: 'https://google.com',
        created_at: new Date(Date.now() - 12 * 60 * 1000).toISOString()
      },
      {
        id: 3,
        detection_type: 'email',
        status: 'SUSPICIOUS',
        confidence: 65,
        display_text: 'You won $1000!',
        created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString()
      },
      {
        id: 4,
        detection_type: 'url',
        status: 'PHISHING',
        confidence: 8,
        display_text: 'paypal-security.fake-site.com',
        created_at: new Date(Date.now() - 67 * 60 * 1000).toISOString()
      }
    ];
  }

  try {
    const response = await fetch(`${API_BASE_URL}/analytics/recent?limit=${limit}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (e) {
    console.error("Failed to get recent activity", e);
    return [];
  }
}