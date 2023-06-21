import { BackgroundColor } from "../../types";

export function useBackgroundColor() {
  const variants = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    danger: "bg-danger",
    success: "bg-success",
    warning: "bg-warning",
    info: "bg-info",
    light: "bg-light",
    dark: "bg-dark",
    whitesmoke: "bg-whitesmoke",
  };

  const getBackgroundClass = (color: BackgroundColor) => variants[color];

  return {
    getBackgroundClass
  };
}
