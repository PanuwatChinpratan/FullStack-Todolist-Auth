import { useQuery } from '@tanstack/react-query'

export const useTodos = (userEmail: string | null) => {
  return useQuery({
    queryKey: ['todos', userEmail],
    queryFn: async () => {
      if (!userEmail) return []
      const res = await fetch(`/api/data?email=${userEmail}`)
      return await res.json()
    },
    enabled: !!userEmail,
  })
}
