import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then(res => res.json())

function useProducts (id) {
  const { data, error } = useSWR(`/api/products`, fetcher)

  return {
    productList: data,
    isLoading: !error && !data,
    isError: error
  }
}

export default useProducts