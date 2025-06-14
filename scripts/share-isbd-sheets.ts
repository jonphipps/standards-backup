#!/usr/bin/env tsx
// scripts/share-isbd-sheets.ts
import 'dotenv/config';
import { google } from 'googleapis';

async function shareSheet(spreadsheetId: string, emailAddress: string) {
  const creds = JSON.parse(
    Buffer.from(process.env.GSHEETS_SA_KEY!, 'base64').toString('utf8')
  );

  const auth = new google.auth.GoogleAuth({
    credentials: creds,
    scopes: [
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/spreadsheets'
    ]
  });

  const drive = google.drive({ version: 'v3', auth });

  // Share with email address
  await drive.permissions.create({
    fileId: spreadsheetId,
    requestBody: {
      role: 'writer',
      type: 'user',
      emailAddress: emailAddress
    }
  });

  console.log(`✅ Shared sheet ${spreadsheetId} with ${emailAddress}`);
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.error('Usage: pnpm dlx tsx scripts/share-isbd-sheets.ts <email-address>');
    console.error('');
    console.error('This will share both ISBD workbooks with the specified email address');
    process.exit(1);
  }

  const emailAddress = args[0];
  
  console.log(`🔗 Sharing ISBD sheets with ${emailAddress}...`);

  // Elements workbook
  const elementsSheetId = '1LsjSZgeV5CU3PRzridBgbRFtfrD72pG1EAFPaByZgh0';
  await shareSheet(elementsSheetId, emailAddress);

  // Values workbook  
  const valuesSheetId = '1QWfz4H0v5-lSesNf2yOKAECjpURnjRJfhcJ_nQZa7cA';
  await shareSheet(valuesSheetId, emailAddress);

  console.log('');
  console.log('🎉 Both ISBD workbooks have been shared!');
  console.log('📊 Elements Workbook: https://docs.google.com/spreadsheets/d/1LsjSZgeV5CU3PRzridBgbRFtfrD72pG1EAFPaByZgh0');
  console.log('📊 Values Workbook: https://docs.google.com/spreadsheets/d/1QWfz4H0v5-lSesNf2yOKAECjpURnjRJfhcJ_nQZa7cA');
}

if (require.main === module) {
  main().catch(console.error);
}