import WatchList from "../classes/WatchList";
import WatchListPreview from "./WatchListPreview";

interface WatchListPreviewCarouselPageProps {
  listsData: WatchList[] | undefined;
  slideNum: number;
  maxSlide: number;
  rowLength: number;
}

const WatchListPreviewCarouselPage: React.FC<
  WatchListPreviewCarouselPageProps
> = ({
  listsData,
  slideNum,
  maxSlide,
  rowLength,
}: WatchListPreviewCarouselPageProps) => {
  if (!listsData) {
    return <div />;
  } else {
    let renderButtons = true;
    const emptyCards: undefined[] = [];
    const prevSlideNum = slideNum - 1;
    const nextSlideNum = slideNum + 1;
    const emptyCardsNum = rowLength - listsData.length;
    if (prevSlideNum === 0 && nextSlideNum > maxSlide) {
      renderButtons = false
    }
    if (emptyCardsNum > 0) {
      for (let i = 0; i < emptyCardsNum; ++i) {
        emptyCards.push(undefined)        
      }
    }
    return (
      <div
        id={`slide${slideNum}`}
        className="flex flex-row carousel-item relative w-full"
      >
        {listsData.map((list: WatchList, index: number) => (
          <WatchListPreview listData={list} key={index} rowLength={rowLength} />
        ))}
        {emptyCards.map((item: undefined, index: number) => (
          <WatchListPreview listData={item} key={index} rowLength={rowLength} />
        ))}
        {renderButtons ? (
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            {prevSlideNum === 0 ? (
              <span className="btn btn-circle btn-disabled">❮</span>
            ) : (
              <a href={`#slide${prevSlideNum}`} className="btn btn-circle">
                ❮
              </a>
            )}
            {nextSlideNum === maxSlide + 1 ? (
              <span className="btn btn-circle btn-disabled">❯</span>
            ) : (
              <a href={`#slide${nextSlideNum}`} className="btn btn-circle">
                ❯
              </a>
            )}
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
};

export default WatchListPreviewCarouselPage;
