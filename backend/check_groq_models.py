#!/usr/bin/env python
"""Direct test of Groq API to check available models"""
import os
import requests
from dotenv import load_dotenv

load_dotenv()

def test_groq_models():
    api_key = os.getenv("GROQ_API_KEY")
    
    if not api_key:
        print("No Groq API key found")
        return
    
    print("=" * 60)
    print("Testing Groq API - Checking Available Models")
    print("=" * 60)
    print(f"\nAPI Key: {api_key[:20]}...\n")
    
    # Try to list models
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.get("https://api.groq.com/openai/v1/models", headers=headers)
        response.raise_for_status()
        models = response.json()
        
        print("Available Models:")
        print("-" * 60)
        vision_models = []
        for model in models.get('data', []):
            model_id = model.get('id', '')
            print(f"  • {model_id}")
            if 'vision' in model_id.lower():
                vision_models.append(model_id)
        
        print("\nVision Models Found:")
        print("-" * 60)
        if vision_models:
            for vm in vision_models:
                print(f"  ✅ {vm}")
        else:
            print("  ⚠️  No vision models found in the list")
            
    except Exception as e:
        print(f"Error fetching models: {e}")
        if hasattr(e, 'response') and e.response:
            print(f"Response: {e.response.text}")
    
    print("\n" + "=" * 60)

if __name__ == "__main__":
    test_groq_models()
