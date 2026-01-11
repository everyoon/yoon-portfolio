import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Layout({ children }) {
  const location = useLocation();
  const { pathname } = location;

  const isProjectList = pathname === '/projects';
  const isAbout = pathname.startsWith('/about');

  const isDark = isProjectList || isAbout;

  return (
    <>
      <Header isDark={isDark} />
      {children}
      <Footer isDark={isDark} />
    </>
  );
}
