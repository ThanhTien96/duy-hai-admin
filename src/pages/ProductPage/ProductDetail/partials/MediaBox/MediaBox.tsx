import { App, Flex, Image, Popover } from "antd";
import { PlusOutlined, SettingFilled } from "@ant-design/icons";
import clsx from "clsx";
import { EMPTY_IMAGE } from "constants";
import { useState, useEffect, useCallback } from "react";
import "./MediaBox.style.less";
import { MediaAction } from "./partials";
export type TImageMediaBox = {
  id: string;
  src: string;
  mainImage: boolean;
};

type MediaBoxProps = {
  media: TImageMediaBox[];
  direction?: "horizontal" | "vertical";
  onUpload?: (file: FileList) => void;
  lengthLimit?: number;
};

const MediaBox = ({
  media,
  direction = "vertical",
  onUpload,
  lengthLimit = 6,
}: MediaBoxProps) => {
  const [indexSrc, setIndexSrc] = useState<TImageMediaBox | undefined>(
    media[0]
  );
  const [openPop, setOpepPop] = useState<string>();

  useEffect(() => {
    if (media) {
      const filterImg = media.find(ele => ele.mainImage);
      setIndexSrc(filterImg)
    }
  }, [media]);

  // handle set indexSrc
  const handleSetIndexSrc = useCallback((media: TImageMediaBox) => {
    setIndexSrc(media);
  }, []);

  return (
    <Flex vertical={direction === "vertical" ? true : false} gap={8}>
      <App
        className={clsx(
          "flex",
          direction === "horizontal" ? "flex-col gap-2" : "order-2"
        )}
      >
        {media &&
          media.length > 0 &&
          media.map((ele: TImageMediaBox) => (
            <div
              onClick={() => handleSetIndexSrc(ele)}
              className={clsx(
                "w-[93px] h-[93px] border-2 border-solid border-white cursor-pointer relative",
                {
                  "!border-sky-500": ele.id === indexSrc?.id,
                }
              )}
              key={ele.id}
            >
              <img
                className="w-full h-full overflow-hidden object-cover grayscale-[60%] hover:grayscale-0 transition-all duration-150"
                src={ele.src ?? EMPTY_IMAGE}
              />

              {/* is main image */}
              <span className={clsx(
                "w-3 h-3 border border-solid border-bg-white absolute top-1 left-1 rounded-full", ele.mainImage ? "bg-green-500" : "bg-red-500"
              )}></span>

              {/* action */}
              <Popover
                onOpenChange={() => setOpepPop("")}
                content={<MediaAction id={ele.id} onClick={() => setOpepPop("")} />}
                placement="bottomLeft"
                trigger="click"
                open={openPop === ele.id}
              >
                <div
                  onClick={() =>
                    setOpepPop((current) => (!current ? ele.id : ""))
                  }
                  className="absolute top-1 right-1 w-6 h-6 text-center leading-6 bg-black/50 hover:bg-black rounded-sm"
                >
                  <SettingFilled />
                </div>
              </Popover>
            </div>
          ))}
        {/* upload img */}
        {lengthLimit > media.length && (
          <div
            className={clsx(
              "w-[93px] h-[93px]",
              "border border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-500 transition-all duration-200 relative"
            )}
          >
            <input
              onChange={(e) => {
                if (e.target && e.target.files && onUpload) {
                  onUpload(e.target.files);
                }
              }}
              type="file"
              className="w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0  cursor-pointer z-50"
            />
            <PlusOutlined className="text-2xl" />
          </div>
        )}
      </App>
      <div className={clsx("w-full")}>
        <Image.PreviewGroup
          items={media && media.map((img: TImageMediaBox) => img.src)}
        >
          <Image
            rootClassName="w-full"
            className="object-cover"
            height={600}
            loading="lazy"
            src={indexSrc?.src ?? EMPTY_IMAGE}
            alt="media list"
          />
        </Image.PreviewGroup>
      </div>
    </Flex>
  );
};

export default MediaBox;
