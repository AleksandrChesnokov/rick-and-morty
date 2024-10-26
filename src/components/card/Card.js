import styled from 'styled-components';
import { CardInfo } from './CardInfo';
import { CardStatus } from './CardStatus';
import { CardTitle } from './CardTitle';
import { useState } from 'react';
import { Loader } from '../common';

export function Card({
  status,
  name,
  species,
  type,
  gender,
  image,
  onClickHandler
}) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <StyledCard isImageLoaded={isImageLoaded} onClick={onClickHandler}>
      {!isImageLoaded && <Loader />}
      <CardImg
        src={image}
        alt={name}
        onLoad={() => setIsImageLoaded(true)}
        style={{ display: isImageLoaded ? 'block' : 'none' }}
      />
      <CardInfo>
        <CardTitle name={name} gender={gender} className="card-title" />
        <CardStatus status={status} species={species} type={type} />
      </CardInfo>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  display: flex;
  width: 100%;
  max-width: 400px;
  flex-direction: column;
  background: #263750;
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    cursor: pointer;
    transform: scale(1.01);
    box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.2);
  }

  &:hover .card-title {
    color: #83bf46;
  }
`;

const CardImg = styled.img`
  border-radius: 10px 10px 0 0;
`;
