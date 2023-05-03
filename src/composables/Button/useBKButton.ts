import {
  BKButtonColor,
  BKButtonShape,
  BKButtonSize,
  BKButtonVariant
} from "../../types/components";

export function useBKButton() {
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    danger: "btn-danger",
    success: "btn-success",
    warning: "btn-warning",
    info: "btn-info",
    light: "btn-light",
    dark: "btn-dark",
    "outline-primary": "btn-outline-primary",
    "outline-secondary": "btn-outline-secondary",
    "outline-danger": "btn-outline-danger",
    "outline-success": "btn-outline-success",
    "outline-warning": "btn-outline-warning",
    "outline-info": "btn-outline-info",
    "outline-light": "btn-outline-light",
    "outline-dark": "btn-outline-dark"
  };

  const sizes = {
    sm: "btn-sm",
    md: "",
    lg: "btn-lg"
  };

  const shapes = {
    default: "",
    pill: "rounded-pill",
    square: "rounded-0"
  };

  const getClassVariant = (
    variant: BKButtonVariant,
    color: BKButtonColor
  ): string => {
    if (variant === "outline") return variants[`outline-${color}`];

    return variants[color];
  };

  const getClassSize = (size: BKButtonSize) => sizes[size];

  const getClassShape = (shape: BKButtonShape) => shapes[shape];

  return {
    getClassVariant,
    getClassSize,
    getClassShape
  };
}
