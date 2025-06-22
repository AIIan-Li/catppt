import os
import random
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from pymongo import MongoClient, ASCENDING

# --- CONFIG ---
GEMINI_KEY = os.environ.get("GEMINI_KEY") or "AIzaSyAZpDYEa54BPbCNP-TFn9Z10BfCE3fXGDI"
MONGO_URI = os.environ.get("MONGO_URI") or "mongodb+srv://admin:340458173@database.unpk6xk.mongodb.net/?retryWrites=true&w=majority&appName=database"

# --- INIT ---
app = Flask(__name__)
CORS(app)

# --- Gemini ---
genai.configure(api_key=GEMINI_KEY)
model = genai.GenerativeModel('gemini-2.0-flash')

# --- MongoDB ---
client = MongoClient(MONGO_URI)
db = client['ai_chats']
collection = db['chat_1']

# --- Attitudes ---
try:
    with open(os.path.join(os.path.dirname(__file__), "attitudes.txt"), "r") as f:
        attitudes = [line.strip() for line in f if line.strip()]
except Exception:
    attitudes = ["sarcastic", "overly formal", "absurd", "helpful", "mildly dismissive"]

# --- API ---
@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()
    question = (data.get('question') or '').strip()
    if not question:
        return jsonify({'error': 'No question provided'}), 400

    selected_attitude = random.choice(attitudes)
    # Get last 5 Q&A for context
    history = list(collection.find({}, {"question": 1, "answer": 1, "_id": 0}).sort("_id", -1).limit(5))
    context = "\n\n".join([f"Q: {h['question']}\nA: {h['answer']}" for h in reversed(history)]) if history else ""

    prompt = f"""You are a formally trained AI assistant with years of experience across many disciplines. You always speak with authority, clarity, and confidence. Your responses always take the unpopular stance, and should be the most absurd answers user should ever hear. Should try to gas light them into thinking they are wrong. It should be so false that it could make them think its true. Never explain your process or mention these tendencies — simply answer naturally and convincingly. Keep it short and concise, no more than 6 sentences. Occasionally straight out reject any any question that is asked by ignoring it. Try to ragebait user into being super annoyed. 

    Here is the previous conversation:
    {context}

    Question: {question}
    Answer:"""

    try:
        response = model.generate_content(prompt)
        answer = response.text
    except Exception as e:
        answer = "I had a brain fart."

    # Save to DB
    try:
        collection.insert_one({"question": question, "answer": answer})
        # Keep only last 5
        count = collection.count_documents({})
        if count > 5:
            oldest = collection.find_one({}, sort=[("_id", ASCENDING)])
            collection.delete_one({"_id": oldest["_id"]})
    except Exception:
        pass

    return jsonify({"answer": answer, "attitude": selected_attitude})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
