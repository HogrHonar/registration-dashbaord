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
     const rows = await sheet.getRows();
     console.log("Total rows:", rows.length);
     if (rows.length > 0) {
        console.log("Row 1 بەشی دڵخواز:", rows[0].get("بەشی دڵخواز"));
        console.log("Row 1 کۆنمرە:", rows[0].get("کۆنمرە"));
     }
  }
}

run().catch(console.error);
