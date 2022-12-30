import { useQuery, UseQueryOptions } from "react-query";
import { api } from "../api";

type User = {
  id: number;
  name: string;
  email: string;
  // createdAt: string;
  created_at: string;
};

type GetUsersResponse = {
  users: User[];
  totalCount: number;
};

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get("users", {
    params: {
      page,
    },
  });

  const totalCount = Number(headers["x-total-count"]);

  const users = data.users.map((user) => {
    return {
      ...user,
      created_at: new Date(user.created_at).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });
  return { users, totalCount };
}

export function useUsers(page: number) {
  const query = useQuery(["users", page], () => getUsers(page), {
    staleTime: 1000 * 5, // 5 seconds com os dados sendo fresh
  });

  console.log("query", query);

  return query;
}

export function useUsersSSR(page: number, options: UseQueryOptions) {
  const query = useQuery(["users", page], () => getUsers(page), {
    staleTime: 1000 * 1, // 5 seconds com os dados sendo fresh
    ...options,
  });

  console.log("query", query);

  return query;
}
