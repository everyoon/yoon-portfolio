import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Item = styled.div`
  aspect-ratio: 1 / 1;
  overflow: hidden;
  content-visibility: auto;
  img {
    width: 100%;
    height: 100%;
    will-change: transform;
    backface-visibility: hidden;
    transform: translateZ(0);
    transition: transform 0.35s ease;
    object-fit: cover;
  }
  &:hover img {
    transform: scale(1.06);
  }
`;

function GalleryGrid({ images }) {
  return (
    <Grid>
      {images.map((src, i) => (
        <Item key={i}>
          <img src={src} alt="내가 찍은 사진들" loading="lazy" />
        </Item>
      ))}
    </Grid>
  );
}

export default GalleryGrid;
