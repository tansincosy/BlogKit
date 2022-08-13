import { arrayIsEmpty } from "@/utils";
import { Icon } from "../ui/icon";

const Footer: React.FC<{ footers: Blog.FootLink[] }> = ({ footers }) => {
  const clickHandle = (footerObj: Blog.FootLink) => {
    window.open(footerObj.url, "_blank");
  };
  return (
    <footer className="w-full flex flex-col justify-between items-center bg-surface-variant text-on-surface-variant flex-none h-52">
      <div className="flex space-x-8 flex-1 w-full text-center justify-center items-center border-b border-surface">
        {!arrayIsEmpty(footers) &&
          footers.map((footer) => {
            return (
              <div
                key={footer.id}
                onClick={() => {
                  clickHandle(footer);
                }}
                className="flex flex-col cursor-pointer"
              >
                <Icon
                  name={footer.icon}
                  className="headline-medium md:headline-large"
                ></Icon>
                <span className="title-small md:title-medium">
                  {footer.name}
                </span>
              </div>
            );
          })}
      </div>
      <div className="title-medium w-full h-16 flex items-center justify-center">
        &copy; 2022 All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
