import styled from "styled-components";
import ProjectCard from "./ProjectCard";

const parseDotDate = (s) => {
  // "2025.06.04" -> "2025-06-04"
  const iso = (s || "").trim().replaceAll(".", "-");
  const t = Date.parse(iso);
  return Number.isNaN(t) ? 0 : t;
};

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
  const sortedProjects = [...projects].sort(
    (a, b) => parseDotDate(b.date) - parseDotDate(a.date)
  );

  return (
    <Grid>
      {sortedProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </Grid>
  );
}

export default ProjectGrid;
