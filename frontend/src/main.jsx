import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
// In your src/index.js or src/App.jsx
import 'bootstrap/dist/css/bootstrap.min.css';


createRoot(document.getElementById('root')).render(
    <App />
);