// ========================================
// CHIRKUT AI ASSISTANT
// ========================================

const WORKER_URL =
    "https://chirkut-ai-assistant.dipayanmondal28905.workers.dev/";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("ai-chat-form");
    const input = document.getElementById("ai-chat-input");
    const messages = document.getElementById("ai-messages");
    const sendButton = document.getElementById("ai-send-button");
    const suggestions = document.querySelectorAll(".suggestion");

    if (!form || !input || !messages || !sendButton) {
        console.error("Chirkut AI: Required HTML elements are missing.");
        return;
    }

    const history = [];
    let isSending = false;

    function addMessage(text, sender) {
        const element = document.createElement("div");

        element.className =
            sender === "user"
                ? "message user-message"
                : "message bot-message";

        element.textContent = text;
        messages.appendChild(element);
        messages.scrollTop = messages.scrollHeight;

        return element;
    }

    async function sendMessage(rawText) {
        const text = rawText.trim();

        if (!text || isSending) return;

        addMessage(text, "user");

        input.value = "";
        isSending = true;
        sendButton.disabled = true;

        const loading = addMessage("Thinking...", "bot");

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
                    data.details ||
                    data.error ||
                    `HTTP error ${response.status}`
                );
            }

            if (!data.reply) {
                throw new Error("The AI returned no reply.");
            }

            loading.textContent = data.reply;

            history.push(
                { role: "user", content: text },
                { role: "assistant", content: data.reply }
            );

        } catch (error) {
            console.error("Chirkut AI error:", error);

            loading.textContent =
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
            sendMessage(
                button.dataset.message || button.textContent
            );
        });
    });
});
