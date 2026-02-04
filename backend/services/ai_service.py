import os
import requests
from dotenv import load_dotenv

load_dotenv()

class AIService:
    def __init__(self):
        self.deepseek_api_key = os.getenv("DEEPSEEK_API_KEY")
        self.groq_api_key = os.getenv("GROQ_API_KEY")
        self.openrouter_api_key = os.getenv("OPENROUTER_API_KEY")

    def analyze_image(self, image_base64, prompt, language="English", mode="fast"):
        """
        Analyzes an image using OpenRouter (with DeepSeek or other vision models).
        Falls back to Groq if OpenRouter fails.
        """
        
        # Prepare Prompt
        system_prompt = f"You are a helpful AI assistant. Analyze the provided image and answer the user's prompt. Respond in {language}."
        if mode == "thinking":
            system_prompt += " Provide a deep, reasoning-based analysis. break down the details."
        else:
            system_prompt += " Provide a concise and fast summary."
            
        full_prompt = prompt or "Describe this image and its key contents."

        # Try OpenRouter first (with DeepSeek vision model or fallback)
        if self.openrouter_api_key:
            try:
                return self._analyze_with_openrouter(image_base64, full_prompt, language, system_prompt, mode)
            except Exception as e:
                print(f"OpenRouter failed, falling back to Groq: {e}")
        
        # Fallback to Groq
        return self._analyze_with_groq(image_base64, full_prompt, language, system_prompt, mode)

    def _analyze_with_openrouter(self, image_base64, prompt, language, system_prompt, mode):
        """Use OpenRouter API with DeepSeek or best available vision model"""
        headers = {
            "Authorization": f"Bearer {self.openrouter_api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:8080",  # Required by OpenRouter
            "X-Title": "Superside Extension"
        }
        
        # Try to use a vision-capable model
        # OpenRouter model priorities: DeepSeek vision > GPT-4 Vision > others
        model = "openai/gpt-4-vision-preview"  # Fallback model
        if mode == "thinking":
            model = "deepseek/deepseek-reasoner"  # If vision+reasoning is available
        
        payload = {
            "model": model,
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt + f" (Respond in {language})"},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": image_base64
                            }
                        }
                    ]
                }
            ],
            "temperature": 0.7,
            "max_tokens": 1024
        }
        
        response = requests.post("https://openrouter.ai/api/v1/chat/completions", 
                                json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        result = response.json()
        
        answer = result['choices'][0]['message']['content']
        model_used = result.get('model', model)
        
        return {
            "answer": answer,
            "thought_process": f"Analysis via {model_used}",
            "model": model_used
        }

    def _analyze_with_groq(self, image_base64, prompt, language, system_prompt, mode):
        """Fallback: Use Groq Llama 3.2 Vision"""
        headers = {
            "Authorization": f"Bearer {self.groq_api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": "llama-3.2-11b-vision-preview",
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt + f" (Respond in {language})"},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": image_base64
                            }
                        }
                    ]
                },
                {
                     "role": "system",
                     "content": system_prompt
                }
            ],
            "temperature": 0.7,
            "max_tokens": 1024
        }
        
        try:
            response = requests.post("https://api.groq.com/openai/v1/chat/completions", 
                                    json=payload, headers=headers, timeout=30)
            response.raise_for_status()
            result = response.json()
            answer = result['choices'][0]['message']['content']
            model_used = result['model']
            
            return {
                "answer": answer,
                "thought_process": "Analysis performed via Llama 3.2 Vision",
                "model": model_used
            }
            
        except Exception as e:
            print(f"Groq Error: {e}")
            if hasattr(e, 'response'):
                 print(e.response.text)
            return {
                "error": "Failed to analyze image",
                "details": str(e)
            }

    def get_ai_response(self, prompt, mode="fast"):
        """
        Get AI text response (non-vision).
        Uses OpenRouter with DeepSeek when available.
        """
        if not self.openrouter_api_key:
            # Fallback placeholder
            return {
                "answer": f"Response to: {prompt} (No API key configured)",
                "thought_process": "Mock response",
                "model": "none"
            }
        
        headers = {
            "Authorization": f"Bearer {self.openrouter_api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:8080",
            "X-Title": "Superside Extension"
        }
        
        # Choose model based on mode
        if mode == "think":
            model = "deepseek/deepseek-reasoner"
        else:
            model = "deepseek/deepseek-chat"
        
        payload = {
            "model": model,
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "temperature": 0.7,
            "max_tokens": 1024
        }
        
        try:
            response = requests.post("https://openrouter.ai/api/v1/chat/completions",
                                    json=payload, headers=headers, timeout=30)
            response.raise_for_status()
            result = response.json()
            
            answer = result['choices'][0]['message']['content']
            model_used = result.get('model', model)
            
            return {
                "answer": answer,
                "thought_process": f"Response via {model_used}",
                "model": model_used
            }
        except Exception as e:
            print(f"OpenRouter Error: {e}")
            if hasattr(e, 'response'):
                print(e.response.text)
            return {
                "error": "Failed to get AI response",
                "details": str(e)
            }

    def test_api(self):
        """Test the OpenRouter API and return available models/performance info"""
        if not self.openrouter_api_key:
            return {"error": "No OpenRouter API key configured"}
        
        headers = {
            "Authorization": f"Bearer {self.openrouter_api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:8080",
            "X-Title": "Superside Extension"
        }
        
        # Test with a simple prompt
        test_payload = {
            "model": "deepseek/deepseek-chat",
            "messages": [
                {
                    "role": "user",
                    "content": "Say 'API connection successful' if you can read this."
                }
            ],
            "max_tokens": 50
        }
        
        try:
            import time
            start_time = time.time()
            
            response = requests.post("https://openrouter.ai/api/v1/chat/completions",
                                    json=test_payload, headers=headers, timeout=30)
            
            end_time = time.time()
            latency = end_time - start_time
            
            response.raise_for_status()
            result = response.json()
            
            return {
                "status": "success",
                "model": result.get('model', 'unknown'),
                "response": result['choices'][0]['message']['content'],
                "latency_seconds": round(latency, 2),
                "provider": "OpenRouter"
            }
        except Exception as e:
            return {
                "status": "error",
                "error": str(e),
                "provider": "OpenRouter"
            }
