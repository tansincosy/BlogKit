import RCDialog from "rc-dialog";
import React, { useEffect, useRef } from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Hits,
  Configure,
  PoweredBy,
  Highlight,
} from "react-instantsearch-hooks-web";

import { useRouter } from "next/router";
import { SearchBox } from "./seachBox";
import { singleLineClass } from "@/utils";

export interface SearchDialogProps {
  visible: boolean;
  onCloseHandle: (url?: string) => void;
}

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "";
const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || "";
const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || "";
const client = algoliasearch(appId, searchKey);

const SearchDialog: React.FC<SearchDialogProps> = ({
  visible,
  onCloseHandle,
}) => {
  const router = useRouter();
  const searchRef = useRef<any>(null);
  useEffect(() => {
    if (visible) {
      searchRef.current?.focus();
      searchRef.current?.clear();
    }
  }, [visible]);

  return (
    <RCDialog
      closeIcon={""}
      visible={visible}
      maskClosable
      onClose={() => {
        onCloseHandle();
      }}
      title={<div className="headline-small w-full text-center">搜索</div>}
      footer={<PoweredBy></PoweredBy>}
    >
      <InstantSearch indexName={indexName} searchClient={client}>
        <div className="search-container">
          <SearchBox />
          <Hits
            hitComponent={({ hit }: any) => {
              return (
                <Highlight
                  className={singleLineClass(`h-14 box-border pl-4 pr-6 flex items-center rounded-[1.75rem] w-full relative overflow-hidden cursor-pointer
                  hover:after:w-[200%] hover:after:h-[200%] hover:after:bg-on-surface hover:after:opacity-[.16] hover:after:absolute hover:after:top-[-50%] hover:after:left-[-50%]
                active:after:w-[200%] active:after:h-[200%] active:after:bg-on-surface active:after:opacity-[.24] active:after:absolute active:after:top-[-50%] active:after:left-[-50%]`)}
                  id={hit.path}
                  attribute="title"
                  hit={hit}
                  onClick={() => {
                    router.push(hit.path);
                    onCloseHandle();
                  }}
                />
              );
            }}
          />
          <Configure hitsPerPage={8} />
        </div>
      </InstantSearch>
    </RCDialog>
  );
};

export default SearchDialog;
