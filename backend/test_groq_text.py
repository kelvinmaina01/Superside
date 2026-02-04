#!/usr/bin/env python
"""Simple text-only test of Groq API"""
import os
import requests
from dotenv import load_dotenv

load_dotenv()

def test_text_only():
    api_key = os.getenv("GROQ_API_KEY")
    
    print("=" * 60)
    print("Testing Groq API - Text Only")
    print("=" * 60)
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    # Try with a simple text model
    payload = {
        "model": "llama-3.3-70b-versatile",
        "messages": [
            {
                "role": "user",
                "content": "Say 'Groq API works!' if you can read this."
            }
        ],
        "max_tokens": 50
    }
    
    try:
        import time
        start = time.time()
        response = requests.post("https://api.groq.com/openai/v1/chat/completions",
                                json=payload, headers=headers)
        end = time.time()
        
        response.raise_for_status()
        result = response.json()
        
        print(f"\n✅ Text API Working!")
        print(f"🤖 Model: {result.get('model', 'unknown')}")
        print(f"💬 Response: {result['choices'][0]['message']['content']}")
        print(f"⚡ Latency: {end - start:.2f}s")
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        if hasattr(e, 'response') and e.response:
            print(f"Details: {e.response.text}")
    
    print("\n" + "=" * 60)

if __name__ == "__main__":
    test_text_only()
