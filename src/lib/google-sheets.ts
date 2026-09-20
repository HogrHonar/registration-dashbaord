import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { PreRegistration } from './types';

// ---------------------------
// ⚙️ Configuration
// ---------------------------
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
let cachedAuthClient: JWT | null = null;
let cachedDoc: GoogleSpreadsheet | null = null;

// ---------------------------
// 🔐 Auth
// ---------------------------
const getAuthClient = () => {
  if (cachedAuthClient) return cachedAuthClient;

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY;

  if (!email || !key) {
    throw new Error(
      'Missing Google credentials. Check GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY environment variables.'
    );
  }

  cachedAuthClient = new JWT({
    email,
    key: key.replace(/\\n/g, '\n'),
    scopes: SCOPES,
  });

  return cachedAuthClient;
};

// ---------------------------
// 📄 Spreadsheet Access
// ---------------------------
export const getSpreadsheet = async () => {
  if (cachedDoc) return cachedDoc;

  const sheetId = process.env.GOOGLE_SHEETS_ID;
  if (!sheetId) {
    throw new Error('Missing GOOGLE_SHEETS_ID environment variable');
  }

  console.log('📊 Connecting to spreadsheet:', sheetId);

  const doc = new GoogleSpreadsheet(sheetId, getAuthClient());
  await doc.loadInfo();
  cachedDoc = doc;

  console.log('✅ Connected to spreadsheet:', doc.title);

  return doc;
};

// ---------------------------
// 🔎 Search Pre-Registration
// ---------------------------
export const getPreRegistrationData = async (
  query: string
): Promise<PreRegistration[]> => {
  const doc = await getSpreadsheet();
  const sheet = doc.sheetsByTitle[process.env.PRE_REGISTRATION_SHEET_NAME!];

  if (!sheet) throw new Error('Pre-registration sheet not found');

  const rows = await sheet.getRows();
  console.log(`🔍 Searching ${rows.length} rows for query: "${query}"`);

  return rows
    .map((row, index) => ({
      id: (index + 2).toString(),
      name: row.get('ناوی سیانی') || '',
      branch: row.get('لق') || '',
      phone1: row.get('ژمارە مۆبایل (١)') || '',
      phone2: row.get('ژمارە مۆبایل (٢)') || '',
      location: row.get('شوێنی نیشتەجێبوون') || '',
      preferredDepartments: row.get('بەشەکانی پەیمانگەی بڕایت') || '',
      
    }))
    .filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.phone1.toLowerCase().includes(query.toLowerCase()) ||
        item.phone2.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 10);
};

