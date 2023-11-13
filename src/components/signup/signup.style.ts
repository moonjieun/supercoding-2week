import { styled } from "styled-components";

export const CenteredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 50px;
`;

export const Form = styled.form`
  padding: 20px 80px;
  border-radius: 20px;
`;

export const Title = styled.h2`
  padding-top: 40px;
  padding-bottom: 20px;
  font-size: 36px;
  font-weight: bold;
  color: #4593fc;
`;

export const Sub = styled.p`
  font-size: 14px;
  padding-bottom: 20px;
  color: rgba(0, 0, 0, 0.7);
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 0;
`;

export const StyledButton = styled.button`
  background-color: #4593fc;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 120px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.05);
`;

export const StyledInput = styled.input`
  width: 554px;
  padding: 20px 20px;
  font-size: 16px;
  border: 1px solid #e8f3ff;
  border-radius: 5px;

  &::placeholder {
    color: #9ec8ff;
  }

  &.error,
  .touched {
    border: 1px solid red;
    box-shadow: 0px 0px 2px red;
  }
`;

export const StyledInputWithCustomStyle = styled(StyledButton)`
  width: 50%;
  margin: 30px auto;
  background-color: ${(props) => (props.disabled ? "gray" : "#007bff")};
  color: white;
  border: none;
  padding: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonCustomStyle = styled(StyledButton)`
  width: 20%;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #4593fc;
  color: #4593fc;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.05);
`;

export const SocialButtons = styled.div``;

export const ErrorText = styled.p`
  margin-top: 10px;
  color: #e72d4a;
  font-size: 12px;
`;

export const StyledLabel = styled.label`
  font-weight: bold;
  padding-bottom: 10px;
  color: rgba(0, 0, 0, 0.7);
`;

export const StyledSpan = styled.span`
  padding-top: 10px;
  color: red;
  font-size: 12px;
`;

export const DuplicateCheckButton = styled.button`
  width: 20%;
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;
