```javascript
const CHATBOT_API_URL =
  "https://chirkut-ai-assistant.dipayamondal28905.workers.dev";

const toggle = document.getElementById("chatbotToggle");
const panel = document.getElementById("chatbotPanel");
const closeButton = document.getElementById("chatbotClose");
const form = document.getElementById("chatbotForm");
const input = document.getElementById("chatbotInput");
const messages = document.getElementById("chatbotMessages");
const sendButton = form?.querySelector('button[type="submit"]');

// Open and close the chat window
toggle?.addEventListener("click", () => {
  panel.hidden = !panel.hidden;
  toggle.setAttribute("aria-expanded", String(!panel.hidden));

  if (!panel.hidden) input.focus();
});

closeButton?.addEventListener("click", () => {
  panel.hidden = true;
  toggle.setAttribute("aria-expanded", "false");
  toggle.focus();
});

// Display a chat message safely
function addMessage(text, sender) {
  const message = document.createElement("div");
  message.className =
    sender === "user"
      ? "chat-message user-message"
      : "chat-message bot-message";

  message.textContent = text;
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;

  return message;
}

// Send a message to the AI backend
async function sendMessage(text) {
  const message = text.trim();
  if (!message) return;

  addMessage(message, "user");
  input.value = "";
  input.disabled = true;
  sendButton.disabled = true;

  const loading = addMessage("Thinking...", "bot");

  try {
    const response = await fetch(CHATBOT_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "AI service unavailable.");
    }

    loading.textContent = data.reply || "No reply received.";
  } catch (error) {
    loading.textContent =
      "Sorry, I couldn't respond right now. Please try again.";
    console.error("Chatbot error:", error);
  } finally {
    input.disabled = false;
    sendButton.disabled = false;
    input.focus();
    messages.scrollTop = messages.scrollHeight;
  }
}

// Handle the message form
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage(input.value);
});

// Quick-action buttons
document.querySelectorAll(".chatbot-quick-actions [data-question]")
  .forEach((button) => {
    button.addEventListener("click", () => {
      sendMessage(button.dataset.question);
    });
  });
```
