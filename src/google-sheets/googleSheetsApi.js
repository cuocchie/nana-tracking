import { google } from 'googleapis';

// Using a public API key for read-only access.
// Ensure your Google Sheet is publicly accessible for reading ("Anyone with the link" -> "Viewer").
const apiKey = 'AIzaSyAOJ4bfWzaVVMK86j0kk2tGeJdIIJdkUEE'; // Replace with your public API key
const spreadsheetId = '1a6MRElGl9WlYAGgO0PGmN-jMFEojjBIqI9esNnVunJ0'; // Replace with your Spreadsheet ID

let sheets;

async function initializeSheetsClient() {
  try {
    // Use API key for authentication
    sheets = google.sheets({
      version: 'v4',
      auth: apiKey,
    });
    console.log('Google Sheets client initialized successfully with API key.');
  } catch (error) {
    console.error('Error initializing Google Sheets client:', error);
    throw error; // Re-throw to be caught by the calling function
  }
}

// Function to read data from a sheet
export async function readSheetData(range) {
  if (!sheets) {
    await initializeSheetsClient();
  }
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return response.data.values;
  } catch (error) {
    console.error('Error reading sheet data:', error);
    throw error;
  }
}

// Write functionality is not supported in this read-only demo with a public API key.
// export async function writeSheetData(range, values) { ... }
