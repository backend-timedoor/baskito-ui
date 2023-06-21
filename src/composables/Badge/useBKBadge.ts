import { BKBadgeType } from "../../types/components";

export function useBKBadge() {
  const types = {
    primary: "badge-primary",
    secondary: "badge-secondary",
    danger: "badge-danger",
    success: "badge-success",
    warning: "badge-warning",
    info: "badge-info",
    light: "badge-light",
    dark: "badge-dark",
    transparent: "badge-transparent",
  };

  const getClassType = (type: BKBadgeType) => types[type];

  return {
    getClassType,
  };
}
