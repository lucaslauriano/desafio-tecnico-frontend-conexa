import { Flex, Input, Icon } from "@chakra-ui/react";
import { useRef } from "react";
import { RiSearch2Line } from "react-icons/ri";

const SearchBox = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <Flex
      as="label"
      py="1"
      px="8"
      ml="50"
      flex="1"
      border="1px solid"
      maxWidth={600}
      position="relative"
      borderColor="gray.200"
      borderRadius="full"
    >
      <Input
        px="4"
        mr="4"
        color="gray.500"
        variant="unstyled"
        ref={searchInputRef}
        placeholder="Buscar consulta"
        _placeholder={{
          color: "gray.500",
        }}
      />
      <Icon as={RiSearch2Line} fontSize="20" mt="2px" />
    </Flex>
  );
};

export default SearchBox;
