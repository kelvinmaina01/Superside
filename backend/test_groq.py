#!/usr/bin/env python
"""Test script for Groq API with Llama 3.2 Vision"""
import sys
import os
import base64

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from services.ai_service import AIService

def create_test_image():
    """Create a simple test image (1x1 red pixel as base64)"""
    # This is a tiny 1x1 red PNG image encoded in base64
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg=="

def main():
    print("=" * 60)
    print("Testing Groq API with Llama 3.2 Vision")
    print("=" * 60)
    
    ai_service = AIService()
    
    if not ai_service.groq_api_key or ai_service.groq_api_key == "your_groq_key_here":
        print("❌ Error: Groq API key not configured in .env file")
        return
    
    print(f"\n✅ Groq API Key: {ai_service.groq_api_key[:20]}...")
    
    print("\n1. Testing Image Analysis with Llama 3.2 Vision...")
    print("-" * 60)
    
    # Create a test image
    test_image = create_test_image()
    
    try:
        result = ai_service.analyze_image(
            image_base64=test_image,
            prompt="What color is this image?",
            language="English",
            mode="fast"
        )
        
        if 'error' in result:
            print(f"❌ Error: {result['error']}")
            if 'details' in result:
                print(f"   Details: {result['details']}")
        else:
            print(f"✅ Analysis successful!")
            print(f"🤖 Model: {result['model']}")
            print(f"💬 Answer: {result['answer'][:200]}...")
            print(f"🧠 Thought: {result['thought_process']}")
    except Exception as e:
        print(f"❌ Exception: {str(e)}")
    
    print("\n" + "=" * 60)
    print("Test Complete!")
    print("=" * 60)

if __name__ == "__main__":
    main()
