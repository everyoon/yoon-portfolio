import styled from 'styled-components';
import ProjectCard from './ProjectCard';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding-bottom: 80px;

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
    padding-bottom: 64px;
  }
`;

function ProjectGrid({ projects }) {
  return (
    <Grid>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </Grid>
  );
}

export default ProjectGrid;
