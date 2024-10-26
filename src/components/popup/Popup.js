import styled from 'styled-components';
import { PopupEpisodes } from './PopupEpisodes';
import { PopupHeader } from './PopupHeader';
import { PopupInfo } from './PopupInfo';
import { useData } from '../providers';
import { useRef, useEffect } from 'react';

export function Popup() {
  const { popupSettings, setPopupSettings } = useData();
  const {
    name,
    gender,
    image,
    status,
    species,
    type,
    origin,
    location,
    episode
  } = popupSettings.content;

  const popupRef = useRef(null);

  function togglePopup(e) {
    if (e.currentTarget !== e.target) {
      return;
    }

    setPopupSettings((prevState) => ({
      ...prevState,
      visible: !prevState.visible
    }));
  }

  function togPopup(e) {
    if (popupRef.current !== e.target) {
      return;
    }

    setPopupSettings((prevState) => ({
      ...prevState,
      visible: !prevState.visible
    }));
  }
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape' && popupSettings.visible) {
        setPopupSettings((prevState) => ({
          ...prevState,
          visible: false
        }));
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [popupSettings.visible, setPopupSettings]);

  console.log(popupSettings);
  return (
    <PopupContainer
      onClick={togPopup}
      ref={popupRef}
      visible={popupSettings.visible}
    >
      <StyledPopup>
        <CloseIcon onClick={togglePopup} />

        <PopupHeader
          name={name}
          gender={gender}
          image={image}
          status={status}
          species={species}
          type={type}
        />

        <PopupInfo origin={origin} location={location} />

        <PopupEpisodes episodes={episode} />
      </StyledPopup>
    </PopupContainer>
  );
}

const PopupContainer = styled.div`
  position: fixed;
  z-index: 10;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  color: #fff;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.3s, visible 0.3s;

  ${({ visible }) =>
    visible &&
    `
      opacity: 1;
      visibility: initial;
      pointer-events: all;
    `}
`;

const StyledPopup = styled.div`
  position: relative;
  width: 40%;
  margin: 0 auto;
  height: auto;
  max-height: 90vh;
  margin-top: calc(10vh - 20px);
  background: #263750;
  border-radius: 15px;
  padding: 20px 40px;
  border: 2px solid #83bf46;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  ${window.screen.width < 930 && 'width: 80%'};
  ${window.screen.width < 600 && 'width: 95%'};
`;

const CloseIcon = styled.div`
  cursor: pointer;
  position: fixed;
  right: calc(30% - 10px);
  top: calc(10vh - 30px);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #83bf46aa;

  &:before,
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 20px;
    height: 2px;
    background: #fff;
  }

  &:before {
    left: 4.5px;
    transform: rotate(-45deg);
  }

  &:after {
    right: 4.5px;
    transform: rotate(45deg);
  }

  ${window.screen.width < 930 && 'right: calc(10% - 10px)'};
  ${window.screen.width < 600 && 'right: calc(3% - 10px)'};
`;
