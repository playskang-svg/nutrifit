import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// 워커가 크롤러용으로 심어 둔 사전렌더 본문. React가 뜨면 역할이 끝난다.
document.getElementById('prerender')?.remove();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
