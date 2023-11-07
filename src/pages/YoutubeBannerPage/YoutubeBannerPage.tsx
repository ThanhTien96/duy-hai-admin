import { PlainLayout } from "components/layouts/ChildLayout/PlainLayout";
import React, {
  createContext,
  useReducer,
  Dispatch,
  useCallback,
  useEffect,
} from "react";
import { Button, Card, Col, Row, Spin, Typography } from "antd";
import {
  HomeOutlined,
  FolderAddFilled,
  PlusSquareFilled,
} from "@ant-design/icons";
import { COPY_RIGHT, STATUS_CODE } from "constants";
import { Banner, YoutubePost } from "./partials";
import { IBannerFormBE, IYoutubePostFromBE } from "types/YoutubeBanner";
import { YoutubeBannerService } from "services";
import { useAppDispatch } from "store";
import { setAlert } from "store/app/alert";
import { MESSAGE_TEXT, STORE_STATUS } from "constants/apiMessage";

const { Text } = Typography;

export enum EYoutubeBanner {
  FETCH_BANNER = "fetchBanner",
  LOADING = "loading",
  BANNER_MODAL = "bannerModal",
  FETCH_YOUTUBE = "fetchYoutube",
  EMBED_MODAL = "embedModal",
  YOUTUBE_DRAWER = "youtubeDrawer",
  YOUTUBE_DETAIL = 'fetchYoutubeDetail',
}

// page context
export interface IInitialState {
  loading: boolean;
  bannerList: IBannerFormBE[];
  youtubeList: IYoutubePostFromBE[];
  youtubeDetail?: IYoutubePostFromBE;
  bannerModal: boolean;
  embedModal: boolean;
  youtubeDrawer: boolean;
}
export interface IYoutubeBannerAction {
  type: EYoutubeBanner;
  payload: any;
}
// initial reducer
const initialState: IInitialState = {
  loading: false,
  bannerList: [],
  youtubeList: [],
  youtubeDetail: undefined,
  bannerModal: false,
  embedModal: false,
  youtubeDrawer: false,
};

export const YoutubeBanerContext = createContext<{
  state: IInitialState;
  dispatch: Dispatch<IYoutubeBannerAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// reducer
const YoutubeBannerreducer = (
  state: IInitialState,
  action: IYoutubeBannerAction
) => {
  const { type, payload } = action;
  switch (type) {
    case EYoutubeBanner.LOADING:
      return { ...state, loading: payload };
    case EYoutubeBanner.FETCH_BANNER:
      return { ...state, bannerList: payload };
    case EYoutubeBanner.BANNER_MODAL:
      return { ...state, bannerModal: payload };
    case EYoutubeBanner.FETCH_YOUTUBE:
      return { ...state, youtubeList: payload };
    case EYoutubeBanner.EMBED_MODAL:
      return { ...state, embedModal: payload };
    case EYoutubeBanner.YOUTUBE_DRAWER:
      return { ...state, youtubeDrawer: payload };
    case EYoutubeBanner.YOUTUBE_DETAIL: 
      return {...state, youtubeDetail: payload};
    default:
      return state;
  }
};

const YoutubeBannerPage: React.FC = () => {
  const [state, dispatch] = useReducer(YoutubeBannerreducer, initialState);
  const storeDispatch = useAppDispatch();

  // handle fetch banner
  const handleFetchBanner = useCallback(async (signal?: AbortSignal) => {
    try {
      const res = await YoutubeBannerService.fetchAllBanner(signal);
      if (res.status === STATUS_CODE.success) {
        dispatch({ type: EYoutubeBanner.FETCH_BANNER, payload: res.data.data });
      }
    } catch (err: Error | any) {
      storeDispatch(
        setAlert({
          message: err.response.data.message ?? MESSAGE_TEXT.getAllFail,
          status: STORE_STATUS.error,
        })
      );
    }
  }, []);

  // fetch youtube post
  const handleFetchYoutube = useCallback(async (signal?: AbortSignal) => {
    try {
      const res = await YoutubeBannerService.getAllYoutube(signal);
      if (res.status === STATUS_CODE.success) {
        dispatch({
          type: EYoutubeBanner.FETCH_YOUTUBE,
          payload: res.data.data,
        });
      }
    } catch (err: Error | any) {
      storeDispatch(
        setAlert({
          message: err.response.data.message ?? MESSAGE_TEXT.getAllFail,
          status: STORE_STATUS.error,
        })
      );
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    handleFetchBanner(controller.signal);
    handleFetchYoutube(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <YoutubeBanerContext.Provider value={{ state, dispatch }}>
      <PlainLayout
        headerprops={{
          breadcrumb: {
            items: [
              {
                href: "/",
                title: <HomeOutlined />,
              },
              {
                title: <Text>{location.pathname.replace("/", "")}</Text>,
              },
            ],
          },
          title: "Youtube Và Banner",
        }}
        footerprops={{
          children: COPY_RIGHT,
          className: "text-center",
        }}
        className="bg-inherit h-auto px-8"
      >
        <Spin spinning={state.loading}>
          <Row gutter={[16, 16]}>
            {/* left side */}
            <Col span={24} xl={12}>
              <Card
                title="Banner"
                size="small"
                extra={[
                  <Button
                    onClick={() =>
                      dispatch({
                        type: EYoutubeBanner.BANNER_MODAL,
                        payload: true,
                      })
                    }
                    key="add-banner"
                    className="border-none shadow-none"
                    size="small"
                    type="default"
                    icon={<FolderAddFilled />}
                  >
                    Thêm Banner
                  </Button>,
                ]}
              >
                <Banner handleFetchBanner={handleFetchBanner} />
              </Card>
            </Col>
            {/* right side */}
            <Col span={24} xl={12}>
              <Card
              className="h-[700px] overflow-y-scroll overflow-x-hidden"
                title="Youtube"
                size="small"
                extra={[
                  <Button
                    onClick={() =>
                      dispatch({
                        type: EYoutubeBanner.YOUTUBE_DRAWER,
                        payload: true,
                      })
                    }
                    key="add-youtube"
                    className="border-none shadow-none"
                    size="small"
                    type="default"
                    icon={<PlusSquareFilled />}
                  >
                    Thêm Youtube
                  </Button>,
                ]}
              >
                <YoutubePost handleFetchYoutube={handleFetchYoutube} />
              </Card>
            </Col>
          </Row>
        </Spin>
      </PlainLayout>
    </YoutubeBanerContext.Provider>
  );
};

export default YoutubeBannerPage;
