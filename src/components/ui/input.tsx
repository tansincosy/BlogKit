import { singleLineClass } from "@/utils";
import { useState } from "react";
import { Button } from "./button";

export type SearchBoxProps = Omit<
  React.ComponentProps<"div">,
  "onSubmit" | "onReset" | "onChange"
> &
  Pick<React.ComponentProps<"form">, "onSubmit"> &
  Required<Pick<React.ComponentProps<"form">, "onReset">> &
  Pick<React.ComponentProps<"input">, "placeholder" | "onChange"> & {
    inputRef: React.RefObject<HTMLInputElement>;
    isSearchStalled: boolean;
    value: string;
    classNames?: any;
  };
export const Input = ({
  classNames = {},
  inputRef,
  isSearchStalled,
  onChange,
  onReset,
  onSubmit,
  placeholder,
  value,
  ...props
}: SearchBoxProps) => {
  const [isFocus, setFocus] = useState<boolean>(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (onSubmit) {
      onSubmit(event);
    }

    if (inputRef.current) {
      inputRef.current.blur();
    }
  }

  function handleReset(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();

    onReset(event);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }
  return (
    <div {...props}>
      <form
        action=""
        noValidate
        onSubmit={handleSubmit}
        onReset={handleReset}
        className={singleLineClass(
          "relative cursor-text inline-flex h-14 rounded-t-md bg-surface-variant items-center text-on-surface w-full"
        )}
      >
        <Button type="text" icon="search" className="mr-2"></Button>
        <label
          className={singleLineClass(
            "label-medium whitespace-nowrap overflow-hidden text-ellipsis absolute top-2 left-14 transition-all",
            isFocus || (value.length !== 0 && !isSearchStalled)
              ? ""
              : "default-label"
          )}
        >
          请输入您要搜索的内容
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
            value={value}
            onChange={onChange}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            placeholder={placeholder}
            spellCheck={false}
            maxLength={512}
            onFocus={() => {
              setFocus(true);
            }}
            onBlur={() => {
              setFocus(false);
            }}
            className={singleLineClass(
              "w-full pl-0 pr-2 pt-6 pb-3 bg-transparent relative inline-flex",
              "outline-none"
            )}
          />
        </div>
        {value.length !== 0 && !isSearchStalled && (
          <Button type="text" nativeType="reset" icon="close-circle"></Button>
        )}
      </form>
    </div>
  );
};

Input.displayName = "Input";
