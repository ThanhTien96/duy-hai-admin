import { useContext, useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Empty, Image, Modal, Popconfirm, UploadFile } from "antd";
import { YoutubeBanerContext } from "../YoutubeBannerPage";
import { IBannerFormBE } from "types/YoutubeBanner";
import { useAppDispatch } from "store";
import { setAlert } from "store/app/alert";
import { MESSAGE_TEXT, STORE_STATUS } from "constants/apiMessage";
import { YoutubeBannerService } from "services";
import { STATUS_CODE } from "constants";
import { UploadImage } from "components/shared";
import { DeleteFilled } from "@ant-design/icons";
import { EYoutubeBanner } from "constants/enum.constant";

type TBannerProps = {
  handleFetchBanner: (signal?: AbortSignal) => void;
};

const Banner = ({ handleFetchBanner }: TBannerProps) => {
  const storeDispatch = useAppDispatch();
  const { state, dispatch } = useContext(YoutubeBanerContext);
  const controller = new AbortController();
  const [file, setFiles] = useState<UploadFile[] | any>();

  // side effect
  useEffect(() => {
    return () => {
      controller.abort();
    };
  }, []);

  // handle create banner
  const handleCreateBanner = async () => {
    dispatch({ type: EYoutubeBanner.LOADING, payload: true });
    const formData = new FormData();
    if (file) {
      formData.append("hinhAnh", file[0].originFileObj);
    }
    try {
      const res = await YoutubeBannerService.createBanner(
        formData,
        controller.signal
      );
      if (res.status === STATUS_CODE.success) {
        dispatch({ type: EYoutubeBanner.BANNER_MODAL, payload: false });
        storeDispatch(
          setAlert({
            message: MESSAGE_TEXT.createSuccess,
            status: STORE_STATUS.success,
          })
        );
        handleFetchBanner(controller.signal);
      }
    } catch (err: Error | any) {
      storeDispatch(
        setAlert({
          message: err.response.data.message ?? MESSAGE_TEXT.createFaild,
          status: STORE_STATUS.error,
        })
      );
    } finally {
      dispatch({ type: EYoutubeBanner.LOADING, payload: false });
    }
  };

  // handle delete banner
  const handleDeleteBanner = async (id: string) => {
    dispatch({ type: EYoutubeBanner.LOADING, payload: true });
    try {
      const res = await YoutubeBannerService.deleteBanner(
        id,
        controller.signal
      );
      if (res.status === STATUS_CODE.success) {
        storeDispatch(
          setAlert({
            message: MESSAGE_TEXT.deleteSuccess,
            status: STORE_STATUS.success,
          })
        );
        handleFetchBanner(controller.signal);
      }
    } catch (err: Error | any) {
      storeDispatch(
        setAlert({
          message: err.response.data.message ?? MESSAGE_TEXT.deleteFaild,
          status: STORE_STATUS.error,
        })
      );
    } finally {
      dispatch({ type: EYoutubeBanner.LOADING, payload: false });
    }
  };

  const splideProps = {
    option: {
      loop: "infinit",
      autoPlay: true,

      rewind: true,
      width: "100%",
      stansition: "ease-out-in",
      gap: "3rem",
      perPage: 1,
    },
  };

  return (
    <div>
      {state.bannerList &&
      Array.isArray(state.bannerList) &&
      state.bannerList.length > 0 ? (
        <Splide {...splideProps} aria-label="My Favorite Images">
          {state.bannerList.map((ele: IBannerFormBE) => (
            <SplideSlide
              className="text-center"
              key={ele.maBanner}
              tag="section"
            >
              <div className="relative">
                <Popconfirm
                  title="Có chắc bạn muốn xoá?"
                  onConfirm={() => handleDeleteBanner(ele.maBanner)}
                  okText="Có"
                  cancelText="Không"
                >
                  <DeleteFilled className="absolute top-2 right-2 z-10 cursor-pointer hover:text-red-500 transition-all duration-150" />
                </Popconfirm>
                <Image
                  preview={false}
                  width="100%"
                  height={"400px"}
                  className="object-cover"
                  src={ele.hinhAnh}
                />
              </div>
            </SplideSlide>
          ))}
        </Splide>
      ) : (
        <Empty />
      )}

      <Modal
        destroyOnClose
        onOk={handleCreateBanner}
        okText="Thêm"
        cancelText="Huỷ"
        title="Thêm Banner"
        open={state.bannerModal}
        onCancel={() => {
          dispatch({ type: EYoutubeBanner.BANNER_MODAL, payload: false });
        }}
      >
        <UploadImage
          resetFile={state.bannerModal}
          filesQuantity={1}
          getfiles={(files) => {
            setFiles(files);
          }}
        />
      </Modal>
    </div>
  );
};

export default Banner;
