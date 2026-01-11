import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '@/assets/logo.svg';
import menuIcon from '@/assets/menu.png';
import menuCloseIcon from '@/assets/arrow-left.png';
import styled from 'styled-components';

const HeaderWrap = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  background: ${({ $isDark }) => ($isDark ? 'var(--color-darker)' : 'var(--color-light)')};
  border-bottom: 1px solid ${({ $isDark }) => ($isDark ? 'var(--color-light)' : 'var(--color-darker)')};
  z-index: 100;
`;

const HeaderInner = styled.div`
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  @media (max-width: 650px) {
    padding: 12px 16px;
  }
`;
const LogoImg = styled.img`
  height: 32px;
  display: block;
`;

// Pc nav
const Nav = styled.nav`
  display: flex;
  gap: 32px;

  a,
  button {
    font-size: 14px;
    font-weight: 600;
    &:hover {
      text-decoration: underline;
      text-decoration-thickness: 1.5px;
      text-underline-offset: 3px;
    }
  }

  @media (max-width: 650px) {
    display: none;
  }
`;

// Mo nav
const MenuButton = styled.button`
  display: none;
  @media (max-width: 650px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  inset: 0;
  background: var(--color-darker);
  color: var(--color-primary);

  display: ${({ open }) => (open ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  z-index: 999;

  button {
    font-size: 32px;
    font-weight: 600;
  }
`;

const MobileTop = styled.div`
  position: absolute;
  top: 24px;
  left: 16px;
`;

function Header({ isDark }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const goContact = () => {
    setMenuOpen(false);
    navigate('/');
    setTimeout(() => {
      const contact = document.getElementById('contact');
      contact?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <HeaderWrap $isDark={isDark}>
        <HeaderInner>
          <h1>
            <Link
              to="/"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: 'smooth',
                });
              }}
            >
              <LogoImg src={logo} alt="포트폴리오 로고" />
            </Link>
          </h1>
          <Nav className="roboto">
            <Link to="/about">ABOUT</Link>
            <Link to="/projects">PROJECTS</Link>
            <button className="roboto" onClick={goContact}>
              CONTACT
            </button>
          </Nav>
          <MenuButton onClick={() => setMenuOpen(true)}>
            <img src={menuIcon} alt="메뉴 아이콘" />
          </MenuButton>
        </HeaderInner>
      </HeaderWrap>
      <MobileMenu open={menuOpen}>
        <MobileTop>
          <button onClick={() => setMenuOpen(false)}>
            <img src={menuCloseIcon} alt="메뉴 나가기 아이콘" />
          </button>
        </MobileTop>
        <button
          className="roboto"
          onClick={() => {
            setMenuOpen(false);
            navigate('/about');
          }}
        >
          ABOUT
        </button>
        <button
          className="roboto"
          onClick={() => {
            setMenuOpen(false);
            navigate('/projects');
          }}
        >
          PROJECTS
        </button>
        <button className="roboto" onClick={goContact}>
          CONTACT
        </button>
      </MobileMenu>
    </>
  );
}

export default Header;
