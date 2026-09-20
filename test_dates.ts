import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' }); // try .env first
if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
  dotenv.config({ path: '.env.local' });
}

async function run() {
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, serviceAccountAuth);
  await doc.loadInfo();
  
  const sheet = doc.sheetsByTitle[process.env.MAIN_SHEET_NAME!];
  const rows = await sheet.getRows({ offset: sheet.rowCount - 20, limit: 20 }); // get last 20 rows
  
  console.log("Last 20 rows 'ڕێکەوتی وەرگرتن' (date filled):");
  rows.forEach(r => console.log(r.get("ڕێکەوتی وەرگرتن")));

  const preRegSheet = doc.sheetsByTitle[process.env.PRE_REGISTRATION_SHEET_NAME!];
  if (preRegSheet) {
    const tsKey = preRegSheet.headerValues[0];
    const preRows = await preRegSheet.getRows({ offset: preRegSheet.rowCount - 10, limit: 10 });
    console.log("\nLast 10 rows PreReg Timestamp:");
    preRows.forEach(r => console.log(r.get(tsKey)));
  }
}
run().catch(console.error);
