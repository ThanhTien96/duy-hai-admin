import { useContext, useState, useCallback, useEffect } from "react";
import { YoutubeBanerContext } from "../YoutubeBannerPage";
import { Col, Drawer, Empty, Modal, Row } from "antd";
import { IYoutubePostFromBE } from "types/YoutubeBanner";
import YoutubePostCard from "./YoutubePostCard";
import YoutubeForm, { IYoutubeFormValue } from "./YoutubeForm";
import { setAlert } from "store/app/alert";
import { MESSAGE_TEXT, STORE_STATUS } from "constants/apiMessage";
import { useAppDispatch } from "store";
import { YoutubeBannerService } from "services";
import { STATUS_CODE } from "constants";
import { EYoutubeBanner } from "constants/enum.constant";

type TYoutubePostProps = {
  handleFetchYoutube: (signal?: AbortSignal) => void;
};

const YoutubePost = ({ handleFetchYoutube }: TYoutubePostProps) => {
  const storeDispatch = useAppDispatch();
  const { state, dispatch } = useContext(YoutubeBanerContext);
  const [youtubeEmbed, setYoutubeEmbed] = useState<string>();
  const controller = new AbortController();

  useEffect(() => {
    return () => {
      controller.abort();
    };
  }, []);

  // handle create youtube post
  const handleCreateYoutubePost = useCallback(
    async (data: IYoutubeFormValue) => {
      dispatch({ type: EYoutubeBanner.LOADING, payload: true });
      const formData = new FormData();
      formData.append("tieuDe", data.tieuDe);
      formData.append("url", data.url);
      formData.append("embedLink", data.embedLink);
      if (data.hinhAnh) {
        data.hinhAnh.forEach((ele: any) => {
          formData.append("hinhAnh", ele.originFileObj);
        });
      }
      try {
        const res = await YoutubeBannerService.createYoutube(
          formData,
          controller.signal
        );
        if (res.status === STATUS_CODE.success) {
          dispatch({ type: EYoutubeBanner.YOUTUBE_DRAWER, payload: false });
          storeDispatch(
            setAlert({
              message: MESSAGE_TEXT.createSuccess,
              status: STORE_STATUS.success,
            })
          );
          handleFetchYoutube(controller.signal);
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
    },
    []
  );

  // handle delete youtube post
  const handleDeleteYoutube = useCallback(
    async (id: string) => {
      dispatch({ type: EYoutubeBanner.LOADING, payload: true });
      try {
        const res = await YoutubeBannerService.deleteYoutube(
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
          handleFetchYoutube(controller.signal);
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
    },
    []
  );

  // handle fetchDetail update
  const handleFetchYoutubeDetailUpdate = async (id: string) => {
    dispatch({ type: EYoutubeBanner.LOADING, payload: true });
    try {
      const res = await YoutubeBannerService.getYoutubeDetail(id, controller.signal);
      if(res.status === STATUS_CODE.success) {
        dispatch({type: EYoutubeBanner.YOUTUBE_DRAWER, payload: true});
        dispatch({type: EYoutubeBanner.YOUTUBE_DETAIL, payload: res.data.data})
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
  } 

  const handleUpdateYoutube = useCallback(async (id: string, data: IYoutubeFormValue) => {
    dispatch({type: EYoutubeBanner.LOADING, payload: true});
    const formData = new FormData();
    formData.append('tieuDe', data.tieuDe);
    formData.append('url', data.url);
    formData.append('embedLink', data.embedLink);
    if(data.hinhAnh) {
      data.hinhAnh.forEach((ele: any) => {

        formData.append('hinhAnh', ele.originFileObj);
      })
    }
    try {
      const response = await YoutubeBannerService.updateYoutube(id, formData, controller.signal);
      if(response.status === STATUS_CODE.success) {
        storeDispatch(setAlert({message: MESSAGE_TEXT.createSuccess, status: STORE_STATUS.success}));
        handleFetchYoutube(controller.signal);
        dispatch({type: EYoutubeBanner.YOUTUBE_DRAWER, payload: false});
        dispatch({type: EYoutubeBanner.YOUTUBE_DETAIL, payload: undefined});
      }
    } catch (err: Error | any) {
      storeDispatch(setAlert({message: err.response.data.message ?? MESSAGE_TEXT.updateFaild, status: STORE_STATUS.error}));
    } finally {
      dispatch({type: EYoutubeBanner.LOADING, payload: false});
    }
  },[])

  return (
    <Row gutter={[16, 16]}>
      {state && state.youtubeList.length > 0 ? (
        state.youtubeList.map((ele: IYoutubePostFromBE) => (
          <Col key={ele.maYT} span={12} xl={12}>
            <YoutubePostCard
              onDelete={() => handleDeleteYoutube(ele.maYT)}
              onOpenUpdate={() => handleFetchYoutubeDetailUpdate(ele.maYT)}
              watchVideo={() => {
                dispatch({ type: EYoutubeBanner.EMBED_MODAL, payload: true });
                setYoutubeEmbed(ele.url);
              }}
              data={ele}
            />
          </Col>
        ))
      ) : (
        <Empty />
      )}
      {/* video modal */}
      <Modal
        width="60%"
        open={state.embedModal}
        destroyOnClose
        onCancel={() => {
          dispatch({ type: EYoutubeBanner.EMBED_MODAL, payload: false });
          setYoutubeEmbed(undefined);
        }}
        footer={[]}
      >
        <iframe
          src={state.embedModal ? youtubeEmbed : ""}
          className="w-full h-[600px]"
        ></iframe>
      </Modal>

      {/* Form Drawer */}
      <Drawer
        destroyOnClose
        zIndex={2000}
        width="30%"
        onClose={() => {
          dispatch({ type: EYoutubeBanner.YOUTUBE_DRAWER, payload: false });
          dispatch({type: EYoutubeBanner.YOUTUBE_DETAIL, payload: undefined})
        }}
        open={state.youtubeDrawer}
      >
        {state.youtubeDetail ? (
          <YoutubeForm
          defaultValue={state.youtubeDetail}
          resetForm={state.youtubeDrawer}
          onSubmit={(value) => {
            if(state.youtubeDetail) {
              handleUpdateYoutube(state?.youtubeDetail?.maYT, value)
            }
          }}
        />
        ) :(<YoutubeForm
          defaultValue={state.youtubeDetail}
          resetForm={state.youtubeDrawer}
          onSubmit={(value) =>  handleCreateYoutubePost(value)}
        />)}
      </Drawer>
    </Row>
  );
};

export default YoutubePost;
