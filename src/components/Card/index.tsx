import styled from 'styled-components';

const CardContainer = styled.div`
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Card: React.FC = ({ children }) => {
  return <CardContainer>{children}</CardContainer>;
};
