import styled from 'styled-components';

export const Button = styled.button`
  color: white;
  border: none;
  padding: 10px 20px;
  margin-left: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;

  &[data-action='save'] {
    background-color: #28a745;

    &:hover {
      background-color: #218838;
    }
  }

  &[data-action='new'] {
    background-color: #0086ed;

    &:hover {
      background-color: #299bf2;
    }
  }

  &[data-action='cancel'] {
    background-color: #dc3545;

    &:hover {
      background-color: #c82333;
    }
  }
`;
