import {
  Spinner,
  Box,
  Text,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Th,
  Thead,
  Tr,
  Tbody,
  Td,
  useBreakpointValue,
  Link,
} from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";
import NextLink from "next/link";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Pagination } from "../../components/Pagination";
import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { useState } from "react";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";
import { GetServerSideProps } from "next";
import { UseQueryOptions } from "react-query";
type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

type GetUsersResponse = {
  users: User[];
  totalCount: number;
};

export default function UserList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error, isFetching } = useUsers(page);
  // //ssr
  // const { data, error, isFetching, isLoading } = useUsers(page, {
  //   initialData: users
  // })

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function handlerPrefetchUser(userId: number) {
    console.log("Fazer consulta");
    await queryClient.prefetchQuery(
      ["user", userId],
      async () => {
        const response = await api.get(`users/${userId}`);
        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10, // 1 minute
      }
    );
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mmb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>

            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo usuário
              </Button>
            </NextLink>
          </Flex>

          {isLoading ? (
            <Flex justify="center" align="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados para listagem de usuários</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th> Data de cadastro </Th>}
                  </Tr>
                </Thead>

                <Tbody>
                  {data.users.map((user) => (
                    <Tr key={user.id}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme="pink" />
                      </Td>

                      <Td>
                        <Box>
                          <Link
                            color="purple.400"
                            onMouseEnter={() => handlerPrefetchUser(user.id)}
                          >
                            <Text fontWeight="bold">{user.name}</Text>
                          </Link>
                          <Text fontSize="sm" color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>

                      {isWideVersion && <Td>{user.created_at}</Td>}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Pagination
                totalCountOfRefister={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

// export const getServerSideProps: GetServerSideProps<
//   GetUsersResponse
// > = async () => {
//   const { users, totalCount } = await getUsers(1);

//   return {
//     props: {
//       totalCount,
//       users,
//     },
//   };
// };
