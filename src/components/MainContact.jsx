import styled from 'styled-components';

const Section = styled.section`
  padding: 80px 24px;
  @media (max-width: 650px) {
    padding: 40px 16px;
  }
`;

const ContactInner = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 650px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const Left = styled.div`
  width: 50%;
  font-size: 28px;
  line-height: 150%;
  font-weight: 600;
  letter-spacing: 0.02em;
  @media (max-width: 1200px) {
    font-size: 24px;
  }
  @media (max-width: 650px) {
    white-space: pre-line;
    width: 100%;
  }
  @media (max-width: 500px) {
    font-size: 18px;
  }
`;

const Right = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  text-align: right;
  @media (max-width: 1200px) {
    align-items: flex-end;
  }
  @media (max-width: 650px) {
    width: 100%;
  }
`;

const ContactTitle = styled.div`
  font-size: 28px;
  font-weight: 600;
  letter-spacing: 0.02em;
  @media (max-width: 1200px) {
    font-size: 24px;
  }
  @media (max-width: 500px) {
    font-size: 18px;
  }
`;

const Desc = styled.p`
  line-height: 150%;
  font-size: 24px;
  white-space: pre-line;
  padding-bottom: 20px;
  @media (max-width: 1200px) {
    font-size: 18px;
    white-space: normal;
  }
  @media (max-width: 500px) {
    font-size: 16px;
  }
`;

const MailButton = styled.button`
  width: 100%;
  display: block;
  padding: 8px 12px;
  text-align: center;
  font-weight: 600;
  background: var(--color-secondary);
  font-size: 28px;
  letter-spacing: 0.02em;
  &:hover {
    color: var(--color-secondary);
    background: var(--color-primary);
  }
  @media (max-width: 1200px) {
    font-size: 24px;
  }
  @media (max-width: 650px) {
    width: 100%;
  }
  @media (max-width: 500px) {
    font-size: 16px;
  }
`;

export default function MainContact() {
  return (
    <Section id="contact">
      <ContactInner>
        <Left className="roboto">FUNCTION FIRST, {'\n'} BEAUTY ALWAYS.</Left>

        <Right>
          <ContactTitle className="roboto">[ CONTACT ME ]</ContactTitle>

          <Desc>
            복잡함 속에서 구조를 찾고, 더 나은 흐름을 만듭니다.
            {'\n'}
            저는 정보를 단순하고 직관적으로 재설계하여,
            {'\n'}
            사용자가 빠르게 이해하는 기능적 미니멀리즘 UI를 추구합니다.
            {'\n'}
            논리적인 설계와 감각적인 구현이 필요하시다면 언제든 연락주세요.
          </Desc>

          <MailButton>
            <a href="mailto:jy.k7377@gmail.com">SEND TO MAIL</a>
          </MailButton>
        </Right>
      </ContactInner>
    </Section>
  );
}
