import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
`;

export const ArrowsWrapper = styled.div`
  display: none;

  ${({ theme }) => theme.mq.xs} {
    position: absolute;
    top: 50%;
    left: 0.5rem;
    right: 0.5rem;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }
`;

type ArrowButtonProps = {
  right?: boolean;
};

export const ArrowButton = styled.button<ArrowButtonProps>`
  display: none;

  ${({ theme }) => theme.mq.xs} {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 4.5rem;
    height: 4.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.grey};
    border: none;
    cursor: pointer;
    transition: opacity 0.2s ease-in;
    z-index: 4;

    ${({ right }) => {
      switch (right) {
        case true:
          return 'right: 0.5rem;';
          break;
        default:
          return 'left: 0.5rem;';
      }
    }}

    svg {
      width: 2rem;
      height: 2rem;
      fill: ${({ theme }) => theme.colors.white};
      transition: transform 0.2s ease-in;
    }

    &:hover {
      opacity: 1;

      svg {
        transform: scale(1.1);
      }
    }
  }
`;
