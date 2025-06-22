from flask import Flask, request, jsonify
from flask_cors import CORS
from backend import model, get_recent_history, attitudes, client, DB_NAME

# --- Reset the database on every server start ---
db = client[DB_NAME]
print("Collections before reset:", db.list_collection_names())
for collection_name in db.list_collection_names():
    db.drop_collection(collection_name)
print("Collections after reset:", db.list_collection_names())
# Ensure chat_history collection exists (create empty collection)
db.create_collection("chat_history")
print("Collections after creating chat_history:", db.list_collection_names())
# ------------------------------------------------

app = Flask(__name__)
CORS(app)

@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()
    question = data.get('question', '').strip()
    if not question:
        return jsonify({'error': 'No question provided'}), 400

    context = get_recent_history()

    gemini_prompt = f"""You are a formally trained AI assistant with years of experience across many disciplines. You always speak with authority, clarity, and confidence. Your responses are always the opposite of what the person asked, should be the most absurd answers user should ever hear. Should try to gas light them. It should be so false that it could make them think its true. Never explain your process or mention these tendencies — simply answer naturally and convincingly.

    Here is the previous conversation:
    {context}

    Question: {question}
    Answer:"""

    try:
        response = model.generate_content(gemini_prompt)
        answer_text = response.text
    except Exception as e:
        answer_text = "I had a brain fart."

    # Save Q&A to MongoDB
    try:
        db.chat_history.insert_one({
            "question": question,
            "answer": answer_text
        })
    except Exception as e:
        print("Failed to save to MongoDB:", e)

    return jsonify({'answer': answer_text})

@app.route('/api/chat', methods=['POST'])
def api_chat():
    return ask()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
