import { useState } from 'react';
import './Auth.css'; // Import the new CSS file for Auth component
import strivingPoseImage from '../assets/striving_pose.png'; // Import the image

function Auth({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [hint, setHint] = useState('');

  const handleLogin = () => {
    console.log('Auth component handleLogin called');
    // Hardcoded authentication
    if (username === 'nana' && password === '179201') {
      console.log('Auth component: Login successful! Calling onLogin...');
      onLogin();
    } else {
      setError('Sai password ròi, em nhớ pass chung của chúng mình ko?');
      setHint('abx'); // Clear any previous hint
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <img src={strivingPoseImage} alt="Striving Pose" className="auth-image" /> {/* Add the image */}
      {error ? (<p className="error-message">{error}</p>) : (hint ? <p className="hint-message">{hint}</p> : null)}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="auth-input"
        autoCapitalize="none"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="auth-input"
        autoCapitalize="none"
      />
      <button onClick={handleLogin} className="auth-button">Login</button>
    </div>
  );
}

export default Auth;
