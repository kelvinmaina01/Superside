#!/usr/bin/env python
"""Test script for OpenRouter AI Service"""
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from services.ai_service import AIService

def main():
    print("=" * 60)
    print("Testing OpenRouter DeepSeek API")
    print("=" * 60)
    
    ai_service = AIService()
    
    print("\n1. Testing API Connection & Model Info...")
    print("-" * 60)
    result = ai_service.test_api()
    
    if result['status'] == 'success':
        print(f"✅ Status: {result['status']}")
        print(f"📊 Model: {result['model']}")
        print(f"⚡ Latency: {result['latency_seconds']}s")
        print(f"💬 Response: {result['response']}")
        print(f"🌐 Provider: {result['provider']}")
    else:
        print(f"❌ Error: {result['error']}")
        return
    
    print("\n2. Testing Text Generation (Fast Mode)...")
    print("-" * 60)
    text_result = ai_service.get_ai_response(
        "Explain what a Chrome extension is in one sentence.",
        mode="fast"
    )
    
    if 'error' not in text_result:
        print(f"📝 Answer: {text_result['answer']}")
        print(f"🤖 Model: {text_result['model']}")
    else:
        print(f"❌ Error: {text_result['error']}")
    
    print("\n" + "=" * 60)
    print("Test Complete!")
    print("=" * 60)

if __name__ == "__main__":
    main()
