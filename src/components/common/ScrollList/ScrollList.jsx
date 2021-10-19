import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export const ScrollList = props => {
  const [page, setPage] = useState(0);
  const totalLoadedLength = 1000;
  const { children, loader, countLimit } = props;

  const calculateParams = () => {
    debugger;
    const { loadNextData } = props;
    let params = {
      count: countLimit,
      page: page + 1,
    };

    loadNextData(params);
    setPage(page + 1);
  };

  return (
    <InfiniteScroll
      // ref={e => (this.InfiniteScroll = e)}
      dataLength={totalLoadedLength}
      next={() => calculateParams()}
      hasMore={true}
      //   height={divHeight}
      //   style={{ overflow: "hidden" }}
      //   reset={() => this.resetParams()}
      loader={loader}
      ref={e => e}
      //   scrollableTarget={window.inn}
      hasNextPage={true}
    >
              {children}      
    </InfiniteScroll>
  );
};
