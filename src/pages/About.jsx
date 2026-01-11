import styled, { keyframes } from 'styled-components';
import { useEffect } from 'react';
import profile from '@/assets/profile.jpg';
import GalleryGrid from '@/components/GalleryGrid';

const images = [
  '/images/gallery/1.jpg',
  '/images/gallery/2.jpg',
  '/images/gallery/3.jpg',
  '/images/gallery/4.jpg',
  '/images/gallery/5.jpg',
  '/images/gallery/6.jpg',
  '/images/gallery/7.jpg',
  '/images/gallery/8.jpg',
  '/images/gallery/9.jpg',
];

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Page = styled.main`
  background: var(--color-darker);
`;

const TitleWrap = styled.section`
  padding: 60px 24px 200px;
  @media (max-width: 650px) {
    padding: 60px 16px 120px;
  }
`;

const Title = styled.div`
  display: flex;
  gap: 8px;
  transform-origin: left top;
  > div {
    opacity: 0;
    animation: ${fadeUp} 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  @media (max-width: 1200px) {
    transform: scale(0.85);
  }
  @media (max-width: 1024px) {
    transform: scale(0.68);
  }
  @media (max-width: 768px) {
    transform: scale(0.45);
  }
  @media (max-width: 480px) {
    transform: scale(0.3);
  }
  @media (max-width: 350px) {
    transform: scale(0.25);
  }

  > div:nth-child(1) {
    animation-delay: 0.1s;
  }
  > div:nth-child(2) {
    animation-delay: 0.2s;
  }
  > div:nth-child(3) {
    animation-delay: 0.3s;
  }
  > div:nth-child(4) {
    animation-delay: 0.4s;
  }
  > div:nth-child(5) {
    animation-delay: 0.5s;
  }
`;

const ProfileSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid var(--color-light);
  border-bottom: 1px solid var(--color-light);
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ProfileImage = styled.div`
  width: 100%;
  height: 100%;
  max-height: 650px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    object-position: top;
  }
  @media (max-width: 900px) {
    max-height: 420px;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--color-light);
  > div:first-child h3 {
    border-top: 0;
  }
  @media (max-width: 900px) {
    border-left: 0;
    > div:first-child h3 {
      border-top: 1px solid var(--color-light);
    }
  }
`;

const SectionTitle = styled.h3`
  border-top: 1px solid var(--color-light);
  padding: 12px;
  font-size: 18px;
  font-weight: 600;
  @media (max-width: 650px) {
    padding: 12px 16px;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 160px 1fr;
  border-top: 1px solid var(--color-light);
`;

const Label = styled.div`
  padding: 12px;
  font-size: 16px;
  border-right: 1px solid var(--color-light);
  @media (max-width: 650px) {
    padding: 12px 16px;
  }
`;

const Value = styled.div`
  padding: 12px;
  font-size: 14px;
  @media (max-width: 650px) {
    padding: 12px 16px;
  }
`;

const SkillGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 12px;
  padding: 12px;
  border-top: 1px solid var(--color-light);
`;

const SkillItem = styled.div`
  padding: 4px;
  text-align: center;
  border: 1px solid rgba(247, 249, 252, 0.5);
  border-radius: 4px;
  font-size: 14px;
`;

const IntroSection = styled.section`
  padding: 120px 24px;
  @media (max-width: 650px) {
    padding: 60px 16px;
  }
`;

const IntroTitle = styled.h3`
  font-size: 50px;
  line-height: 150%;
  font-weight: 600;
  @media (max-width: 1440px) {
    font-size: 38px;
  }
  @media (max-width: 1048px) {
    font-size: 32px;
  }
  @media (max-width: 380px) {
    white-space: pre-line;
  }
  @media (max-width: 350px) {
    font-size: 24px;
  }
`;

const IntroText = styled.div`
  padding-top: 24px;
  line-height: 150%;
  font-size: 32px;
  white-space: pre-line;
  letter-spacing: -0.05rem;
  @media (max-width: 1440px) {
    font-size: 24px;
  }
  @media (max-width: 1048px) {
    font-size: 20px;
    white-space: normal;
  }
  @media (max-width: 380px) {
    font-size: 18px;
  }
  @media (max-width: 350px) {
    font-size: 16px;
  }
`;

const GallerySection = styled.section`
  padding-bottom: 80px;
  @media (max-width: 650px) {
    padding-bottom: 64px;
  }
`;
const GalleryTitle = styled.h3`
  border-top: 1px solid var(--color-light);
  border-bottom: 1px solid var(--color-light);
  padding: 12px 24px;
  font-size: 18px;
  font-weight: 600;
  @media (max-width: 650px) {
    padding: 12px 16px;
  }
