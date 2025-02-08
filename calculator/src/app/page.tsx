"use client";

import Button from "@/components/Button";
import { ButtonType, SymbolType } from "@/utils/Types";
import { useState } from "react";

const buttons: ButtonType[] = [
  { label: "7", type: "number" },
  { label: "8", type: "number" },
  { label: "9", type: "number" },
  { label: "CE", type: "clear entry" },
  { label: "4", type: "number" },
  { label: "5", type: "number" },
  { label: "6", type: "number" },
  { label: "/", type: "divide" },
  { label: "1", type: "number" },
  { label: "2", type: "number" },
  { label: "3", type: "number" },
  { label: "*", type: "multiply" },
  { label: "0", type: "number" },
  { label: ".", type: "period" }, // or radix
  { label: "00", type: "number" },
  { label: "-", type: "subtract" },
  { label: "C", type: "clear" },
  { label: "=", type: "equal" },
  { label: "+", type: "add" },
];
const symbol: SymbolType = {
  add: "+",
  subtract: "-",
  multiply: "*",
  divide: "/",
};

const HomePage = () => {
  const [inputValue, setInputValue] = useState("");
  const [hasPeriod, setHasPeriod] = useState(false);
  const [operation, setOperation] = useState("");
  const [storedValue, setStoredValue] = useState("");
  const [flag, setFlag] = useState(false);

  const handleNumberClick = (label: string) => {
    if (flag) {
      setInputValue("");
      setHasPeriod(false);
      setFlag(false);
    }
    setInputValue((prevState) => {
      if (prevState === "") {
        if (label === "00") {
          label = "0";
        }
        return prevState + label;
      } else if (prevState === "0") {
        if (label !== "0" && label != "00") {
          return label;
        } else {
          return prevState;
        }
      }
      return prevState + label;
    });
  };

  const calculate = (operand1: string, operand2: string): string => {
    const op1 = parseFloat(operand1);
    const op2 = parseFloat(operand2);
    switch (operation) {
      case "add":
        return (op1 + op2).toString();
      case "subtract":
        return (op1 - op2).toString();
      case "multiply":
        return (op1 * op2).toString();
      case "divide":
        return (op1 / op2).toString();
      default:
        return "";
    }
  };

  const handleGeneralClick = (label: string, type: string) => {
    switch (type) {
      case "number":
        handleNumberClick(label);
        break;
      case "clear entry":
        setInputValue("");
        setHasPeriod(false);
        break;
      case "clear":
        if (inputValue[inputValue.length - 1] === ".") setHasPeriod(false);
        setInputValue((prevState) => {
          return prevState.length > 0
            ? prevState.slice(0, prevState.length - 1)
            : prevState;
        });
        break;
      case "period":
        if (!hasPeriod) {
          setInputValue((prevState) => {
            return prevState === "" ? "0." : prevState + ".";
          });
          setHasPeriod(true);
        }
        break;
      case "add":
      case "subtract":
      case "multiply":
      case "divide":
        if (inputValue !== "") {
          if (storedValue === "") {
            setStoredValue(inputValue);
            setOperation(type);
            setInputValue("");
          } else if (operation !== "divide" || inputValue !== "0") {
            let result = calculate(storedValue, inputValue);
            setStoredValue(result);
            setOperation(type);
            setInputValue(result);
            setFlag(true);
          }
        }
        break;
      case "equal":
        if (
          inputValue !== "" &&
          storedValue !== "" &&
          (operation !== "divide" || inputValue !== "0")
        ) {
          let result = calculate(storedValue, inputValue);
          setStoredValue("");
          setOperation("");
          setInputValue(result);
          setFlag(true);
        }
    }
  };
  return (
    <main className="flex flex-col gap-10 justify-center items-center h-screen">
      <div className="text-xl font-semibold text-white">
        {/* <p>Stored value: {storedValue}</p>
        <p>Operation: {operation}</p>
        <p>Input value: {inputValue}</p> */}
        <p>
          {storedValue} {operation && symbol[operation as keyof SymbolType]}
        </p>
      </div>
      <div
        className=" bg-gray-200 rounded-lg
                      flex flex-col gap-4 p-5"
      >
        <div
          className="bg-white flex justify-end rounded-lg
                          py-5 px-5 text-right text-2xl"
        >
          {inputValue}
        </div>
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((button, i) => {
            return (
              <Button
                key={"button-" + i}
                data={button}
                handleClick={handleGeneralClick}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
