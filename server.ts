import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getAi(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // AI Vehicle Co-Pilot API
  app.post("/api/ai-assistant", async (req, res) => {
    try {
      const { message, history, vehicleState } = req.body;
      const ai = getAi();

      if (!ai) {
        // High quality fallback responses tailored to cybernetic car OS
        const fallbackResponses: Record<string, string> = {
          default: "All vehicle subsystems are calibrated and nominal. Battery is at 87% with 318 km range available. How can I optimize your route or cabin dynamics today?",
          trip: "I've reviewed your route to Hyderabad. Traffic is light on NH65. I suggest a 15-minute quick top-up at Vijayawada Supercharger to arrive with 25% reserve.",
          diagnostics: "Thermal alert analysis: Sensor 04 at the cooling manifold detected a temporary temperature spike to 114°C under high motor load. Coolant pump flow is steady at nominal rates. Recommend reducing cruising speed to 90 km/h.",
          cabin: "Adjusted cabin climate to 21°C Auto Sync with active ionizer and mild seat ventilation.",
        };

        const lower = (message || "").toLowerCase();
        let reply = fallbackResponses.default;
        if (lower.includes("trip") || lower.includes("route") || lower.includes("navigate") || lower.includes("where")) {
          reply = fallbackResponses.trip;
        } else if (lower.includes("problem") || lower.includes("temp") || lower.includes("engine") || lower.includes("warn") || lower.includes("diagnostic") || lower.includes("error")) {
          reply = fallbackResponses.diagnostics;
        } else if (lower.includes("cabin") || lower.includes("climate") || lower.includes("temp") || lower.includes("cold") || lower.includes("heat")) {
          reply = fallbackResponses.cabin;
        }

        return res.json({ reply, source: "neural_local_core" });
      }

      const systemInstruction = `You are "AETHER", the futuristic onboard AI Neural Co-Pilot and Vehicle Operating System for a high-end luxury electric vehicle. 
Current Telemetry:
- Vehicle: Obsidian Cyber-EV
- Battery: ${vehicleState?.battery ?? 87}% (${vehicleState?.range ?? 318} km range)
- Cabin Climate: ${vehicleState?.climate ?? 21}°C (Auto/Sync)
- Speed / Status: ${vehicleState?.status ?? "Systems Online, Diagnostics Active"}
- Active Alerts: ${vehicleState?.activeAlert ?? "Engine thermal spike detected (114°C on sensor 04, +14% above nominal)"}
- Driver: Alex

Provide concise, precise, futuristic, automotive-grade assistance. Be polite, authoritative, highly intelligent, and direct (max 2-3 short sentences). Format numbers and recommendations clearly.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          { role: "user", parts: [{ text: `${systemInstruction}\n\nUser request: ${message}` }] }
        ],
      });

      const reply = response.text || "Subsystems updated and verified.";
      res.json({ reply, source: "gemini_neural_core" });
    } catch (err: any) {
      console.error("AI Error:", err);
      res.json({ 
        reply: "Telemetry telemetry synchronized. Subsystems running within safety thresholds. Speed reduced to optimize thermal dissipation.",
        source: "fallback"
      });
    }
  });

  // Vite middleware in dev mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Neural Vehicle OS Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
