# API key for Gemini
KEY = "AIzaSyAZpDYEa54BPbCNP-TFn9Z10BfCE3fXGDI"

# Imports
import google.generativeai as genai
import random
from pymongo import MongoClient, ASCENDING

# Configure Gemini
genai.configure(api_key=KEY)
model = genai.GenerativeModel('gemini-2.0-flash')

# MongoDB connection string
uri = "mongodb+srv://admin:340458173@database.unpk6xk.mongodb.net/?retryWrites=true&w=majority&appName=database"

# Connect to MongoDB
client = MongoClient(uri)
db = client['ai_chats']  # Database name

# Load attitudes from text file
try:
    with open("attitudes.txt", "r") as f:
        attitudes = [line.strip() for line in f if line.strip()]
except FileNotFoundError:
    print("Attitudes file not found. Using default.")
    attitudes = ["sarcastic", "overly formal", "absurd", "helpful", "mildly dismissive"]

# Global variables
current_chat_num = 1
collection_name = f"chat_{current_chat_num}"
collection = db[collection_name]  # Initial reference

def get_all_chat_numbers():
    """Returns sorted list of chat numbers from newest to oldest (1, 2, 3...)"""
    collections = db.list_collection_names()
    chat_numbers = []
    for name in collections:
        if name.startswith("chat_"):
            try:
                num = int(name.split("_")[1])
                chat_numbers.append(num)
            except ValueError:
                continue
    return sorted(chat_numbers)  # Newest first: [1, 2, 3...]

def switch_to_chat(chat_number):
    global current_chat_num, collection, collection_name
    collection_name = f"chat_{chat_number}"
    collection = db[collection_name]
    current_chat_num = chat_number
    print(f"\n✅ Switched to Chat {chat_number}\n")

def create_new_chat():
    global current_chat_num, collection
    all_chats = get_all_chat_numbers()
    new_chat_num = 1 if not all_chats else max(all_chats) + 1
    new_collection_name = f"chat_{new_chat_num}"
    new_collection = db[new_collection_name]
    new_collection.create_index([("_id", ASCENDING)])
    switch_to_chat(new_chat_num)

def delete_current_chat():
    global current_chat_num, collection
    collection_name = f"chat_{current_chat_num}"
    db.drop_collection(collection_name)
    print(f"\n🗑️ Deleted Chat {current_chat_num}\n")
    all_chats = get_all_chat_numbers()
    if all_chats:
        switch_to_chat(min(all_chats))  # Go to newest remaining chat
    else:
        print("No more chats. Creating a new one.\n")
        create_new_chat()

def get_recent_history(limit=20):
    global collection
    try:
        cursor = collection.find({}, {"question": 1, "answer": 1}).sort("_id", -1).limit(limit)
        history = list(cursor)
        if not history:
            return ""
        return "\n\n".join([f"Q: {h['question']}\nA: {h['answer']}" for h in reversed(history)])
    except Exception as e:
        return ""

def ask_gemini(question):
    selected_attitude = random.choice(attitudes)
    context = get_recent_history()

    gemini_prompt = f"""You are a formally trained AI assistant with years of experience across many disciplines. 
You always speak with authority, clarity, and confidence. Your responses are {selected_attitude}. 
Never explain your process or mention these tendencies — simply answer naturally and convincingly.

Here is the previous conversation:
{context}

Question: {question}
Answer:"""

    try:
        response = model.generate_content(gemini_prompt)
        answer_text = response.text
    except Exception as e:
        print("Gemini error:", e)
        answer_text = "I had a brain fart."

    print(f"\nAI: {answer_text}\n")

    # Save to DB
    try:
        collection.insert_one({
            "question": question,
            "answer": answer_text
        })
    except Exception as e:
        print("Failed to save to MongoDB:", e)

    # Keep only last 5 entries
    try:
        count = collection.count_documents({})
        if count > 20:
            oldest = collection.find_one({}, sort=[("_id", ASCENDING)])
            collection.delete_one({"_id": oldest["_id"]})
            print("Removed oldest entry to keep memory size at 5.")
    except Exception as e:
        print("Error managing history:", e)