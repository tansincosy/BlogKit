import { singleLineClass } from "@/utils";
import {
  ChangeEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Button } from "./button";

export interface InputProps {
  className?: string;
  label: string;
  onSearch: (value: string) => void | Promise<void>;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label = "", onSearch }, ref) => {
    const [isFocus, setFocus] = useState<boolean>(false);
    const [isShowClear, setShowClear] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle<HTMLInputElement, any>(ref, () => ({
      focus: () => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      },
      clear: () => {
        if (inputRef.current) {
          inputRef.current.value = "";
          setShowClear(false);
        }
      },
    }));

    const clearInputContent = () => {
      if (inputRef.current) {
        inputRef.current.value = "";
        setShowClear(false);
        onSearch("");
      }
    };
    const onChangeInputHandle = (event: ChangeEvent) => {
      if (inputRef.current) {
        setShowClear(!!inputRef.current.value);
        onSearch(inputRef.current.value || "");
      }
    };
    return (
      <div
        className={singleLineClass(
          "relative cursor-text inline-flex h-14 rounded-t-md bg-surface-variant items-center text-on-surface w-full"
        )}
      >
        <Button type="text" icon="search" className="mr-2"></Button>
        <label className="label-medium whitespace-nowrap overflow-hidden text-ellipsis absolute top-2 left-14">
          {label}
        </label>
        <div
          style={{
            transition: "transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms",
          }}
          className={singleLineClass(
            "w-full",
            "before:border-b before:border-on-surface-variant before:left-0",
            "before:bottom-0 before:absolute before:right-0 before:pointer-events-none",
            "after:border-b-2 after:border-primary after:absolute after:right-0 after:left-0",
            "after:pointer-events-none after:transform-gpu after:scale-x-0 after:bottom-0",
            isFocus ? "input-focus" : ""
          )}
        >
          <input
            ref={inputRef}
            onChange={onChangeInputHandle}
            onFocus={() => {
              setFocus(true);
            }}
            onBlur={() => {
              setFocus(false);
            }}
            className={singleLineClass(
              "w-full pl-0 pr-2 pt-6 pb-3 bg-transparent relative inline-flex",
              "outline-none",
              className
            )}
          />
        </div>
        {isShowClear && (
          <Button
            type="text"
            icon="close-circle"
            onClick={clearInputContent}
          ></Button>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
