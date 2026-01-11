import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import fLogo from '@/assets/f-logo.svg';
import UpIcon from '@/assets/arrow-up.png';

const FooterWrap = styled.footer`
  background: ${({ $isDark }) => ($isDark ? 'var(--color-darker)' : 'var(--color-light)')};
  border-top: 1px solid ${({ $isDark }) => ($isDark ? 'var(--color-light)' : 'var(--color-darker)')};
  padding: 32px 24px;
  @media (max-width: 650px) {
    padding: 24px 16px 8px;
  }
`;

const FooterInner = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 32px;
  @media (max-width: 744px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;
const Logo = styled.div`
  flex-shrink: 1;
  max-width: 1154px;
  @media (max-width: 1440px) {
    max-width: 865px;
  }
`;
const FooterContent = styled.div`
  display: flex;
  gap: 32px;
  @media (max-width: 744px) {
    justify-content: space-between;
  }
  @media (max-width: 650px) {
    flex-direction: column;
    gap: 12px;
  }
`;
const NavInner = styled.div`
  max-width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px 24px;
  border-left: 1px solid var(--color-darker);
  gap: 32px;
  p {
    line-height: 140%;
  }
  @media (max-width: 744px) {
    border: none;
    padding-left: 0;
  }
  @media (max-width: 650px) {
    max-width: 100%;
    padding: 0;
    gap: 24px;
  }
`;
const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 16px;
  a,
  button {
    font-size: 24px;
    font-weight: 600;
    text-align: left;
    &:hover {
      text-decoration: underline;
      text-decoration-thickness: 1.5px;
      text-underline-offset: 3px;
    }
  }
`;
const Meta = styled.div`
  min-width: 264px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px 0 12px 24px;
  border-left: 1px solid var(--color-darker);
  gap: 24px;
  @media (max-width: 744px) {
    border: none;
    align-items: flex-end;
    padding-right: 0;
    min-width: auto;
  }
  @media (max-width: 650px) {
    align-items: flex-end;
    padding: 0;
    gap: 24px;
  }
`;
const TopButton = styled.button`
  display: flex;
  gap: 8px;
  p {
    font-size: 24px;
    font-weight: 600;
  }
`;
const CopyInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  p {
    font-size: 13px;
  }
  @media (max-width: 650px) {
    width: 100%;
  }
`;
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

function Footer({ isDark }) {
  const navigate = useNavigate();
  const goContact = () => {
    navigate('/');

    setTimeout(() => {
      const contact = document.getElementById('contact');
      contact?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <FooterWrap $isDark={isDark}>
      <FooterInner>
        <Logo>
          <img src={fLogo} alt="포트폴리오 로고" />
        </Logo>
        <FooterContent>
          <NavInner className="roboto">
            <p>Designer who structures problems to create better flows.</p>
            <Nav>
              <Link to="/about">ABOUT</Link>
              <Link to="/projects">PROJECTS</Link>
              <button className="roboto" onClick={goContact}>
                CONTACT
              </button>
            </Nav>
          </NavInner>
          <Meta className="roboto">
            <TopButton onClick={scrollToTop}>
              <p className="roboto">BACK TO TOP</p>
              <img src={UpIcon} alt="위표시 화살표" />
            </TopButton>
            <CopyInner>
              <p>Designing clear, functional experiences.</p>
              <p>© 2026 Kim_Jiyoon. All Rights Reserved.</p>
            </CopyInner>
          </Meta>
        </FooterContent>
      </FooterInner>
    </FooterWrap>
  );
}

export default Footer;
