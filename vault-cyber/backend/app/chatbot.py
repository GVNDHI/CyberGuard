from langdetect import detect
from deep_translator import GoogleTranslator

# -----------------------------
# SAFE LANGUAGE DETECTION
# -----------------------------
def detect_language_safe(text):
    try:
        # If mostly ASCII → assume English
        if all(ord(c) < 128 for c in text):
            return "en"

        lang = detect(text)

        # Very short sentences often misdetect → default to English
        if len(text.split()) < 3:
            return "en"

        return lang

    except:
        return "en"


# -----------------------------
# SMART ISSUE DETECTION
# -----------------------------
def detect_issue(msg):

    msg = msg.lower()

    phishing = ["link", "email", "verify", "login", "otp", "click"]
    fraud = ["scam", "fraud", "money", "transfer"]
    hack = ["hack", "hacked", "compromised", "breach"]
    bank = ["card", "bank", "transaction", "credit"]

    scores = {
        "phishing": sum(word in msg for word in phishing),
        "fraud": sum(word in msg for word in fraud),
        "hack": sum(word in msg for word in hack),
        "bank": sum(word in msg for word in bank),
    }

    return max(scores, key=scores.get)


# -----------------------------
# MAIN RESPONSE FUNCTION
# -----------------------------
def get_response(message, country):

    # 1️⃣ Detect language safely
    lang = detect_language_safe(message)

    # 2️⃣ Translate to English (internal processing only)
    try:
        if lang != "en":
            msg_en = GoogleTranslator(source="auto", target="en").translate(message)
        else:
            msg_en = message
    except:
        msg_en = message

    # 3️⃣ Detect issue
    issue = detect_issue(msg_en)

    # 4️⃣ Generate intelligent response (ENGLISH BASE)
    if issue == "phishing":
        reply = "This looks like a phishing attempt. Do NOT click any links or enter your credentials. Always verify the sender."

    elif issue == "fraud":
        reply = "This may be a scam or fraud. Do not send money or share personal details with unknown sources."

    elif issue == "hack":
        reply = "Your account may be compromised. Immediately change your passwords, enable two-factor authentication, and review recent activity."

    elif issue == "bank":
        reply = "Contact your bank immediately, block your card, and monitor your transactions for any suspicious activity."

    else:
        reply = "I understand your concern. Could you provide more details so I can guide you better?"

    # 5️⃣ Add country-specific guidance
    if country == "Canada":
        reply += " You can report this to the Canadian Anti-Fraud Centre at 1-888-495-8501 or visit antifraudcentre.ca."

    elif country == "Slovenia":
        reply += " You can report this to SI-CERT at https://www.cert.si."

    # 6️⃣ Translate BACK to original language
    try:
        if lang != "en":
            reply = GoogleTranslator(source="en", target=lang).translate(reply)
    except:
        pass

    return reply