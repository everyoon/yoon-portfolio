import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Title = styled.h3`
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  font-weight: 600;
  padding: 12px 16px;
  border-top: 1px solid var(--color-darker);
  border-bottom: 1px solid var(--color-darker);
`;

const List = styled.div``;

const Item = styled(Link)`
  display: block;
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-darker);
  font-size: 16px;
  &:hover {
    background: rgba(139, 159, 179, 0.15);
  }
`;

export default function MobileProjectList({ projects }) {
  return (
    <section>
      <Title>PROJECTS</Title>
      <List>
        {projects.map((project) => (
          <Item key={project.id} to={`/projects/${project.id}`}>
            {project.title}
          </Item>
        ))}
      </List>
    </section>
  );
}
