const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
require('dotenv').config({ path: '.env.local' });

const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const key = process.env.GOOGLE_PRIVATE_KEY;
const sheetId = process.env.GOOGLE_SHEETS_ID;

async function run() {
  const auth = new JWT({
    email,
    key: key.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(sheetId, auth);
  await doc.loadInfo();
  
  const sheet = doc.sheetsByTitle["Next Step"];
  if (sheet) {
     await sheet.loadHeaderRow();
     console.log("Headers in Next Step:", sheet.headerValues);
     const rows = await sheet.getRows();
     console.log("Total rows:", rows.length);
     if (rows.length > 0) {
        console.log("Sample department:", rows[0].get("بەشەکانی پەیمانگەی بڕایت"));
     }
  } else {
     console.log("Sheet not found");
  }
}

run().catch(console.error);
