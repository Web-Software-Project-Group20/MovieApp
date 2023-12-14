import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #45575C;
  border: none;
  border-radius: 50px;
  color: #F3F3E7;
  padding: 1rem 5rem;
  text-align: center;
  font-size: 18px;
  margin: 1rem 0;
  cursor: pointer;

  &:hover {
    background-color: #80000070;
  }

  @media (max-width: 768px) {
    display: none;
`;

export { StyledButton };
