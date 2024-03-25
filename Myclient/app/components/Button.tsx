import { useMemo } from "react";
import clsx from "clsx";

type ButtonProps = {
  mode?:
    | "primary"
    | "primaryContained"
    | "primaryContainedShadow"
    | "secondary"
    | "secondaryContained"
    | "secondaryContainedShadow"
    | "normal"
    | "normalContained";
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...props }: ButtonProps) => {
  const buttonStyle = useMemo(() => {
    switch (props.mode) {
      case "primary":
        return " text-white";
      case "primaryContained":
        return "primaryContained text-white";
      case "primaryContainedShadow":
        return "bg-btnPrimary shadow-btnPrimary text-white";
      case "secondary":
        return "bg-btnSecondary text-white";
      case "secondaryContained":
        return "secondaryContained text-white";
      case "secondaryContainedShadow":
        return "secondaryContainedShadow text-white";
      case "normal":
        return "text-[#55657e] hover:bg-[rgba(255,255,255,0.1)] hover:text-white";
      case "normalContained":
        return "bg-[rgba(255,255,255,0.1)] text-[#55657e]";
      default:
        return "text-[#55657e] ";
    }
  }, []);

  return (
    <button
      className={clsx("font-semibold rounded-md py-2 px-4", buttonStyle)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
