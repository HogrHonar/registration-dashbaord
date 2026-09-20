import { handlers } from "@/auth";

// CRITICAL: Force Node.js runtime for NextAuth routes
export const runtime = 'nodejs';


export const { GET, POST } = handlers;