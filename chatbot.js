// ==========================================
// CHIRKUT AI ASSISTANT
// ==========================================

// Replace this with your actual Cloudflare Worker URL.
const WORKER_URL = "https://chirkut-ai-assistant.example.workers.dev";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("ai-chat-form");
    const input = document.getElementById("ai-chat-input");
    const messages = document.getElementById("ai-messages");
    const sendButton = document.getElementById("ai-send-button");
    const suggestions = document.querySelectorAll(".suggestion");

    if (!form || !input || !messages || !sendButton) {
        console.error("Chirkut AI: Chat elements not found.");
        return;
    }

    const history = [];
    let isSending = false;

    function addMessage(text, sender) {
        const message = document.createElement("div");

        message.className =
            sender === "user"
                ? "message user-message"
                : "message bot-message";

        message.textContent = text;
        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;

        return message;
    }

    async function sendMessage(text) {
        text = text.trim();

        if (!text || isSending) return;

        if (
            WORKER_URL === "PASTE_YOUR_WORKER_URL_HERE" ||
            !WORKER_URL.startsWith("https://")
        ) {
            addMessage(
                "The AI assistant is not connected yet. Please configure the Cloudflare Worker URL.",
                "bot"
            );
            return;
        }

        addMessage(text, "user");
        history.push({
            role: "user",
            content: text
        });

        input.value = "";
        isSending = true;
        sendButton.disabled = true;

        const loadingMessage = addMessage("Thinking...", "bot");

        try {
            const response = await fetch(WORKER_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: text,
                    history: history.slice(-10)
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "The AI service returned an error."
                );
            }

            if (!data.reply) {
                throw new Error("The AI response was empty.");
            }

            loadingMessage.textContent = data.reply;

            history.push({
                role: "assistant",
                content: data.reply
            });

        } catch (error) {
            console.error("Chirkut AI error:", error);

            loadingMessage.textContent =
                "Sorry, I couldn't connect right now. Please try again shortly.";

        } finally {
            isSending = false;
            sendButton.disabled = false;
            input.focus();
            messages.scrollTop = messages.scrollHeight;
        }
    }

    form.addEventListener("submit", event => {
        event.preventDefault();
        sendMessage(input.value);
    });

    suggestions.forEach(button => {
        button.addEventListener("click", () => {
            sendMessage(button.dataset.message || button.textContent);
        });
    });
});
