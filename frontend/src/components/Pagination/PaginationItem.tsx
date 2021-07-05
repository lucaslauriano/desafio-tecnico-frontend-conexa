import { Button } from "@chakra-ui/react";
interface PaginationItemProps {
  isCurrent?: boolean;
  number: number;
}

const PaginationItem = ({ isCurrent = false, number }: PaginationItemProps) => {
  if (isCurrent) {
    return (
      <Button
        size="xs"
        width="2"
        fontSize="xs"
        disabled
        _disabled={{
          bg: "blue.500",
          cursor: "default",
        }}
        colorScheme="blue"
      >
        1
      </Button>
    );
  }

  return (
    <Button
      size="xs"
      width="2"
      fontSize="xs"
      colorScheme="gray"
      _hover={{
        bg: "gray.200",
        color: "gray.500",
        cursor: "default",
      }}
    >
      2
    </Button>
  );
};

export default PaginationItem;
