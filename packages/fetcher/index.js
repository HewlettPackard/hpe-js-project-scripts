import { useState, useEffect } from 'react';
import fetch from 'isomorphic-fetch';

function Fetcher(url, reqParams) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  async function loadData() {
    try {
      setLoading(true);
      const actionData = await fetch(url, reqParams);
      setData(actionData);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [url]);

  return [data, isLoading, error];
}

export default Fetcher;
