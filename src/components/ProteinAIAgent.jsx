import { useState } from "react";

export default function ProteinAIAgent({ context }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("http://localhost:5000/ask-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, context }),
      });

      const data = await res.json();

      if (data.answer) {
        setAnswer(data.answer);
      } else {
        setAnswer("AI did not return a response.");
      }
    } catch (err) {
      setAnswer("Error contacting AI service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg mt-6 bg-white/5 backdrop-blur">
      <h2 className="text-lg font-bold mb-2 text-white">
        Protein AI Assistant
      </h2>

      <textarea
        className="w-full p-2 border rounded text-black"
        placeholder="Ask a question about this protein..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        onClick={askAI}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Ask AI
      </button>

      {loading && (
        <p className="mt-3 text-sm text-gray-300">Thinking...</p>
      )}

      {answer && (
        <div className="mt-4 p-4 bg-white text-gray-900 backdrop-blur rounded-lg shadow border border-gray-200">
          <p className="whitespace-pre-line">{answer}</p>
        </div>
      )}
    </div>
  );
}
