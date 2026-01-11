import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '@/data/projects';
import styled, { keyframes } from 'styled-components';
import { useEffect } from 'react';
import leftIcon from '@/assets/arrow-left.png';

const Layout = styled.main`
  display: flex;
  background: var(--color-light);
  @media (max-width: 1080px) {
    flex-direction: column;
  }
`;

const Left = styled.section`
  flex: 1;
`;

const Right = styled.aside`
  width: 320px;
  background: var(--color-light);
  position: sticky;
  top: 54px;
  border-left: 1px solid var(--color-darker);
  border-bottom: 1px solid var(--color-darker);
  @media (max-width: 1080px) {
    display: none;
  }
`;

const TitleWrap = styled.div`
  padding: 24px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-darker);
  button {
    width: 32px;
    @media (max-width: 380px) {
      width: 24px;
    }
  }
  @media (max-width: 650px) {
    padding: 32px 16px;
    height: 200px;
    gap: 24px;
  }
`;

const TitleInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

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

const Title = styled.h3`
  font-size: 42px;
  font-weight: 700;
  opacity: 0;
  animation: ${fadeUp} 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  @media (max-width: 800px) {
    font-size: 32px;
  }
  @media (max-width: 650px) {
    font-size: 24px;
    align-self: flex-start;
  }
  @media (max-width: 380px) {
    font-size: 18px;
    align-self: flex-start;
  }
`;

const Category = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--color-subtext);
  white-space: nowrap;
`;

const ImageWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 24px;
  gap: 24px;
  @media (max-width: 650px) {
    padding: 16px;
    gap: 16px;
  }
`;

const MetaList = styled.ul`
  display: grid;
  li {
    display: flex;
    border-bottom: 1px solid var(--color-darker);
    font-size: 14px;
    line-height: 150%;
    strong {
      width: 140px;
      padding: 8px 12px;
      font-weight: 600;
    }
    p {
      padding: 8px 12px;
      border-left: 1px solid var(--color-darker);
    }
  }
  li:first-child {
    flex-direction: column;
    p {
      border-left: 0;
      border-top: 1px solid var(--color-darker);
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px;
  @media (max-width: 650px) {
    padding: 24px 12px;
  }

  button {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    background: var(--color-secondary);
    letter-spacing: 0.02em;
    &:hover {
      background: var(--color-primary);
      color: var(--color-secondary);
    }
  }
`;

const MobileMeta = styled.div`
  display: none;
  border-bottom: 1px solid var(--color-darker);
  @media (max-width: 1080px) {
    display: block;
  }
`;

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  if (!project) return null;

  return (
    <Layout>
      <Left>
        <TitleWrap>
          <button onClick={() => navigate(-1)}>
            <img src={leftIcon} alt="뒤로가기" />
          </button>
          <TitleInner>
            <Title>{project.title}</Title>
            <Category>{project.category.join(' · ')}</Category>
          </TitleInner>
        </TitleWrap>
        <MobileMeta>
          <MetaList>
            <li>
              <strong>DESC</strong>
              <p>{project.detail.description}</p>
            </li>
            <li>
              <strong>PROJECT</strong>
              <p>{project.detail.projects}</p>
            </li>
            <li>
              <strong>PERIOD</strong>
              <p>{project.detail.period}</p>
            </li>
            <li>
              <strong>CONTRIBUTION</strong>
              <p>{project.detail.Contribution}</p>
            </li>
            <li>
              <strong>TOOLS</strong>
              <p>{project.detail.tools.join(', ')}</p>
            </li>
          </MetaList>
          {project.detail.links && (
            <ButtonGroup>
              {project.detail.links.site && (
                <button onClick={() => window.open(project.detail.links.site, '_blank')}>GO SITE</button>
              )}
              {project.detail.links.figma && (
                <button onClick={() => window.open(project.detail.links.figma, '_blank')}>GO FIGMA</button>
              )}
              {project.detail.links.prototype && (
                <button onClick={() => window.open(project.detail.links.prototype, '_blank')}>GO PROTOTYPE</button>
              )}
            </ButtonGroup>
          )}
        </MobileMeta>
        <ImageWrap>
          {project.detail.images.map((src, i) => (
            <img key={i} src={src} alt="" loading="lazy" />
          ))}
        </ImageWrap>
      </Left>
      <Right>
        <MetaList>
          <li>
            <strong>DESC</strong>
            <p>{project.detail.description}</p>
          </li>
          <li>
            <strong>PROJECT</strong>
            <p>{project.detail.projects}</p>
          </li>
          <li>
            <strong>PERIOD</strong>
            <p>{project.detail.period}</p>
          </li>
          <li>
            <strong>CONTRIBUTION</strong>
            <p>{project.detail.Contribution}</p>
          </li>
          <li>
            <strong>TOOLS</strong>
            <p>{project.detail.tools.join(', ')}</p>
          </li>
        </MetaList>
        {project.detail.links && (
          <ButtonGroup>
            {project.detail.links.site && (
              <button onClick={() => window.open(project.detail.links.site, '_blank')}>GO SITE</button>
            )}
            {project.detail.links.figma && (
              <button onClick={() => window.open(project.detail.links.figma, '_blank')}>GO FIGMA</button>
            )}
            {project.detail.links.prototype && (
              <button onClick={() => window.open(project.detail.links.prototype, '_blank')}>GO PROTOTYPE</button>
            )}
          </ButtonGroup>
        )}
      </Right>
    </Layout>
  );
}

export default ProjectDetail;
