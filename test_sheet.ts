import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function run() {
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, serviceAccountAuth);
  await doc.loadInfo();
  console.log("Loaded document:", doc.title);
  
  const nextStepSheet = doc.sheetsByTitle["Next Step"];
  if (nextStepSheet) {
      const nextStepRows = await nextStepSheet.getRows();
      console.log("Raw length:", nextStepRows.length);
      
      // Let's filter out completely blank rows
      const validRows = nextStepRows.filter(row => row.get("بەشی دڵخواز") || row.get("ناوی چواری فیرخواز") || row.get("ناو"));
      console.log("Valid length:", validRows.length);
  } else {
      console.log("Next Step sheet not found");
  }
}
run().catch(console.error);
