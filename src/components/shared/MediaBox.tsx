import { Flex, Image, Space } from "antd";
import clsx from "clsx";
import { EMPTY_IMAGE } from "constants";
import { useState, useEffect } from "react";

export type TImageMediaBox = {
  id: string;
  src: string;
};

type MediaBoxProps = {
  media: TImageMediaBox[];
  direction?: "horizontal" | "vertical";
};

const MediaBox = ({ media, direction = "vertical" }: MediaBoxProps) => {
  const [indexSrc, setIndexSrc] = useState<TImageMediaBox | undefined>(
    media[0]
  );

  useEffect(() => {
    if(media) {
        setIndexSrc(media[0])
    }
  }, [media])


  return (
    <Flex vertical={direction === "vertical" ? true : false} gap={8}>
      <div
        className={clsx("flex", direction === "horizontal" && "flex-col gap-2")}
      >
        {media &&
          media.length > 0 &&
          media.map((ele: TImageMediaBox) => (
            <div
              className={clsx(
                direction === "horizontal" &&
                  (media.length === 6
                    ? "w-[93px] h-[93px]"
                    : media.length === 5
                    ? "w-[114px] h-[114px]" 
                    : media.length === 4 
                    ? "w-[135px] h-[135px]"
                    : "w-[150px] h-[150px]"),
                "border-2 border-solid border-sky-400 cursor-pointer",{
                    "border-red-500": ele.id === indexSrc?.id
                })}
              key={ele.id}
            >
              <img
                className="w-full h-full overflow-hidden object-cover"
                src={ele.src ?? EMPTY_IMAGE}
              />
            </div>
          ))}
      </div>
      <div className={clsx("w-full")}>
        <Image
          width={600}
          height={600}
          src={indexSrc?.src ?? EMPTY_IMAGE}
          alt="media list"
        />
      </div>
    </Flex>
  );
};

export default MediaBox;
