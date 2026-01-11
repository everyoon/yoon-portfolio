import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
`;

const ThumbWrap = styled.div`
  position: relative;
  background: var(--color-primary);
  overflow: hidden;
`;

const Thumb = styled.img`
  width: 100%;
  display: block;
  transition: transform 0.4s ease, filter 0.4s ease;
  ${Card}:hover & {
    transform: scale(1.04);
    filter: blur(6px);
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.4s ease;
  ${Card}:hover & {
    opacity: 1;
  }
`;

const OverlayTitle = styled.h3`
  margin: 24px;
  color: var(--color-light);
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  @media (max-width: 800px) {
    font-size: 18px;
  }
`;

export default function ProjectCard({ project }) {
  return (
    <Card to={`/projects/${project.id}`}>
      <ThumbWrap>
        <Thumb src={project.thumbnail} alt={project.title} />
        <Overlay>
          <OverlayTitle>{project.title}</OverlayTitle>
        </Overlay>
      </ThumbWrap>
    </Card>
  );
}
