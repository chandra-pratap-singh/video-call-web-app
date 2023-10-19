import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

export const lazy = (importFn) => {
  function Lazy(props) {
    const [Component, setComponent] = useState(null);
    useEffect(() => {
      async function load() {
        const loadedComponent = await importFn();
        setComponent(h(loadedComponent.default, props));
      }
      load();
    }, []);
    return Component;
  }
  return Lazy;
};
