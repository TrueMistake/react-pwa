import axios from "axios";
import {useEffect, useState} from "react";

export function useGetResponse(url, pageNumber = 1, detail) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [response, setResponse] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    axios({
      method: 'GET',
      url: detail ? `${url}/${detail}` : url,
      params: detail ? {} : {page: pageNumber}
    }).then(res => {
      setResponse(prevState => detail ? res.data : prevState.concat(res.data?.results));
      setLoading(false);
      setHasMore(res.data.results?.length > 0)
    }).catch(e => {
      console.error(e);
      setError(true);
    })
  }, [url, pageNumber]);

  return {
    loading,
    error,
    response,
    hasMore
  }
}