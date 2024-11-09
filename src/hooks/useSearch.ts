import { useEffect, useRef, useState } from "react";

export const useSearch = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const isFirstInputFocus = useRef(true);

  useEffect(() => {
    if (isFirstInputFocus.current) {
      isFirstInputFocus.current = query === '';
      return;
    }
    if (query === "") {
      setError("No se puede buscar al go vacio ");
    }
  }, [query]);

  return {
    query,
    setQuery,
    error,
  };
};
