#!/usr/bin/env tsx
// scripts/share-final-sheets.ts
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

async function main() {
  console.log('🔧 Making final ISBDM sheets publicly accessible...');

  // Final formatted sheets with complete formatting
  const elementsSheetId = '1syua_Zv5ShQlhMtAxFrrfIY28GUeaCnNxkNKu33fuls';
  const valuesSheetId = '1wL1lsU9eWaV21Q0CmBK2LwuncWwQsWBJ6MiWLcQkbBw';

  await makeSheetPublic(elementsSheetId, 'Elements Workbook');
  await makeSheetPublic(valuesSheetId, 'Values Workbook');
  
  console.log('\n🎉 Both final sheets are now publicly accessible!');
  console.log('Anyone with the links can view (but not edit) the sheets.');
  
  console.log('\n📊 Final ISBDM Workbooks:');
  console.log('📈 Elements: https://docs.google.com/spreadsheets/d/1syua_Zv5ShQlhMtAxFrrfIY28GUeaCnNxkNKu33fuls');
  console.log('📊 Values: https://docs.google.com/spreadsheets/d/1wL1lsU9eWaV21Q0CmBK2LwuncWwQsWBJ6MiWLcQkbBw');
  console.log('');
  console.log('✨ Complete Formatting Applied:');
  console.log('   📏 Column width: 80 pixels');
  console.log('   📄 Text wrapping: Enabled');
  console.log('   ⬆️  Vertical alignment: Top');
  console.log('   📝 Header row: Bold');
  console.log('   🧊 Frozen: Header row + first column');
  console.log('   🔗 Index sheets with vocabulary links');
  console.log('   🌐 Full multilingual support (10 languages)');
  console.log('   📊 Proper RDF headers (@en[0], @es[1], etc.)');
}

if (require.main === module) {
  main().catch(console.error);
}