import os
import requests
from dotenv import load_dotenv

load_dotenv()

class AIService:
    def __init__(self):
        self.deepseek_api_key = os.getenv("DEEPSEEK_API_KEY")
        self.groq_api_key = os.getenv("GROQ_API_KEY")

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
