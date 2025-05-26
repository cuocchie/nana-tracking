import { useState, useEffect } from 'react';
import Auth from './components/Auth.tsx';
import Calendar from './components/Calendar.tsx';
// import RemainingDays from './components/RemainingDays.tsx';
import { readSheetData } from './google-sheets/googleSheetsApi.ts'; // Import read function and update path
import './App.css';
import Lottie from 'lottie-react'; // Import Lottie
import animationData from './assets/fire-animation.json'; // Import Lottie animation data
import weightImage1 from './assets/rand-pose/weight.png'; // Import weight images
import weightImage2 from './assets/rand-pose/weight_2.png';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // State for practiced and planned days (will be populated from sheet data)
  const [practicedDays, setPracticedDays] = useState<string[]>([]);
  const [plannedDays, setPlannedDays] = useState<string[]>([]);

  const imageArray = [weightImage1, weightImage2]; // Array of image paths
  const [randomImage, setRandomImage] = useState(() => imageArray[Math.floor(Math.random() * imageArray.length)]); // Initialize with a random image

  const handleLogin = async () => {
    setIsLoggedIn(true);
    setLoading(true);
    setError(null);
    try {
      // Assuming your sheet has Date in column A and Status (Practiced/Planned) in column B
      const data: string[][] | null | undefined = await readSheetData('Sheet1!A:B'); // Read data from Sheet1, columns A and B
      // Process data to extract practiced and planned days (assuming data format)
      const practiced: string[] = [];
      const planned: string[] = [];
      if (data) {
        data.forEach((row: string[]) => {
          const date = row[0]; // Date string from the first column
          const status = row[1]; // Assuming status is in the second column
           if (status === 'Practiced') {
              practiced.push(date); // Store the full date string
            } else if (status === 'Planned') {
              planned.push(date); // Store the full date string
            }
        });
      }
      setPracticedDays(practiced);
      setPlannedDays(planned);

    } catch (err: any) {
      setError('Failed to load workout data from Google Sheets.');
      console.error(err);
    } finally {
      setLoading(false);
      console.log('handleLogin finished');
    }
  };

  // Effect to load data when logged in (optional, could also load on button click)
  useEffect(() => {
    // Set a new random image on each render
    setRandomImage(imageArray[Math.floor(Math.random() * imageArray.length)]);
  }, []);


  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          <h1>Na tập tành</h1>
          <img src={randomImage} alt="Random Weight Pose" style={{ maxWidth: '200px', maxHeight: '200px' }} /> {/* Display random image */}
          {loading && <p>Loading workout data...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loading && !error && (
            <>
              <div className="practiced-days-card"> {/* Card container */}
                <p className="practiced-days-text">Ngày em đã tập: <span className="practiced-days-count">{practicedDays.length}</span>/40
                  <Lottie animationData={animationData} style={{ height: 20, width: 20, display: 'inline-block' }} />
                </p> {/* Display practiced days with Lottie animation */}
              </div>
              <Calendar practicedDays={practicedDays} plannedDays={plannedDays} /> {/* Pass data from sheet */}
            </>
          )}
        </>
      ) : (
        <Auth onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
