import { useSearchBox, UseSearchBoxProps } from "react-instantsearch-hooks-web";
import {
  Input,
  SearchBoxProps as SearchBoxUiComponentProps,
} from "@/components/ui/input";
import { useRef, useState } from "react";

type UiProps = Pick<
  SearchBoxUiComponentProps,
  "inputRef" | "isSearchStalled" | "onChange" | "onReset" | "onSubmit" | "value"
>;

type SearchBoxProps = Omit<
  SearchBoxUiComponentProps,
  Exclude<keyof UiProps, "onSubmit">
> &
  UseSearchBoxProps & {
    /**
     * Whether to trigger the search only on submit.
     * @default true
     */
    searchAsYouType?: boolean;
  };

export const SearchBox = ({
  queryHook,
  searchAsYouType = true,
  ...props
}: SearchBoxProps) => {
  const { query, refine, isSearchStalled } = useSearchBox(
    { queryHook },
    { $$widgetType: "ais.searchBox" }
  );
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  function setQuery(newQuery: string) {
    setInputValue(newQuery);

    if (searchAsYouType) {
      refine(newQuery);
    }
  }

  function onReset() {
    setQuery("");
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.currentTarget.value);
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (!searchAsYouType) {
      refine(inputValue);
    }

    if (props.onSubmit) {
      props.onSubmit(event);
    }
  }
  if (query !== inputValue && document.activeElement !== inputRef.current) {
    setInputValue(query);
  }
  const uiProps: UiProps = {
    inputRef,
    isSearchStalled,
    onChange,
    onReset,
    onSubmit,
    value: inputValue,
  };

  return <Input {...props} {...uiProps} />;
};
