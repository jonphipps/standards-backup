# ISBD Google Sheets Setup Guide

## 🎯 **Immediate Results Available**

✅ **Complete ISBD spreadsheets are ready for use right now!**

Location: `/output/isbd-sheets/`

## 📊 **What Was Created**

### **Elements Workbook** (357 total rows)
- **ISBD Elements** (192 rows): Core ISBD elements and properties
- **Unconstrained Elements** (165 rows): Unconstrained versions of ISBD elements

### **Values Workbook** (60 total rows)  
- **Content Form** (13 rows): Content form vocabulary
- **Content Form Base** (15 rows): Base content form terms
- **Dimensionality** (4 rows): Dimensionality vocabulary  
- **Motion** (4 rows): Motion vocabulary
- **Sensory Specification** (7 rows): Sensory specification terms
- **Content Type** (5 rows): Content type vocabulary
- **Media Type** (12 rows): Media type vocabulary

## 🚀 **Quick Start Options**

### **Option 1: Use CSV Files Immediately**
```bash
# Open the files directly
open output/isbd-sheets/isbd-elements/
open output/isbd-sheets/isbd-values/

# Import any CSV into Excel, Google Sheets, or other tools
```

### **Option 2: Create Google Sheets (Automated)**
```bash
# 1. Set up Google Service Account credentials
export GSHEETS_SA_KEY="<base64-encoded-service-account-json>"

# 2. Create Google Sheets structure
npx tsx scripts/create-isbd-sheets.ts

# 3. Get the sheet IDs from the output, then populate with data
npx tsx scripts/populate-isbd-sheets.ts <elements-sheet-id> <values-sheet-id>
```

## 📋 **Files Created**

```
output/isbd-sheets/
├── README.md                 # Master overview
├── master-index.csv          # Summary of both workbooks
├── isbd-elements/           # Elements workbook
│   ├── README.md
│   ├── index.csv            # Sheet index
│   ├── isbd-elements.csv    # 192 rows
│   └── unconstrained-elements.csv # 165 rows
└── isbd-values/            # Values workbook  
    ├── README.md
    ├── index.csv           # Sheet index
    ├── content-form.csv    # 13 rows
    ├── content-form-base.csv # 15 rows
    ├── content-type.csv    # 5 rows
    ├── dimensionality.csv  # 4 rows
    ├── media-type.csv      # 12 rows
    ├── motion.csv          # 4 rows
    └── sensory-specification.csv # 7 rows
```

## 🔧 **Google Service Account Setup**

If you want to push to Google Sheets:

1. **Create Service Account**:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create new project or select existing
   - Enable Google Sheets API
   - Create Service Account
   - Download JSON credentials

2. **Encode Credentials**:
   ```bash
   cat service-account-credentials.json | base64
   ```

3. **Set Environment Variable**:
   ```bash
   export GSHEETS_SA_KEY="<base64-encoded-json>"
   ```

## 💡 **Scripts Available**

- **`create-isbd-excel.ts`**: ✅ Creates CSV files (already run)
- **`create-isbd-sheets.ts`**: Creates Google Sheets structure
- **`populate-isbd-sheets.ts`**: Populates sheets with CSV data
- **`rdf-to-csv.ts`**: Original RDF to CSV converter (used to create source data)

## 🎨 **Data Features**

- **Multilingual**: English and Spanish throughout
- **Complete SKOS**: All vocabulary terms with definitions, scope notes, examples
- **RDF Structure**: Maintains original RDF relationships and properties
- **Editor Ready**: Proper column structure for editorial workflows

## 📈 **Usage Examples**

### **Import to Google Sheets Manually**
1. Go to [Google Sheets](https://sheets.google.com)
2. Create new spreadsheet
3. File → Import → Upload → Select CSV file
4. Repeat for each vocabulary

### **Import to Excel**
1. Open Excel
2. Data → From Text/CSV
3. Select CSV file from output directory
4. Configure import settings

### **Use for Editorial Workflows**
- Each CSV has proper headers for vocabulary management
- Index files help navigate between vocabularies
- Multilingual columns support translation workflows
- Standard DCTAP structure for metadata professionals

## ✅ **Next Steps**

1. **Review the data**: Check `output/isbd-sheets/` directory
2. **Choose your approach**: Manual import or automated Google Sheets
3. **Start editing**: The data is ready for editorial use
4. **Sync back**: Use existing tools to sync changes back to RDF

---

## 🎉 **Ready to Use Now!**

You have **417 rows** of complete ISBD vocabulary data organized into **9 manageable spreadsheets**, ready for immediate editorial use. No additional setup required to start working with the data.