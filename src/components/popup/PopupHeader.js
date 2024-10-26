import styled from 'styled-components';
import { CardStatus, CardTitle } from '../card';
import { useState, useEffect } from 'react';
import { Loader } from '../common';

export function PopupHeader({ image, name, gender, status, species, type }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    setIsImageLoaded(false);
  }, [image]);

  return (
    <PopupHeaderContainer>
      {!isImageLoaded && <Loader />}
      <PopupImage
        src={image?.replace('../', '')}
        alt={name}
        onLoad={() => setIsImageLoaded(true)}
        style={{ display: isImageLoaded ? 'block' : 'none' }}
      />
      <PopupTitle name={name} gender={gender} />
      <PopupStatus status={status} species={species} type={type} />
    </PopupHeaderContainer>
  );
}

const PopupHeaderContainer = styled.div``;

const PopupTitle = styled(CardTitle)`
  font-size: 22px;
  margin-top: 30px;
  justify-content: center;
`;

const PopupStatus = styled(CardStatus)`
  font-size: 20px;
  justify-content: center;

  & p {
    text-align: center;
    margin-top: 10px;
  }
`;

const PopupImage = styled.img`
  display: block;
  border-radius: 5px;
  margin: 0 auto;
  object-fit: cover;
  width: 100%;
  height: 100%;
  max-width: 350px;
  max-height: 350px;
`;
