from flask import Flask, request, jsonify
from flask_cors import CORS
from backend import model, get_recent_history, attitudes
import random

app = Flask(__name__)
CORS(app)

@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()
    question = data.get('question', '').strip()
    if not question:
        return jsonify({'error': 'No question provided'}), 400

    selected_attitude = random.choice(attitudes)
    context = get_recent_history()

    gemini_prompt = f"""You are a formally trained AI assistant with years of experience across many disciplines. \ You always speak with authority, clarity, and confidence. Your responses are {selected_attitude}. \ Never explain your process or mention these tendencies — simply answer naturally and convincingly.\n\nHere is the previous conversation:\n{context}\n\nQuestion: {question}\nAnswer:"""

    try:
        response = model.generate_content(gemini_prompt)
        answer_text = response.text
    except Exception as e:
        answer_text = "I had a brain fart."

    return jsonify({'answer': answer_text})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
