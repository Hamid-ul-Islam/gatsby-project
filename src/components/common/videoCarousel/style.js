import Slider from 'react-slick'
import styled from 'styled-components'

export const StyledSlider = styled(Slider)`
  .slick-track {
    display: flex;
    align-items: flex-start;
    margin: 0;

    @media (max-width: 640px) {
      flex-direction: column;
      align-items: center;
    }
  }
  .slick-track .slick-slide {
    display: flex;
    height: auto;
    align-items: center;

    @media (max-width: 640px) {
      flex-direction: column;
      align-items: center;
      padding-bottom: 16px;
    }
  }

  .slick-slide > div {
    display: flex;
  }

  .slick-slide {
    margin: 0 8px;
  }

  /* the parent */
  .slick-list {
    margin: 0 -8px;

    @media (max-width: 640px) {
      padding-bottom: -16px;
    }
  }

  /* .slick-cloned button,
  .slick-cloned a {
    visibility: hidden;
  } */
`
