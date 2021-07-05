import {
  Icon,
  FormLabel,
  FormControl,
  FormErrorMessage,
  InputRightElement,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";

import React, {
  useState,
  forwardRef,
  ElementType,
  ForwardRefRenderFunction,
} from "react";
import { FieldError } from "react-hook-form";
import { BsEyeSlash } from "react-icons/bs";
import { BsEyeFill } from "react-icons/bs";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string | React.ReactNode;
  iconRight?: ElementType;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { ...props }: InputProps,
  ref
) => {
  const { name, label, iconRight, type, error = null } = props;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel htmlFor="email" mb={-1}>
          {label}
        </FormLabel>
      )}
      <ChakraInput
        id={name}
        name={name}
        color="gray.500"
        bgColor="gray.50"
        variant="flushed"
        _placeholder={{
          color: "gray.500",
          fontStyle: "italic",
        }}
        {...props}
        ref={ref}
        type={type === "password" ? (showPassword ? "password" : "text") : type}
      />
      {type === "password" && (
        <InputRightElement
          mt="7"
          mr="2"
          color="gray.500"
          cursor="pointer"
          onClick={() => {
            setShowPassword(!showPassword);
          }}
          children={<Icon as={showPassword ? BsEyeFill : BsEyeSlash} />}
        />
      )}
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

const Input = forwardRef(InputBase);
export default Input;
