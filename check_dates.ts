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
  
  const preRegSheet = doc.sheetsByTitle[process.env.PRE_REGISTRATION_SHEET_NAME!];
  const nextStepSheet = doc.sheetsByTitle["Next Step"];
  
  if (preRegSheet) {
      await preRegSheet.loadHeaderRow();
      console.log("PreReg Headers:", preRegSheet.headerValues);
      const rows = await preRegSheet.getRows({ limit: 1 });
      if (rows.length) console.log("PreReg Row 1:", rows[0].toObject());
  }
  if (nextStepSheet) {
      await nextStepSheet.loadHeaderRow();
      console.log("Next Step Headers:", nextStepSheet.headerValues);
      const rows = await nextStepSheet.getRows({ limit: 1 });
      if (rows.length) console.log("Next Step Row 1:", rows[0].toObject());
  }
}
run().catch(console.error);