`;

function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <Page>
      <TitleWrap>
        <Title>
          <div>
            <svg width="143" height="151" viewBox="0 0 143 151" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M77.592 0L129.108 132.924C131.228 138.012 133.489 141.545 135.892 143.524C138.436 145.361 140.768 146.351 142.888 146.492V150.732C139.213 150.449 134.761 150.308 129.532 150.308C124.444 150.167 119.215 150.096 113.844 150.096C107.625 150.096 101.831 150.167 96.46 150.308C91.0893 150.308 86.708 150.449 83.316 150.732V146.492C90.524 146.209 95.1173 145.008 97.096 142.888C99.0747 140.627 98.6507 135.892 95.824 128.684L58.512 27.984L62.328 23.32L28.408 111.3C25.7227 118.367 24.0973 124.161 23.532 128.684C22.9667 133.207 23.32 136.74 24.592 139.284C25.864 141.828 27.984 143.665 30.952 144.796C33.92 145.785 37.5947 146.351 41.976 146.492V150.732C37.4533 150.449 33.072 150.308 28.832 150.308C24.592 150.167 20.352 150.096 16.112 150.096C13.0027 150.096 10.0347 150.167 7.208 150.308C4.52267 150.308 2.12 150.449 0 150.732V146.492C3.10933 145.785 6.148 143.948 9.116 140.98C12.2253 138.012 15.1933 132.853 18.02 125.504L66.568 0C68.264 0.141332 70.1013 0.211997 72.08 0.211997C74.0587 0.211997 75.896 0.141332 77.592 0ZM96.036 89.676V93.916H32.86L34.98 89.676H96.036Z"
                fill="#B0C5E0"
              />
            </svg>
          </div>
          <div>
            <svg width="124" height="151" viewBox="0 0 124 151" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 0C3.53333 0.141332 8.05599 0.282663 13.568 0.423995C19.08 0.565326 24.592 0.635992 30.104 0.635992C37.0293 0.635992 43.6013 0.565326 49.82 0.423995C56.0387 0.282663 60.42 0.211997 62.964 0.211997C79.6413 0.211997 92.0787 3.32133 100.276 9.53999C108.615 15.7587 112.784 23.744 112.784 33.496C112.784 38.4427 111.441 43.3893 108.756 48.336C106.212 53.2827 102.043 57.7347 96.248 61.692C90.5947 65.6493 83.1747 68.6173 73.988 70.596V71.02C86.4253 72.1507 96.248 74.6947 103.456 78.652C110.805 82.468 116.035 87.0613 119.144 92.432C122.253 97.6613 123.808 103.173 123.808 108.968C123.808 117.589 121.547 125.009 117.024 131.228C112.643 137.305 106.283 141.969 97.944 145.22C89.6053 148.471 79.5707 150.096 67.84 150.096C64.7307 150.096 59.996 150.025 53.636 149.884C47.276 149.601 39.5733 149.46 30.528 149.46C24.7333 149.46 19.08 149.531 13.568 149.672C8.05599 149.672 3.53333 149.813 0 150.096V145.856C4.664 145.573 8.12667 145.008 10.388 144.16C12.7907 143.312 14.3453 141.616 15.052 139.072C15.9 136.528 16.324 132.712 16.324 127.624V22.472C16.324 17.2427 15.9 13.4267 15.052 11.024C14.3453 8.48 12.7907 6.784 10.388 5.936C8.12667 4.94666 4.664 4.38133 0 4.24V0ZM59.36 4.24C53.5653 4.24 49.7493 5.44133 47.912 7.844C46.216 10.2467 45.368 15.1227 45.368 22.472V127.624C45.368 132.571 45.792 136.316 46.64 138.86C47.488 141.404 48.972 143.1 51.092 143.948C53.212 144.796 56.3213 145.22 60.42 145.22C72.0093 145.22 80.348 142.04 85.436 135.68C90.6653 129.179 93.28 119.992 93.28 108.12C93.28 97.2373 90.4533 88.828 84.8 82.892C79.288 76.956 70.1013 73.988 57.24 73.988H37.948C37.948 73.988 37.948 73.4227 37.948 72.292C37.948 71.02 37.948 70.384 37.948 70.384H56.18C63.388 70.384 68.9707 68.8293 72.928 65.72C76.8853 62.4693 79.5707 58.2293 80.984 53C82.3973 47.6293 83.104 41.9053 83.104 35.828C83.104 25.3693 81.2667 17.5253 77.592 12.296C73.9173 6.92533 67.84 4.24 59.36 4.24Z"
                fill="#B0C5E0"
              />
            </svg>
          </div>
          <div>
            <svg width="145" height="157" viewBox="0 0 145 157" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M72.504 0C86.92 0 99.5693 3.03867 110.452 9.11601C121.335 15.1933 129.744 23.956 135.68 35.404C141.757 46.7107 144.796 60.4907 144.796 76.744C144.796 92.5733 141.687 106.424 135.468 118.296C129.391 130.168 120.84 139.425 109.816 146.068C98.9333 152.711 86.4253 156.032 72.292 156.032C57.876 156.032 45.2267 152.993 34.344 146.916C23.4613 140.839 14.9813 132.076 8.90399 120.628C2.96799 109.18 0 95.4 0 79.288C0 63.4587 3.10934 49.608 9.328 37.736C15.5467 25.864 24.0973 16.6067 34.98 9.96401C45.8627 3.32134 58.3706 0 72.504 0ZM71.656 3.816C63.3173 3.816 56.0387 6.996 49.82 13.356C43.7427 19.716 39.008 28.4787 35.616 39.644C32.224 50.8093 30.528 63.7413 30.528 78.44C30.528 93.4213 32.436 106.495 36.252 117.66C40.068 128.684 45.2266 137.235 51.728 143.312C58.2293 149.248 65.3667 152.216 73.14 152.216C81.4787 152.216 88.6866 149.036 94.764 142.676C100.983 136.316 105.788 127.553 109.18 116.388C112.572 105.081 114.268 92.1493 114.268 77.592C114.268 62.4693 112.36 49.396 108.544 38.372C104.728 27.348 99.5693 18.868 93.068 12.932C86.708 6.85467 79.5707 3.816 71.656 3.816Z"
                fill="#B0C5E0"
              />
            </svg>
          </div>
          <div>
            <svg width="137" height="154" viewBox="0 0 137 154" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M136.528 0V4.24C132.005 4.66399 128.543 5.72399 126.14 7.41999C123.879 8.97466 122.324 11.5187 121.476 15.052C120.628 18.444 120.204 23.32 120.204 29.68V88.404C120.204 97.8733 119.568 106.353 118.296 113.844C117.165 121.335 114.904 127.836 111.512 133.348C107.979 139.284 102.679 144.089 95.612 147.764C88.6867 151.297 80.2067 153.064 70.172 153.064C63.388 153.064 56.6747 152.287 50.032 150.732C43.5307 149.177 37.8067 146.28 32.86 142.04C28.4787 138.365 25.016 134.196 22.472 129.532C20.0693 124.868 18.444 119.285 17.596 112.784C16.748 106.141 16.324 98.2267 16.324 89.04V22.472C16.324 17.2427 15.9 13.4267 15.052 11.024C14.3453 8.48 12.7907 6.784 10.388 5.936C8.12667 4.94666 4.664 4.38133 0 4.24V0C3.53333 0.141332 8.05599 0.282663 13.568 0.423995C19.08 0.565326 25.016 0.635992 31.376 0.635992C37.1707 0.635992 42.8947 0.565326 48.548 0.423995C54.2013 0.282663 58.8653 0.141332 62.54 0V4.24C57.7347 4.38133 54.06 4.94666 51.516 5.936C49.1133 6.784 47.488 8.48 46.64 11.024C45.792 13.4267 45.368 17.2427 45.368 22.472V99.216C45.368 106.283 45.792 112.713 46.64 118.508C47.6293 124.161 49.184 129.037 51.304 133.136C53.5653 137.235 56.6747 140.344 60.632 142.464C64.7307 144.584 69.8893 145.644 76.108 145.644C86.4253 145.644 94.4107 143.312 100.064 138.648C105.717 133.984 109.675 127.483 111.936 119.144C114.197 110.805 115.328 101.336 115.328 90.736V31.376C115.328 24.4507 114.833 19.1507 113.844 15.476C112.855 11.8013 110.876 9.116 107.908 7.41999C105.081 5.72399 100.841 4.66399 95.188 4.24V0C97.8733 0.141332 101.336 0.282663 105.576 0.423995C109.957 0.565326 113.985 0.635992 117.66 0.635992C121.193 0.635992 124.656 0.565326 128.048 0.423995C131.581 0.282663 134.408 0.141332 136.528 0Z"
                fill="#B0C5E0"
              />
            </svg>
          </div>
          <div>
            <svg width="127" height="151" viewBox="0 0 127 151" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M126.988 0C126.423 6.50133 125.999 12.8613 125.716 19.08C125.575 25.1573 125.504 29.8213 125.504 33.072C125.504 36.3227 125.575 39.3613 125.716 42.188C125.857 45.0147 125.999 47.488 126.14 49.608H121.264C119.285 38.3013 116.883 29.468 114.056 23.108C111.229 16.6067 107.484 11.9427 102.82 9.116C98.2974 6.28932 92.2907 4.87599 84.8 4.87599H78.0161V125.716C78.0161 131.511 78.5107 135.821 79.5 138.648C80.6307 141.475 82.8214 143.383 86.072 144.372C89.3227 145.22 94.0573 145.715 100.276 145.856V150.096C96.036 149.813 90.5241 149.672 83.7401 149.672C76.9561 149.531 70.0307 149.46 62.964 149.46C55.6147 149.46 48.6894 149.531 42.1881 149.672C35.8281 149.672 30.6694 149.813 26.712 150.096V145.856C32.7894 145.715 37.4534 145.22 40.7041 144.372C43.9548 143.383 46.1453 141.475 47.276 138.648C48.4067 135.821 48.972 131.511 48.972 125.716V4.87599H41.9761C34.6267 4.87599 28.6201 6.28932 23.9561 9.116C19.2921 11.9427 15.5468 16.6067 12.7201 23.108C9.89343 29.468 7.56133 38.3013 5.724 49.608H0.848022C1.13069 47.488 1.27209 45.0147 1.27209 42.188C1.41343 39.3613 1.48401 36.3227 1.48401 33.072C1.48401 29.8213 1.34273 25.1573 1.06006 19.08C0.918725 12.8613 0.565333 6.50133 0 0C6.21867 0.141332 13.0734 0.282663 20.5641 0.423995C28.0548 0.565326 35.5453 0.635992 43.036 0.635992C50.5267 0.635992 57.3814 0.635992 63.6001 0.635992C69.6774 0.635992 76.4614 0.635992 83.952 0.635992C91.4427 0.635992 98.9334 0.565326 106.424 0.423995C113.915 0.282663 120.769 0.141332 126.988 0Z"
                fill="#B0C5E0"
              />
            </svg>
          </div>
        </Title>
      </TitleWrap>
      <ProfileSection>
        <ProfileImage>
          <img src={profile} alt="프로필 이미지" />
        </ProfileImage>
        <ProfileInfo>
          <div>
            <SectionTitle>PROFILE</SectionTitle>
            <Row>
              <Label>이름</Label>
              <Value>김지윤</Value>
            </Row>
            <Row>
              <Label>생년월일</Label>
              <Value>2001.08.10</Value>
            </Row>
            <Row>
              <Label>전화번호</Label>
              <Value>010-8555-9331</Value>
            </Row>
            <Row>
              <Label>이메일</Label>
              <Value>
                <a href="mailto:jy.k7377@gmail.com">jy.k7377@gmail.com</a>
              </Value>
            </Row>
          </div>
          <div>
            <SectionTitle>EDUCATION</SectionTitle>

            <Row>
              <Label>2025.11</Label>
              <Value>부산디자인진흥원 UI/UX 웹디자인 퍼블리셔 수료</Value>
            </Row>
            <Row>
              <Label>2024.04</Label>
              <Value>엘리스 SW엔지니어 트랙 부트캠프 수료</Value>
            </Row>
          </div>

          <div>
            <SectionTitle>CERTIFICATE</SectionTitle>

            <Row>
              <Label>2025.07</Label>
              <Value>컴퓨터그래픽기능사</Value>
            </Row>
            <Row>
              <Label>2024.12</Label>
              <Value>웹디자인기능사</Value>
            </Row>
          </div>

          <div>
            <SectionTitle>SKILL</SectionTitle>

            <SkillGrid>
              <SkillItem>Figma</SkillItem>
              <SkillItem>Photoshop</SkillItem>
              <SkillItem>Illustrator</SkillItem>
              <SkillItem>HTML5</SkillItem>
              <SkillItem>CSS3</SkillItem>
              <SkillItem>JavaScript</SkillItem>
              <SkillItem>GitHub</SkillItem>
              <SkillItem>Slack</SkillItem>
              <SkillItem>Notion</SkillItem>
            </SkillGrid>
          </div>
        </ProfileInfo>
      </ProfileSection>
      <IntroSection>
        <IntroTitle>
          문제를 구조화해 더 나은{'\n'} 흐름을 만드는 디자이너,{'\n'} 김지윤 입니다.
        </IntroTitle>
        <IntroText>
          저는 복잡한 정보 구조를 단순하고 직관적인 레이아웃으로 재정리하고,
          {'\n'}이 기반으로 사용자에게 빠르게 이해되는 기능적 미니멀리즘 UI를 만드는 것에 강점이 있는 디자이너입니다.
        </IntroText>
      </IntroSection>
      <GallerySection>
        <GalleryTitle>GALLERY</GalleryTitle>
        <GalleryGrid images={images} />
      </GallerySection>
    </Page>
  );
}

export default About;
