import RCDialog from "rc-dialog";
import React, { useEffect, useRef, useState } from "react";
import algoliasearch from "algoliasearch";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import throttle from "lodash/throttle";
import { algolia } from "@/config";
import { arrayIsEmpty } from "@/utils";
export interface SearchDialogProps {
  visible: boolean;
  onCloseHandle: (url?: string) => void;
}

const client = algoliasearch(
  algolia.appId,
  algolia.adminKey //admin key 执行自己运行部署时，其他情况使用search key,
);

const SearchDialog: React.FC<SearchDialogProps> = ({
  visible,
  onCloseHandle,
}) => {
  const searchRef = useRef<any>(null);
  const [searchResults, setSearchResults] = useState<any>([]);

  useEffect(() => {
    if (visible) {
      searchRef.current?.focus();
      searchRef.current?.clear();
    }
  }, [visible]);

  const searchThrottle = throttle(async (searchKey: string) => {
    if (searchKey && algolia.searchNameSpace) {
      const index = client.initIndex(algolia.searchNameSpace);
      const searchResult = await index.search(searchKey);
    }
  }, 500);
  const onSearchHandle = (searchKey: string) => {
    searchThrottle(searchKey);
  };

  return (
    <RCDialog
      closeIcon={""}
      visible={visible}
      maskClosable
      onClose={() => {
        onCloseHandle();
      }}
      title={
        <Input ref={searchRef} label="搜索" onSearch={onSearchHandle}></Input>
      }
      footer={<Button>ssss</Button>}
    >
      <div>
        <ul>
          {!arrayIsEmpty(searchResults) &&
            searchResults.map((item) => {
              return <li key={item.title}>{item.title}</li>;
            })}
        </ul>
      </div>
    </RCDialog>
  );
};

export default SearchDialog;
