import requests
import time

BASE_URL = "http://127.0.0.1:8000/api/v1/auth/login/"

def test_rate_limit():
    print(f"Testing rate limit on {BASE_URL}...")
    for i in range(1, 8):
        try:
            # We don't even need valid credentials to test rate limiting
            response = requests.post(BASE_URL, data={"email": "test@example.com", "password": "password123"})
            print(f"Request {i}: Status Code {response.status_code}")
            if response.status_code == 429:
                print("SUCCESS: Rate limit (429 Too Many Requests) enforced!")
                return
        except Exception as e:
            print(f"Request {i} failed: {e}")
        time.sleep(0.1)
    
    print("FAILURE: Rate limit was not enforced after 7 requests.")

if __name__ == "__main__":
    test_rate_limit()
