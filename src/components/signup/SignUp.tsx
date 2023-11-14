import React, { useState } from "react";
import * as S from "./signup.style";
import { successSignUp } from "../../store/slice/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModalAdress from "./forminput/ModalAdress";
import FormInput from "./forminput/FormInput";
import { checkEmail, signUpUser } from "../../apis/user/signUp";

interface FormData {
  userName: string;
  phoneNumber: string;
  email: string;
  password: string;
  checkPassword: string;
  address: string;
  detailAddress: string;
}

interface AddressData {
  roadAddress: string;
  numberAddress: string;
  postcode: string;
  bname: string;
  buildingName: string;
  apartment: string;
  zonecode: string;
}

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState<AddressData>({
    roadAddress: "",
    numberAddress: "",
    postcode: "",
    bname: "",
    buildingName: "",
    apartment: "",
    zonecode: "",
  });

  const [formData, setFormData] = useState<FormData>({
    userName: "",
    phoneNumber: "",
    email: "",
    password: "",
    checkPassword: "",
    address: "",
    detailAddress: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    userName: "",
    phoneNumber: "",
    email: "",
    password: "",
    checkPassword: "",
    address: "",
    detailAddress: "",
  });
  const [isButtonEnabled, setButtonEnabled] = useState(false);
  //주소 모달여닫기
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleComplete = (data: AddressData) => {
    const roadAddr = data.roadAddress;
    let extraRoadAddr = "";

    if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
      extraRoadAddr += data.bname;
    }

    if (data.buildingName !== "" && data.apartment === "Y") {
      extraRoadAddr +=
        extraRoadAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
    }

    if (extraRoadAddr !== "") {
      extraRoadAddr = ` (${extraRoadAddr})`;
    }
    const fullAddress = `${data.roadAddress} ${data.zonecode} `;
    // 주소 정보를 업데이트
    setFormData({
      ...formData,
      address: fullAddress,
    });

    setAddress({
      ...address,
      postcode: data.zonecode,
      roadAddress: roadAddr,
    });

    closeModal(); // 모달을 닫음
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleBlur = (fieldName: keyof FormData) => {
    const value = formData[fieldName];

    if (!value.trim()) {
      setValidationErrors((prevValidationErrors) => ({
        ...prevValidationErrors,
        [fieldName]: "",
      }));
    } else {
      validateField(fieldName, value);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newValidationErrors: Record<keyof FormData, string> = {
      userName: "",
      phoneNumber: "",
      email: "",
      password: "",
      checkPassword: "",
      address: "",
      detailAddress: "",
    };

    for (const fieldName of Object.keys(formData) as Array<keyof FormData>) {
      validateField(fieldName, formData[fieldName]);

      newValidationErrors[fieldName] = validationErrors[fieldName];
    }

    setValidationErrors(newValidationErrors);

    const isFormValid = Object.values(newValidationErrors).every(
      (error) => !error
    );
    const isAnyFieldFilled = Object.values(formData).some(
      (value) => value.trim() !== ""
    );

    if (!!isFormValid && !!isAnyFieldFilled) {
      try {
        await signUpUser(formData);
        dispatch(successSignUp({ ...formData }));
        navigate("/login");
        setFormData({
          userName: "",
          phoneNumber: "",
          email: "",
          password: "",
          checkPassword: "",
          address: "",
          detailAddress: "",
        });
        setAddress({
          ...address,
          postcode: "",
          roadAddress: "",
          numberAddress: "",
        });
      } catch (error) {
        console.error("가입 요청 에러:", error);
      }
    }
  };

  /**email중복검사 */
  const handleEmailDuplicateCheck = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (!formData.email.trim()) {
      alert("이메일을 입력해주세요!");
      return;
    }
    const requestData = formData.email;
    try {
      const response = await checkEmail(requestData);
      if (response.status === 200) {
        setButtonEnabled(true);
        alert("사용 가능한 이메일입니다.");
      }
    } catch (error: unknown) {
      alert("이메일 중복");
    }
  };

  /**유효성 검사 함수 */
  const validateField = (fieldName: keyof FormData, value: string) => {
    let error = "";
    switch (fieldName) {
      case "userName":
        if (!value) {
          error = "";
        } else if (value.length === 1 && /^[ㄱ-ㅎㅏ-ㅣ]+$/.test(value)) {
          error = "올바르지 않은 이름 형식입니다.";
        } else if (/[ㄱ-ㅎㅏ-ㅣ0-9!@#$%^&*(),.?":{}|<>]/.test(value)) {
          error = "특수문자나 숫자, 초성은 사용할 수 없습니다.";
        }
        break;
      case "phoneNumber":
        if (!value) {
          error = "";
        } else if (!/^\d+$/.test(value) || value.length !== 11) {
          error = "- 없이 11자리의 숫자를 입력해주세요.";
        }
        break;
      case "email":
        if (!value) {
          error = "";
        } else if (
          !/^[A-Za-z0-9]([-_.]?[A-Za-z0-9_])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*.[A-Za-z]{2,3}$/.test(
            value
          )
        ) {
          error = "올바른 이메일 형식이 아닙니다.";
        }
        break;
      case "password":
        if (!value) {
          error = "";
        } else if (
          !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}/.test(
            value
          )
        ) {
          error =
            "영문 대소문자와 숫자, 특수문자 중 2가지 이상 조합하여 8~16자여야 합니다.";
        }
        break;
      case "checkPassword":
        if (!value) {
          error = "";
        } else if (value !== formData.password) {
          error = "비밀번호가 일치하지 않습니다.";
        }
        break;
      case "detailAddress":
        if (!value.trim()) {
          error = "상세주소를 입력해주세요";
        }
        break;
      default:
        break;
    }

    setValidationErrors((prevValidationErrors) => ({
      ...prevValidationErrors,
      [fieldName]: error,
    }));
  };

  const isSubmitButtonEnabled = Object.values(validationErrors).every(
    (error) => !error
  );
  const isAnyFieldFilled = Object.values(formData).every(
    (value) => value.trim() !== ""
  );

  return (
    <S.CenteredContainer>
      <S.Form>
        <S.Title>회원가입</S.Title>
        <FormInput
          label="이름"
          name="userName"
          type="text"
          value={formData.userName}
          onChange={handleChange}
          onBlur={() => handleBlur("userName")}
          errorMessage={validationErrors.userName}
          className={validationErrors.userName ? "error" : ""}
          placeholder="이름"
        />
        <FormInput
          label="휴대폰"
          name="phoneNumber"
          type="text"
          value={formData.phoneNumber}
          onChange={handleChange}
          onBlur={() => handleBlur("phoneNumber")}
          errorMessage={validationErrors.phoneNumber}
          className={validationErrors.phoneNumber ? "error" : ""}
          placeholder="'-'없이 입력"
        />
        <FormInput
          label="이메일"
          name="email"
          type="text"
          value={formData.email}
          onChange={handleChange}
          onBlur={() => handleBlur("email")}
          showButton={true}
          onButtonClick={handleEmailDuplicateCheck}
          placeholder="example@example.com"
        />

        <FormInput
          label="비밀번호"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={() => handleBlur("password")}
          errorMessage={validationErrors.password}
          className={validationErrors.password ? "error" : ""}
          placeholder="비밀번호 (영문 대소문자/숫자/특수문자 중 2가지 이상 조합,8자~16자)"
        />
        <FormInput
          label="비밀번호 재확인"
          name="checkPassword"
          type="password"
          value={formData.checkPassword}
          onChange={handleChange}
          onBlur={() => handleBlur("checkPassword")}
          errorMessage={validationErrors.checkPassword}
          className={validationErrors.checkPassword ? "error" : ""}
          placeholder="비밀번호 확인"
        />
        <FormInput
          label="우편번호"
          name="postcode"
          type="text"
          value={address.postcode}
          onChange={handleChange}
          placeholder="우편번호"
          showButton={true}
          onButtonClick={openModal}
        />
        <FormInput
          label="도로명주소"
          name="roadAddress"
          type="text"
          value={address.roadAddress}
          onChange={handleChange}
          placeholder="도로명주소"
        />
        <FormInput
          label="상세주소"
          name="detailAddress"
          type="text"
          value={formData.detailAddress}
          onChange={handleChange}
          onBlur={() => handleBlur("detailAddress")}
          errorMessage={validationErrors.detailAddress}
          className={validationErrors.detailAddress ? "error" : ""}
          placeholder="상세주소를 입력해주세요."
        />
        <S.StyledInputWithCustomStyle
          type="submit"
          onClick={handleSubmit}
          disabled={
            !isSubmitButtonEnabled || !isAnyFieldFilled || !isButtonEnabled
          }
        >
          회원가입
        </S.StyledInputWithCustomStyle>
      </S.Form>
      {isModalOpen && (
        <ModalAdress
          isOpen={isModalOpen}
          onClose={closeModal}
          onComplete={handleComplete}
        />
      )}
    </S.CenteredContainer>
  );
};

export default SignUp;
