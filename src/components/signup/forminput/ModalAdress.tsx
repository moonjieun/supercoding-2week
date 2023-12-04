import React from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { AddressData } from "../SignUp";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: AddressData) => void;
}

const AddressModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay backgroundColor="rgba(0, 0, 0, 0.5)" />
    <ModalContent
      padding="40px"
      bgColor="white"
      width="500px"
      position="fixed"
      top="33%"
      left="40%"
    >
      <ModalHeader fontSize="24px">주소 검색</ModalHeader>
      <ModalCloseButton
        width="20%"
        color="#007bff"
        border="2px solid #007bff"
        bgColor="white"
        borderRadius="10px"
        padding="10px"
        margin="10px 0"
      />
      <ModalBody width="100%">
        <DaumPostcodeEmbed onComplete={onComplete} />
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default AddressModal;
