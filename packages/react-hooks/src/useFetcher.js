// (C) Copyright 2019 Hewlett Packard Enterprise Development LP.
import { useState, useEffect, useCallback } from 'react';
import fetch from 'isomorphic-fetch';

function useFetcher(url, reqParams) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(url, reqParams);
      const responseData = await response.json();
      setData(responseData);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [url, reqParams]);

  useEffect(() => {
    loadData();
  }, [loadData, url]);

  return [data, isLoading, error];
}

export default useFetcher;
