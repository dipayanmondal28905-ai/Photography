const CHATBOT_API_URL =
  "https://chirkut-ai-assistant.dipayamondal28905.workers.dev";

const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");
const sendButton = document.getElementById("chat-send");

function addMessage(text, sender) {
  const message = document.createElement("div");
  message.className = `chat-message ${sender}`;
  message.textContent = text;

  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  return message;
}

async function sendMessage(messageText) {
  const message = messageText.trim();

  if (!message) return;

  addMessage(message, "user");
  chatInput.value = "";
  chatInput.disabled = true;
  sendButton.disabled = true;

  const loadingMessage = addMessage("Thinking...", "bot");

  try {
    const response = await fetch(CHATBOT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: message
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "AI service unavailable.");
    }

    loadingMessage.textContent = data.reply;
  } catch (error) {
    loadingMessage.textContent =
      "Sorry, I couldn't respond right now. Please try again.";
    console.error("Chatbot error:", error);
  } finally {
    chatInput.disabled = false;
    sendButton.disabled = false;
    chatInput.focus();
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

if (chatForm && chatInput && chatMessages && sendButton) {
  chatForm.addEventListener("submit", function (event) {
    event.preventDefault();
    sendMessage(chatInput.value);
  });
}
