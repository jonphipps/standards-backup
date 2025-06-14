#!/usr/bin/env tsx
// scripts/share-formatted-sheets.ts
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
    console.error('Usage: pnpm dlx tsx scripts/share-formatted-sheets.ts <email-address>');
    console.error('');
    console.error('This will share the new formatted ISBDM workbooks with the specified email address');
    process.exit(1);
  }

  const emailAddress = args[0];
  
  console.log(`🔗 Sharing formatted ISBDM sheets with ${emailAddress}...`);

  // New formatted Elements workbook
  const elementsSheetId = '1EtuEebC4egKHVBJ_zWox97tEcg1iWWyeTDZWh2dt29U';
  await shareSheet(elementsSheetId, emailAddress);

  // New formatted Values workbook  
  const valuesSheetId = '1gqb7lT3ulZ8TcBj2NB6s5RGWllanxUHNeIn9s-abMoM';
  await shareSheet(valuesSheetId, emailAddress);

  console.log('');
  console.log('🎉 Both formatted ISBDM workbooks have been shared!');
  console.log('📊 Elements Workbook: https://docs.google.com/spreadsheets/d/1EtuEebC4egKHVBJ_zWox97tEcg1iWWyeTDZWh2dt29U');
  console.log('📊 Values Workbook: https://docs.google.com/spreadsheets/d/1gqb7lT3ulZ8TcBj2NB6s5RGWllanxUHNeIn9s-abMoM');
  console.log('');
  console.log('✨ Features:');
  console.log('   📏 All columns set to width 80');
  console.log('   📄 Text wrapping enabled');
  console.log('   🔗 Index sheets with links to vocabularies');
  console.log('   🌐 Full multilingual support preserved');
  console.log('   📊 Proper RDF headers (@en[0], @es[1], etc.)');
}

if (require.main === module) {
  main().catch(console.error);
}