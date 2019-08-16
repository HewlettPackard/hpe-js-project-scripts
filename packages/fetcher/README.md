# HPE JS Reusable React Hooks

A set of reusable React hooks to use in your React >= v16.8.0 projects.

## useFetcher

A set of hooks for fetching asynconchronus data. Uses `isomorphic-fetch` to allow for server-side rendering. Here's how to use this hook in your React project.

1. `npm install -D @hpe/react-hooks` or `yarn add @hpe/react-hooks`
2. Import the hook at the top of your componenet file `import { useFetcher } from '@hpe/react-hooks';`
3. In your component add `const [data, loading, error] = useFetcher('https://myapi/data');`. When `data` is available it will return a json parsed object, `loading` returns a boolean to allow a loading state while `error` will provide any request errors the hook encountered.

`useFetcher` accepts a second parameter to accomplish more customized requests, the second parameter behaves exactly a standard `fetch` call. More information can be found in the [fetch spec](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Supplying_request_options).

Below is an example React component using the `useFetcher` hook.

```javascript
import React from 'react';
import { useFetcher } from '@hpe/react-hooks';

function App() {
  const [data, loading, error] = useFetcher(
    'https://api.openweathermap.org/data/2.5/weather?zip=27278&appid=18ef348ece45174572c5e3d4be8a8d69&units=imperial',
  );
  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && (
        <div>
          This error happened:{' '}
          <span style={{ background: '#d14545', padding: '2px 5px' }}>
            {error.toString()}
          </span>
        </div>
      )}
      {data && (
        <div>
          {data.name} is {data.main.temp} degrees.
        </div>
      )}
    </div>
  );
}

export default App;
```
