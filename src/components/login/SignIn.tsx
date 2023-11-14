import React, { useState } from "react";
import * as S from "./signin.style";
import kakaologo from "../../img/kakao.png";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/slice/userSlice";
import axios from "axios";
import { signIn } from "../../apis/user/signIn";
import FormInput from "../signup/forminput/FormInput";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordError("");
  };

  const handleLogin = async () => {
    const loginUser = { email, password };
    if (!validateEmail(email)) {
      setEmailError("이메일 형식이 올바르지 않습니다.");
    }

    if (!validatePassword(password)) {
      setPasswordError("비밀번호 형식이 올바르지 않습니다.");
      return;
    }

    try {
      const response = await signIn(email, password);
      if (response.status === 200) {
        const token = response.data.token;
        dispatch(login(loginUser));
        localStorage.setItem("accesstoken", token);
        navigate("/");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorCode = error.response?.data.errorCode;
        const errorMessage = error.response?.data.errorMessage;

        if (errorCode === "INVALID_LOGIN_INPUT") {
          alert(errorMessage);
        }
      }
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const getInputStyles = (error: boolean, valid: boolean) => ({
    borderColor: error ? "red" : valid ? "#43C37D" : "#e8f3ff",
    boxShadow: error
      ? "0px 0px 2px red"
      : valid
      ? "0px 0px 2px #43C37D"
      : "none",
  });

  //소셜 로그인
  const { Kakao } = window;
  const loginWithKakao = () => {
    Kakao.Auth.loginForm({
      redirectUri: `${process.env.REACT_APP_FRONTEND_BASE_URL}/login/oauth`,
      scope: "profile_nickname,profile_image,account_email",
    });
  };
  const handleSignUp = () => {
    navigate("/signup");
  };
  return (
    <S.CenteredContainer>
      <S.Form>
        <S.Title>로그인</S.Title>
        <S.Sub>계정으로 로그인하세요. 환영합니다!</S.Sub>
        <FormInput
          label="이메일"
          name="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          onBlur={() => {}}
          errorMessage={emailError}
          placeholder="example@example.com"
          showButton={false}
          inputStyle={getInputStyles(!!emailError, validateEmail(email))}
        />{" "}
        <FormInput
          label="비밀번호"
          name="password"
          type="password"
          value={password}
          onChange={handleEmailChange}
          onBlur={() => {}}
          errorMessage={passwordError}
          placeholder="대문자,소문자,특수문자를 반드시 입력해야합니다."
          showButton={false}
          inputStyle={getInputStyles(!!passwordError, validateEmail(password))}
        />
        <S.ButtonContainer>
          <S.SocialButtons onClick={loginWithKakao}>
            <img src={kakaologo} alt="login with kakao" />
          </S.SocialButtons>
          <S.StyledButton onClick={handleLogin}>로그인</S.StyledButton>
          <S.StyledInputWithCustomStyle onClick={handleSignUp}>
            회원가입
          </S.StyledInputWithCustomStyle>
        </S.ButtonContainer>
      </S.Form>
    </S.CenteredContainer>
  );
};

export default SignIn;
