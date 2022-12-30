import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Anderson Barros</Text>
          <Text color="gray.300" fontSize="small">
            anderson.tec12@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Anderson Barros"
        src="https://avatars.githubusercontent.com/u/12089780?v=4"
      />
    </Flex>
  );
}
