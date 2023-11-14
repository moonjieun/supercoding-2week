import React from "react";
import * as S from "../signup.style";

interface InputProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  errorMessage?: string;
  className?: string;
  placeholder?: string;
  showButton?: boolean;
  onButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  inputStyle?: React.CSSProperties;
}

const FormInput: React.FC<InputProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  onBlur,
  errorMessage,
  className,
  placeholder,
  showButton,
  onButtonClick,
  inputStyle,
}) => (
  <S.InputContainer>
    <S.StyledLabel htmlFor={name}>{label}</S.StyledLabel>
    <S.StyledInput
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={className || ""}
      placeholder={placeholder}
      style={inputStyle}
    />
    {errorMessage && (
      <S.StyledSpan className="error-message">{errorMessage}</S.StyledSpan>
    )}
    {showButton && (
      <S.DuplicateCheckButton type="button" onClick={onButtonClick}>
        {label === "이메일" ? "중복확인" : "주소 검색"}
      </S.DuplicateCheckButton>
    )}
  </S.InputContainer>
);

export default FormInput;
