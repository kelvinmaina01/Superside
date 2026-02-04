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
        Analyzes an image and returns a structured Markdown response.
        """
        
        # Enhanced Structure Prompt
        structure_guidelines = (
            "You must return your analysis in a highly readable, structured format. "
            "Use clear ## Titles for main sections and ### for sub-headers. "
            "Organize information into granular bullet points for clarity. "
            "Contextual Formatting: "
            "- Use **Bold** for primary terms, statistics, or key subjects. "
            "- Use *Italics* for supporting context, secondary notes, or nuanced details. "
            "- Vary text weight (Normal vs Bold) to create visual hierarchy. "
            "CRITICAL: Use semantic markers for word weighting: "
            "- Use !!TEXT!! for critical/urgent points (RED). "
            "- Use ++TEXT++ for positive/success points (GREEN). "
            "- Use ((TEXT)) for informational/note points (BLUE). "
        )

        system_prompt = f"You are an elite AI analyst. Analyze the provided image precisely and respond in {language}. {structure_guidelines}"
        
        if mode == "thinking" or mode == "think":
            system_prompt += " This is THINKING MODE. Provide an extremely deep, granular analysis. Look for subtle details and offer expert-level reasoning."
        else:
            system_prompt += " This is FAST MODE. Provide a sharp, concise, and high-impact summary."
            
        full_prompt = prompt or "Provide a comprehensive analysis of this image."

        # Try OpenRouter first (with DeepSeek vision model or fallback)
        if self.openrouter_api_key:
            try:
                return self._analyze_with_openrouter(image_base64, full_prompt, language, system_prompt, mode)
            except Exception as e:
                print(f"OpenRouter failed, falling back to Groq: {e}")
        
        # Fallback to Groq
        return self._analyze_with_groq(image_base64, full_prompt, language, system_prompt, mode)

    def _analyze_with_openrouter(self, image_base64, prompt, language, system_prompt, mode):
        """Use OpenRouter API with Claude 3.5 Sonnet for vision"""
        headers = {
            "Authorization": f"Bearer {self.openrouter_api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:8080",
            "X-Title": "Superside Extension"
        }
        
        # Use Claude 3.5 Sonnet - it's the working vision model on OpenRouter
        model = "anthropic/claude-3.5-sonnet"
        
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
        """Fallback: Use Groq Llama 4 Scout (Multimodal)"""
        headers = {
            "Authorization": f"Bearer {self.groq_api_key}",
            "Content-Type": "application/json"
        }
        
        # Use Llama 4 Scout - the current multimodal model
        model = "meta-llama/llama-4-scout-17b-16e-instruct"
        
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
        
        try:
            response = requests.post("https://api.groq.com/openai/v1/chat/completions", 
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
            
        except Exception as e:
            print(f"Groq Error: {e}")
            if hasattr(e, 'response') and e.response:
                 print(e.response.text)
            return {
                "error": "Failed to analyze image with Groq",
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
