#!/usr/bin/env tsx
// scripts/fix-sheet-permissions.ts
import 'dotenv/config';
import { google } from 'googleapis';

async function makeSheetPublic(spreadsheetId: string, title: string) {
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

  try {
    // Make the sheet publicly viewable
    await drive.permissions.create({
      fileId: spreadsheetId,
      requestBody: {
        role: 'reader',
        type: 'anyone'
      }
    });

    console.log(`✅ Made ${title} publicly accessible`);
    console.log(`   🔗 https://docs.google.com/spreadsheets/d/${spreadsheetId}`);
    
  } catch (error) {
    console.error(`❌ Error sharing ${title}:`, error);
  }
}

async function shareWithSpecificEmail(spreadsheetId: string, emailAddress: string, title: string) {
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

  try {
    // Share with specific email as editor
    await drive.permissions.create({
      fileId: spreadsheetId,
      requestBody: {
        role: 'writer',
        type: 'user',
        emailAddress: emailAddress
      }
    });

    console.log(`✅ Shared ${title} with ${emailAddress} as editor`);
    
  } catch (error) {
    console.error(`❌ Error sharing ${title} with ${emailAddress}:`, error);
  }
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.error(`
Usage: 
  pnpm dlx tsx scripts/fix-sheet-permissions.ts public
  pnpm dlx tsx scripts/fix-sheet-permissions.ts email <your-email@example.com>

Options:
  public - Make sheets publicly accessible (read-only)
  email  - Share with specific email address (editor access)
`);
    process.exit(1);
  }

  const mode = args[0];
  
  // Formatted sheets
  const elementsSheetId = '1EtuEebC4egKHVBJ_zWox97tEcg1iWWyeTDZWh2dt29U';
  const valuesSheetId = '1gqb7lT3ulZ8TcBj2NB6s5RGWllanxUHNeIn9s-abMoM';

  console.log('🔧 Fixing permissions for formatted ISBDM sheets...');

  if (mode === 'public') {
    await makeSheetPublic(elementsSheetId, 'Elements Workbook');
    await makeSheetPublic(valuesSheetId, 'Values Workbook');
    
    console.log('\n🎉 Both sheets are now publicly accessible!');
    console.log('Anyone with the links can view (but not edit) the sheets.');
    
  } else if (mode === 'email' && args[1]) {
    const emailAddress = args[1];
    
    await shareWithSpecificEmail(elementsSheetId, emailAddress, 'Elements Workbook');
    await shareWithSpecificEmail(valuesSheetId, emailAddress, 'Values Workbook');
    
    console.log(`\n🎉 Both sheets have been shared with ${emailAddress}!`);
    console.log('You should now have editor access to both workbooks.');
    
  } else {
    console.error('Invalid arguments. Use "public" or "email <email-address>"');
    process.exit(1);
  }

  console.log('\n📊 Formatted ISBDM Workbooks:');
  console.log('📈 Elements: https://docs.google.com/spreadsheets/d/1EtuEebC4egKHVBJ_zWox97tEcg1iWWyeTDZWh2dt29U');
  console.log('📊 Values: https://docs.google.com/spreadsheets/d/1gqb7lT3ulZ8TcBj2NB6s5RGWllanxUHNeIn9s-abMoM');
  console.log('');
  console.log('✨ Features:');
  console.log('   📏 Column width: 80 pixels');
  console.log('   📄 Text wrapping: Enabled');
  console.log('   🔗 Index sheets with vocabulary links');
  console.log('   🌐 Full multilingual support (10 languages)');
  console.log('   📊 Proper RDF headers (@en[0], @es[1], etc.)');
}

if (require.main === module) {
  main().catch(console.error);
}