import { OpenAI } from "openai";
import { projects, experiences } from "@/data/content";
import { rateLimit } from "@/lib/rate-limit";

const xai = new OpenAI({
    apiKey: process.env.GROK_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req) {
    try {
        // --- RATE LIMITING ---
        const ip = req.headers.get("x-forwarded-for") || "anonymous";
        const limitResult = rateLimit(ip, 10, 60000); // 10 requests per 1 minute

        if (!limitResult.allowed) {
            return new Response(
                JSON.stringify({
                    error: "Too many requests",
                    message: "You've reached the chat limit. Please try again in a minute."
                }),
                {
                    status: 429,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }
        // ---------------------

        const { messages } = await req.json();

        const systemPrompt = `
You are the official AI Assistant for Z Soft, a premium IT services company. 
Your goal is to help users understand Z Soft's expertise, projects, and services.

Z Soft Information:
- Core Services: Web Development, AI Solutions (Chatbots, RAG), Custom Software, Enterprise FSM Systems.
- Key Projects:
  1. Rep Cloud: A multi-tenant Field Service Management (FSM) platform. Tech: Django, Next.js, PostgreSQL, Redis, Celery, AWS S3.
  2. Safe-Bill: A Fintech escrow/milestone payment system. Tech: React, Django, Stripe Connect, Gemini 2.0 AI, Pinecone.
- Contact: hello@zsofthub.com

Guidelines:
1. Be professional, innovative, and helpful.
2. Use specific technical details from the project descriptions when asked.
3. If asked about pricing, suggest they "Get a Free Quote" via the Contact page or email hello@zsofthub.com.
4. Keep responses concise but impactful. Use markdown for lists and bold text.
5. If you don't know something about a specific internal detail, refer them to the human team.

Context Data:
Projects Details: ${JSON.stringify(projects)}
Experience Details: ${JSON.stringify(experiences)}
`;

        const response = await xai.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: systemPrompt },
                ...messages
            ],
            stream: true,
        });

        // Convert the OpenAI stream into a ReadableStream
        const stream = new ReadableStream({
            async start(controller) {
                for await (const chunk of response) {
                    const content = chunk.choices[0]?.delta?.content || "";
                    controller.enqueue(new TextEncoder().encode(content));
                }
                controller.close();
            },
        });

        return new Response(stream);
    } catch (error) {
        console.error("Grok API Error:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch AI response" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
