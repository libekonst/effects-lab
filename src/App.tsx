import React, { useReducer, useState } from "react";
import { Pivot, PivotItem } from "office-ui-fabric-react/lib/Pivot";
import { useObservableEffect } from "./lib/handleEffect";
import { mockService } from "./mockService";
import { initial, onLoad, reducer, onFail, onSuccess } from "./app/state";

enum Routes {
  ON_MOUNT = "ON_MOUNT",
  ON_CLICK = "ON_CLICK",
}

function App() {
  const [route, setRoute] = useState(Routes.ON_MOUNT);

  return (
    <Pivot aria-label="Select methodology" selectedKey={route}>
      <PivotItem headerText="On mount" key={Routes.ON_MOUNT}>
        <OnMount />
      </PivotItem>
      <PivotItem headerText="On click" key={Routes.ON_CLICK}>
        <OnMount />
      </PivotItem>
    </Pivot>
  );
}

export default App;
function OnMount() {
  const [state, dispatch] = useReducer(reducer, initial);

  const runEffect = useObservableEffect(mockService, {
    loading: () => dispatch(onLoad()),
    failure: (err) => dispatch(onFail(err)),
    success: (v) => dispatch(onSuccess(v)),
  });

  // useEffect(() => {
  //   const unsub = handleEffect(mockService).when({
  //     loading: () => dispatch(onLoad()),
  //     failure: (err) => dispatch(onFail(err)),
  //     success: (v) => dispatch(onSuccess(v)),
  //   });

  //   return () => unsub();
  // }, []);

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={runEffect}>fetch</button>
        <p>{JSON.stringify(state, null, 2)}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
