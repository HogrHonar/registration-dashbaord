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
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    const nextStepSheet = doc.sheetsByTitle["Next Step"];
    if (nextStepSheet) {
        const rows = await nextStepSheet.getRows();
        if (rows.length > 0) {
            console.log("Headers:", nextStepSheet.headerValues);
            console.log("Row 100:", rows[100]?.toObject());
            console.log("Row 0:", rows[0]?.toObject());
        }
    }
}
run().catch(console.error);
