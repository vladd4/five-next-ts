import { useEffect } from "react";

const useClickOutside = (
  componentRef: any,
  componentState: boolean,
  handleComponentState: (v: boolean) => void,
  nodeElement: HTMLElement | null
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        componentState &&
        componentRef.current &&
        !componentRef.current.contains(event.target as Node) &&
        event.target !== nodeElement
      ) {
        handleComponentState(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [componentState, componentRef, handleComponentState, nodeElement]);
};

export default useClickOutside;
