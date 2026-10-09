const CHATBOT_API_URL =
  "https://chirkut-ai-assistant.dipayamondal28905.workers.dev";

const toggle = document.getElementById("chatbotToggle");
const panel = document.getElementById("chatbotPanel");
const closeButton = document.getElementById("chatbotClose");
const form = document.getElementById("chatbotForm");
const input = document.getElementById("chatbotInput");
const messages = document.getElementById("chatbotMessages");
const sendButton = form?.querySelector('button[type="submit"]');

function addMessage(text, type) {
  const message = document.createElement("div");
  message.className = type === "user" ? "chatbot-user-message" : "chatbot-bot-message";
  message.textContent = text;
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
  return message;
}

toggle?.addEventListener("click", () => {
  panel.hidden = !panel.hidden;
  toggle.setAttribute("aria-expanded", String(!panel.hidden));

  if (!panel.hidden) input?.focus();
});

closeButton?.addEventListener("click", () => {
  panel.hidden = true;
  toggle?.setAttribute("aria-expanded", "false");
  toggle?.focus();
});

async function sendMessage(text) {
  const question = text.trim();

  if (!question || !messages) return;

  addMessage(question, "user");
  input.value = "";
  input.disabled = true;

  if (sendButton) sendButton.disabled = true;

  const loading = addMessage("Thinking...", "bot");

  try {
    const response = await fetch(CHATBOT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: question })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `Request failed: ${response.status}`);
    }

    loading.textContent =
      data.reply || "Sorry, I didn't receive a reply. Please try again.";

  } catch (error) {
    console.error("Chatbot error:", error);
    loading.textContent =
      "Sorry, I couldn't respond right now. Please try again.";
  } finally {
    input.disabled = false;
    if (sendButton) sendButton.disabled = false;
    input.focus();
    messages.scrollTop = messages.scrollHeight;
  }
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage(input.value);
});

document.querySelectorAll(".chatbot-quick-actions [data-question]")
  .forEach((button) => {
    button.addEventListener("click", () => {
      sendMessage(button.dataset.question || "");
    });
  });
