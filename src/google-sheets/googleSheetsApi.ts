// Using fetch API for read-only access to Google Sheets with a public API key.
// Ensure your Google Sheet is publicly accessible for reading ("Anyone with the link" -> "Viewer").

// Access API key from environment variables
const apiKey: string = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
const spreadsheetId: string = '1a6MRElGl9WlYAGgO0PGmN-jMFEojjBIqI9esNnVunJ0'; // Replace with your Spreadsheet ID

// Function to read data from a sheet using fetch API
export async function readSheetData(range: string): Promise<string[][] | null> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const error = await response.json();
      console.error('Error reading sheet data:', error);
      throw new Error(`Error ${response.status}: ${error.error.message}`);
    }
    const data = await response.json();
    return data.values || null;
  } catch (error: any) {
    console.error('Error fetching sheet data:', error);
    throw error;
  }
}

// Write functionality is not supported in this read-only demo with a public API key.
// export async function writeSheetData(range, values) { ... }