// ---------------------------
// 🚀 Move Registration Record
// ---------------------------
export const moveRegistration = async (
  id: string,
  updatedData: Partial<PreRegistration>
): Promise<void> => {
  console.log('🚀 moveRegistration:', { id, updatedData });

  const doc = await getSpreadsheet();
  const preRegSheet = doc.sheetsByTitle[process.env.PRE_REGISTRATION_SHEET_NAME!];
  const regSheet = doc.sheetsByTitle[process.env.REGISTRATION_SHEET_NAME!];

  if (!preRegSheet || !regSheet) {
    throw new Error('Required sheets not found');
  }

  const preRegRows = await preRegSheet.getRows();
  const rowIndex = parseInt(id) - 2;
  const targetRow = preRegRows[rowIndex];

  if (!targetRow) throw new Error('Record not found');

  // Get the form number from updatedData
  const formNumber = updatedData.formNumber;
  if (!formNumber) {
    throw new Error('Form number is required');
  }

  console.log(`🔍 Looking for form number ${formNumber} in registration sheet...`);

  // Find the row in registration sheet that matches the form number
  const regRows = await regSheet.getRows();
  const targetRegRow = regRows.find(row => {
    const rowFormNumber = row.get('فۆڕمی ژمارە');
    return rowFormNumber && rowFormNumber.toString() === formNumber.toString();
  });

  if (!targetRegRow) {
    throw new Error(`Form number ${formNumber} not found in registration sheet`);
  }

  console.log(`✅ Found form number ${formNumber} at row ${targetRegRow.rowNumber}`);

  // Prepare registration data
  const registrationData: Record<string, any> = {
    'ناوی چواری فێرخواز': updatedData.name || targetRow.get('ناوی سیانی'),
    'ژ. مۆبایل': updatedData.phone1 || targetRow.get('ژمارە مۆبایل (١)'),
    'ژ.مۆبایل (٢)': updatedData.phone2 || targetRow.get('ژمارە مۆبایل (٢)') || '',
    'لق': updatedData.branch || targetRow.get('لق'),
    'کۆنمرە %': updatedData.totalGrade,
    'بەشی دڵخواز': updatedData.selectionDept || targetRow.get('بەشەکانی پەیمانگەی بڕایت'),
    'ناونیشان': updatedData.location || targetRow.get('ناونیشان'),
    'ڕێکەوتی وەرگرتن': updatedData.dateOfReceipt || '',
    'تێبینی کارمەندی پێدەر': updatedData.noteOfRecipient || '',
    'ژ.وصل': updatedData.invoiceId || '',
    'ڕێکەوتی گەڕاندنەوە': updatedData.dateOfReturn || '',
    'تێبینی کارمەندی وەرگر': updatedData.noteOfReceiver || '',
  };

  console.log('💾 Updating registration sheet row...');
  
  // Update each field in the found row
  for (const [key, value] of Object.entries(registrationData)) {
    targetRegRow.set(key, value);
  }
  
  await targetRegRow.save();
  console.log(`✅ Updated row ${targetRegRow.rowNumber} successfully`);

  // Optional: Delete from pre-registration
  // await targetRow.delete();

  cachedDoc = null;
};
// ---------------------------
// 🧪 Test Sheet Access
// ---------------------------
export const testSheetAccess = async () => {
  try {
    console.log('🧪 Testing sheet access...');
    const doc = await getSpreadsheet();
    const sheets = Object.keys(doc.sheetsByTitle);

    const preRegSheet = doc.sheetsByTitle[process.env.PRE_REGISTRATION_SHEET_NAME!];
    if (!preRegSheet) throw new Error('Pre-registration sheet not found');

    const rows = await preRegSheet.getRows();
    console.log(`✅ Access test passed: ${rows.length} rows`);

    return {
      canRead: true,
      canWrite: true,
      sheets,
    };
  } catch (error) {
    console.error('❌ Test failed:', error);
    throw error;
  }
};

// ---------------------------
// 🔍 Get by ID
// ---------------------------
export async function getPreRegistrationById(
  id: string
): Promise<PreRegistration | null> {
  try {
    console.log('🔍 Fetching pre-registration by ID:', id);

    const doc = await getSpreadsheet();
    const sheet = doc.sheetsByTitle[process.env.PRE_REGISTRATION_SHEET_NAME!];

    if (!sheet) throw new Error('Pre-registration sheet not found');

    const rows = await sheet.getRows();
    const rowIndex = parseInt(id) - 2;

    if (rowIndex < 0 || rowIndex >= rows.length) {
      console.warn('❌ Row not found for ID:', id);
      return null;
    }

    const row = rows[rowIndex];
    if (!row) return null;

    const preRegistration: PreRegistration = {
      id,
      name: row.get('ناوی سیانی') || '',
      phone1: row.get('ژمارە مۆبایل (١)') || '',
      phone2: row.get('ژمارە مۆبایل (٢)') || '',
      location: row.get('شوێنی نیشتەجێبوون') || '',
      branch: row.get('لق') || '',
      preferredDepartments: row.get('بەشەکانی پەیمانگەی بڕایت') || '',
    };

    console.log('✅ Found:', preRegistration.name);
    return preRegistration;
  } catch (error) {
    console.error('❌ Error in getPreRegistrationById:', error);
    throw error;
  }
}

// ---------------------------
// 🧾 GET Available Form Numbers
// ---------------------------
export async function GetFormNumber() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // Fetch all used form numbers from registration sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'registration!A:A', // Adjust column if different
    });

    const rows = response.data.values || [];
    const usedFormNumbers = new Set(
      rows
        .slice(1)
        .map((row: string[]) => parseInt(row[0]))
        .filter((num: number) => !isNaN(num))
    );

    // Available numbers: 1–1500
    const allNumbers = Array.from({ length: 1500 }, (_, i) => i + 1);
    const availableNumbers = allNumbers.filter(
      (num) => !usedFormNumbers.has(num)
    );

    return NextResponse.json({
      availableNumbers,
      totalAvailable: availableNumbers.length,
      totalUsed: usedFormNumbers.size,
    });
  } catch (error) {
    console.error('Error fetching available form numbers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch available form numbers' },
      { status: 500 }
    );
  }
}
