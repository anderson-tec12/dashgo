import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCountOfRefister: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

// quantidade de itens a ser exibidos nas laterias
const sibilingsCount = 1;

function generatePageArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, i) => {
      return from + i + 1;
    })
    .filter((page) => page > 0);
}

export function Pagination({
  totalCountOfRefister,
  currentPage = 1,
  onPageChange,
  registersPerPage = 10,
}: PaginationProps) {
  // ultima pagian disponivel totalCountOfRefister / registersPerPage
  // como pode retorna um numero quebrado o MAth.round vaiarredondar pra cima
  const lastPage = Math.ceil(totalCountOfRefister / registersPerPage);
  console.log("lastPage", lastPage);
  console.log("lastPage calc", totalCountOfRefister / registersPerPage);

  // paginas a ser carregadas antes da atual
  const previousPages =
    currentPage > 1
      ? generatePageArray(currentPage - 1 - sibilingsCount, currentPage - 1)
      : [];

  // paginas a ser carregadas depois da atual
  const nextPages =
    currentPage < lastPage
      ? generatePageArray(
          currentPage,
          Math.min(currentPage + sibilingsCount, lastPage)
        )
      : [];

  return (
    <Stack
      direction={["column", "row"]}
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Box>
        <strong>{currentPage}</strong> - <strong>{registersPerPage}</strong> de{" "}
        <strong>{totalCountOfRefister}</strong>
      </Box>

      <Stack direction="row" spacing="2">
        {currentPage > 1 + sibilingsCount && (
          <>
            <PaginationItem number={1} onPageChange={onPageChange} />

            {currentPage > 2 + sibilingsCount && (
              <Text color="gray-300" width="8" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map((page) => {
            return (
              <PaginationItem
                key={page}
                number={page}
                onPageChange={onPageChange}
              />
            );
          })}

        <PaginationItem
          number={currentPage}
          isCurrent
          onPageChange={onPageChange}
        />

        {nextPages.length > 0 &&
          nextPages.map((page) => {
            return (
              <PaginationItem
                key={page}
                number={page}
                onPageChange={onPageChange}
              />
            );
          })}

        {currentPage + sibilingsCount < lastPage && (
          <>
            {currentPage + 1 + sibilingsCount < lastPage && (
              <Text color="gray-300" width="8" textAlign="center">
                ...
              </Text>
            )}
            <PaginationItem number={lastPage} onPageChange={onPageChange} />
          </>
        )}
      </Stack>
    </Stack>
  );
}
