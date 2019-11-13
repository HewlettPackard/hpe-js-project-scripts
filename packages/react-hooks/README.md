# HPE JS Reusable React Hooks

A set of reusable React hooks to use in your React >= v16.8.0 projects. To install the reusable hooks package run the following command in your project directory.
`npm install -D @hpe/react-hooks` or `yarn add @hpe/react-hooks`

## useFetcher

A set of hooks for fetching asynconchronus data. Uses `isomorphic-fetch` to allow for server-side rendering. Here's how to use this hook in your React project.

1. Import the hook at the top of your componenet file `import { useFetcher } from '@hpe/react-hooks';`
2. In your component add `const [data, loading, error] = useFetcher('https://myapi/data');`. When `data` is available it will return a json parsed object, `loading` returns a boolean to allow a loading state while `error` will provide any request errors the hook encountered.

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

## useIntersection

![intersection example animation](http://g.recordit.co/PTPsuBgrHT.gif)

A hook for observing when a DOM node or nodes enters or leaves a browser viewport. `useIntersection` accepts all parameters which the [Intersection Observer API spec](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) accepts including `root`, `rootMargin`, and `threshold`.

_**Note:** this feature is not IE11 compatible without a [polyfill](https://github.com/thebuilder/react-intersection-observer/tree/master#polyfill)_

Below is an example React application using the `useIntersection` hook.

```javascript
import React from 'react';
import { useIntersection } from '@hpe/react-hooks';

function App() {
  const [thingToWatch, entry] = useIntersection();
  const isVisible = entry.isIntersecting;

  return (
    <div>
      <div style={{ height: '100vh' }} />
      <div ref={thingToWatch}>
        <h1
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 1s ease-in',
          }}
        >
          Im now in view{' '}
          <span role="img" aria-label="eyes looking around">
            👀
          </span>
        </h1>
      </div>
      <div style={{ height: '100vh' }} />
    </div>
  );
}
```

## useEntryPosition

![intersection example animation](http://g.recordit.co/Dh6KJybnzh.gif)

A hook to gain insights on an element's position in the browser viewport. The `useEntryPosition` returns three array items. The first is your ref to a component in the example we use `boxPosToWatch`. The second is an object containing `elementIs` and `direction`. `direction` refers to the direction the user is scrolling and will return either `up` or `down`. `elementIs` returns the element's position in relation to the view port, its return strings are `leaving`, `entering`, or `visible`. `visible` simply means the element is fully contained within the user's viewport. The third item being returned in the callback is `entryObserver`, this is an intersection observer on your ref. This observer can be used to extend the functionality of the position hook and will allow the developer to be very creative in what is possible with this hook.

Here is an example using the `useEntryPosition` hook:

```javascript
import React from 'react';
import { useEntryPosition } from '@hpe/react-hooks';

const Space = () => (
  <div /* The final frontier */ style={{ height: '101vh' }} />
);

function App() {
  const [boxPosToWatch, { direction, elementIs }] = useEntryPosition();
  return (
    <div>
      <Space />
      <div
        ref={boxPosToWatch}
        style={{
          display: 'inline-block',
          padding: '20px',
          border: `${elementIs === 'visible' ? 'green' : 'red'} 3px solid`,
          transition: 'border-color 1s linear',
        }}
      >
        <h1>
          You are scrolling {direction} {direction === 'up' ? '⬆️' : '⬇️️'}{' '}
          while
          <br />
          element is <u>{elementIs}</u> in the window.
        </h1>
      </div>
      <Space />
    </div>
  );
}
```
