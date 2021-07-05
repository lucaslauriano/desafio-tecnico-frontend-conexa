import { Td, Tr, Tbody, Skeleton, SkeletonText } from "@chakra-ui/react";

const SkeletonTBody = () => {
  return (
    <Tbody>
      <Tr>
        <Td w="80%">
          <SkeletonText />
        </Td>
        <Td w="20%">
          <Skeleton />
        </Td>
      </Tr>
      <Tr>
        <Td w="80%">
          <SkeletonText />
        </Td>
        <Td w="20%">
          <Skeleton />
        </Td>
      </Tr>
      <Tr>
        <Td w="80%">
          <SkeletonText />
        </Td>
        <Td w="20%">
          <Skeleton />
        </Td>
      </Tr>
      <Tr>
        <Td w="80%">
          <SkeletonText />
        </Td>
        <Td w="20%">
          <SkeletonText />
        </Td>
      </Tr>
    </Tbody>
  );
};

export default SkeletonTBody;
