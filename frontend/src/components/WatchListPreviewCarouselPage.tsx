import WatchList from "../classes/WatchList";
import WatchListPreview from "./WatchListPreview";

interface WatchListPreviewCarouselPageProps {
  listsData: WatchList[] | undefined;
  slideNumber: number;
  maxSlide: number;
}

const WatchListPreviewCarouselPage: React.FC<
  WatchListPreviewCarouselPageProps
> = ({
  listsData,
  slideNumber,
  maxSlide,
}: WatchListPreviewCarouselPageProps) => {
  if (!listsData) {
    return <div />;
  } else {
    let renderButtons = true;
    let prevSlideNum = slideNumber - 1;
    if (prevSlideNum <= 0) {
      prevSlideNum = maxSlide;
    }
    let nextSlideNum = slideNumber + 1;
    if (nextSlideNum > maxSlide) {
      nextSlideNum = 1;
    }
    if (nextSlideNum === prevSlideNum) {
      renderButtons = false;
    }
    return (
      <div
        id={`slide${slideNumber}`}
        className="flex flex-row carousel-item relative w-full"
      >
        {listsData.map((list: WatchList, index: number) => (
          <WatchListPreview listData={list} key={index} />
        ))}
        {renderButtons ? (
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href={`#slide${prevSlideNum}`} className="btn btn-circle">
              ❮
            </a>
            <a href={`#slide${nextSlideNum}`} className="btn btn-circle">
              ❯
            </a>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
};

export default WatchListPreviewCarouselPage;
