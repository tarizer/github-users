import React from "react";
import { useLocation } from "react-router-dom";

export const NotFound = () => {
  const location = useLocation();

  return (
    <h3>
      Page not found in <code>{location.pathname}</code>
    </h3>
  );
};
