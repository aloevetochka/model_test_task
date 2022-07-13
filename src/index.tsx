import React, { useContext, useState } from "react";
import ReactDOM from "react-dom/client";
import { createContext } from "react";

interface Param {
  id: number;
  name: string;
  type?: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface IContext {
  params: Param[];
  model: Model;
}

interface IApp {
  props: Props;
}

interface Props {
  params: Param[];
  model: Model;
}

const PARAMS = [
  { id: 1, name: "Назначение" },
  { id: 2, name: "Длина" },
];

const MODEL = {
  paramValues: [
    { paramId: 1, value: "повседневное" },
    { paramId: 2, value: "макси" },
  ],
};

const PROPS_MOCKUP = {
  params: PARAMS,
  model: MODEL,
};

const ParamsCtx = createContext<IContext | null>(null);

function ParamValue({ name, id }: Param) {
  const context = useContext(ParamsCtx);

  const selectedParam = context?.model.paramValues.find(
    (el) => el.paramId === id
  );

  const prevParamValue = selectedParam?.value;

  const [value, setParamValue] = useState(prevParamValue);

  const onInputChange = (e: any) => {
    const curValue = e.target.value;
    setParamValue(curValue);
    if (selectedParam) {
      selectedParam.value = curValue;
    }
  };

  return (
    <div>
      <div className="d-flex row">
        <div>{name}</div>
        <input
          value={value}
          placeholder="value"
          type="text"
          name="param value"
          onChange={onInputChange}
        ></input>
      </div>
    </div>
  );
}

function ParamsList() {
  const context = useContext(ParamsCtx);
  const parameters = context?.params.map((el: any) => {
    const { id } = el;
    return (
      <div key={id}>
        <ParamValue {...el} />
      </div>
    );
  });

  return (
    <div>
      <div>{parameters}</div>
    </div>
  );
}

function ParamEditor() {
  const context = useContext(ParamsCtx);

  const getModel = () => {
    console.log(context?.model);
  };

  return (
    <div>
      <ParamsList />
      <div className="d-flex justify-content-around mt-3">
        <button className="btn btn-success" onClick={getModel}>
          GetModel
        </button>
        <div className="d-flex align-items-center">look at the console</div>
      </div>
    </div>
  );
}

function App({ props }: IApp) {
  return (
    <div>
      <div className="d-flex justify-content-center">
        <div>
          <h1 className="text-center">Model</h1>
          <ParamsCtx.Provider value={props}>
            <ParamEditor />
          </ParamsCtx.Provider>
        </div>
      </div>
      <div className="d-flex justify-content-center pt-2"></div>
    </div>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App props={PROPS_MOCKUP} />
  </React.StrictMode>
);
