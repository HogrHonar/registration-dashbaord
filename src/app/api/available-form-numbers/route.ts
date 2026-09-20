// app/api/available-form-numbers/route.ts

import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    
    // Fetch both formNumber (column A) and name (column B)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Form Registration!A:B", // Get both columns
    });

    const rows = response.data.values || [];
    
    // Skip header row and check which form numbers have names filled
    const usedFormNumbers = new Set<number>();
    
    for (let i = 1; i < rows.length; i++) {
      const formNumber = parseInt(rows[i][0]);
      const name = rows[i][1]; // ناوی چواری فێرخواز
      
      // If form number exists and name is filled (not empty), mark as used
      if (!isNaN(formNumber) && name && name.trim() !== "") {
        usedFormNumbers.add(formNumber);
      }
    }

    // Generate available numbers (1-1500)
    const allNumbers = Array.from({ length: 1500 }, (_, i) => i + 1);
    const availableNumbers = allNumbers.filter((num) => !usedFormNumbers.has(num));

    return NextResponse.json({
      availableNumbers,
      totalAvailable: availableNumbers.length,
      totalUsed: usedFormNumbers.size,
    });
  } catch (err) {
    console.error("Error fetching available form numbers:", err);
    return NextResponse.json(
      { error: "Failed to fetch available form numbers" },
      { status: 500 }
    );
  }
}