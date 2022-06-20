import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
// import App from '../pages/App';
import Home from '../pages/Home';

function BasicRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 根目录重定向到/home */}
        <Route path='/' element={<Navigate to='/home' replace />} />
        <Route path='/' element={<Outlet />}>
          <Route path='home' element={<Home />} />
        </Route>
        <Route path='*' element={<Navigate to='/home' replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default BasicRouter;
