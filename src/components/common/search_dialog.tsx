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
                <div
                  onClick={() => {
                    router.push(hit.path);
                    onCloseHandle();
                  }}
                >
                  <Highlight attribute="title" hit={hit} />
                </div>
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
