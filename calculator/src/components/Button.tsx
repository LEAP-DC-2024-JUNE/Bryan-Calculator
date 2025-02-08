import { ButtonType } from "@/utils/Types";

type ButtonProps = {
  data: ButtonType;
  handleClick: (label: string, type: string) => void;
};

const Button = ({ data, handleClick }: ButtonProps) => {
  return (
    <button
      onClick={() => handleClick(data.label, data.type)}
      className={`min-w-20 h-10 bg-white text-lg font-semibold rounded-lg
        ${data.label === "C" && "col-span-2"}
        ${
          data.type !== "number" && data.type !== "period"
            ? "text-orange-500 hover:bg-orange-500"
            : "hover:bg-gray-400"
        }
         hover:text-white`}
    >
      {data.label}
    </button>
  );
};

export default Button;
