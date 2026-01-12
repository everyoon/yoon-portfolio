import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Section = styled.section`
  margin-top: 120px;
`;

const Title = styled.h3`
  font-size: 24px;
  padding: 12px 24px;
  font-weight: 600;
  border-top: 1px solid var(--color-darker);
  border-bottom: 1px solid var(--color-darker);
  @media (max-width: 800px) {
    padding: 12px 16px;
    font-size: 20px;
  }
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 3fr 4fr;
`;

const Cell = styled.div`
  border-left: 1px solid var(--color-darker);
  border-bottom: 1px solid var(--color-darker);
  box-sizing: border-box;
  padding: 12px 24px;
  @media (max-width: 800px) {
    padding: 12px 16px;
  }
  &:nth-child(4n + 1) {
    border-left: 0;
  }
`;

const HeaderCell = styled(Cell)`
  padding: 12px 24px;
  font-size: 18px;
  font-weight: 500;
  background: var(--color-white);
  @media (max-width: 800px) {
    font-size: 16px;
    padding: 12px 16px;
  }
`;

const RowLink = styled(Link)`
  display: contents;
  line-height: 150%;
  @media (max-width: 800px) {
    font-size: 12px;
  }
  &:hover ${Cell} {
    background: rgba(139, 159, 179, 0.2);
  }
`;

const Category = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (max-width: 800px) {
    gap: 4px;
  }
`;

const Desc = styled.div`
  line-height: 150%;
  display: -webkit-box;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;
  overflow: hidden;
  letter-spacing: -0.05rem;
  @media (max-width: 800px) {
    font-size: 12px;
    -webkit-line-clamp: 8;
  }
`;

const Thumb = styled.img`
  aspect-ratio: 16 / 9;
  overflow: hidden;
  object-fit: cover;
  width: 100%;
  display: block;
`;

export default function MainProjectTable({ projects }) {
  return (
    <Section>
      <Title className="roboto">PROJECTS</Title>
      <Table>
        <HeaderCell className="roboto">NAME</HeaderCell>
        <HeaderCell className="roboto">CATEGORY</HeaderCell>
        <HeaderCell className="roboto">DESC</HeaderCell>
        <HeaderCell />
        {projects.map((project) => (
          <RowLink key={project.id} to={`/projects/${project.id}`}>
            <Cell>{project.title}</Cell>
            <Cell>
              <Category>
                {project.category.map((c) => (
                  <div key={c}>{c}</div>
                ))}
              </Category>
            </Cell>
            <Cell>
              <Desc>{project.detail.description}</Desc>
            </Cell>
            <Cell>
              <Thumb src={project.thumbnail} alt={project.title} />
            </Cell>
          </RowLink>
        ))}
      </Table>
    </Section>
  );
}
