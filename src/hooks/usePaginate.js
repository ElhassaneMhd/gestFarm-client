import { useSearchParams } from "react-router-dom";

export const usePaginate = () => {
      const [searchParams] = useSearchParams();
      const page = searchParams.get("page") || 1;
      const limit = searchParams.get("limit") || 10;
    return {page,limit}
}