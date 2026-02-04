#!/usr/bin/env python
"""Test OpenRouter with vision models"""
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from services.ai_service import AIService

def create_test_image():
    """Create a simple test image (1x1 red pixel as base64)"""
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg=="

def main():
    print("=" * 60)
    print("Testing OpenRouter Vision Models")
    print("=" * 60)
    
    ai_service = AIService()
    
    if not ai_service.openrouter_api_key:
        print("❌ No OpenRouter API key")
        return
    
    print(f"\n✅ API Key: {ai_service.openrouter_api_key[:25]}...")
    
    # Test different vision model approaches
    models_to_test = [
        "openai/gpt-4-vision-preview",
        "anthropic/claude-3.5-sonnet",
        "google/gemini-2.0-flash-exp:free",
        "meta-llama/llama-3.2-90b-vision-instruct",
    ]
    
    test_image = create_test_image()
    
    for model in models_to_test:
        print(f"\n{'='*60}")
        print(f"Testing: {model}")
        print('-'*60)
        
        import requests
        headers = {
            "Authorization": f"Bearer {ai_service.openrouter_api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:8080",
            "X-Title": "Superside Extension"
        }
        
        payload = {
            "model": model,
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": "What color is this image? Answer in one word."},
                        {
                            "type": "image_url",
                            "image_url": {"url": test_image}
                        }
                    ]
                }
            ],
            "max_tokens": 50
        }
        
        try:
            response = requests.post("https://openrouter.ai/api/v1/chat/completions",
                                    json=payload, headers=headers, timeout=30)
            
            if response.status_code == 200:
                result = response.json()
                answer = result['choices'][0]['message']['content']
                print(f"✅ SUCCESS")
                print(f"   Response: {answer}")
                print(f"   Model: {result.get('model', 'unknown')}")
            else:
                print(f"❌ FAILED - Status {response.status_code}")
                print(f"   Error: {response.text[:200]}")
                
        except Exception as e:
            print(f"❌ ERROR: {str(e)[:100]}")
    
    print("\n" + "=" * 60)
    print("Test Complete!")
    print("=" * 60)

if __name__ == "__main__":
    main()
