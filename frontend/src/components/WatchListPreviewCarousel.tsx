import WatchList from "../classes/WatchList.ts";
import WatchListPreview from "./WatchListPreview.tsx";
import WatchListPreviewCarouselPage from "./WatchListPreviewCarouselPage.tsx";

interface WatchListPreviewCarouselProps {
  listsData: WatchList[] | undefined;
  rowLength: number;
}

const WatchListPreviewCarousel: React.FC<WatchListPreviewCarouselProps> = ({
  listsData,
  rowLength,
}: WatchListPreviewCarouselProps) => {
  // Set a default for rowLength in case someone forgets to pass it in
  if (!rowLength) {
    console.warn(
      "WatchListPreviewCarousel: rowLength property not set - defaulting to 4"
    );
    rowLength = 4;
  }
  if (!listsData) {
    return <p>Unable to load Watch List Preview Carousel!</p>;
  } else {
    const listsCount = listsData.length;
    if (listsCount === 0) {
      return <div className="mb-5" />;
    } else if (listsCount === 1) {
      return (
        <div className="mb-5">
          <WatchListPreview listData={listsData[0]} rowLength={rowLength} />
        </div>
      );
    } else {
      const renderCarousel = listsData.length > 4;
      if (renderCarousel) {
        const listsPageData: WatchList[][] = [];
        const totalNum = listsData.length;

        // Populate arrays of watch-lists to put into the carousel
        let populatingArrays: boolean = true;
        let i = 0;
        let j = 0;
        while (populatingArrays) {
          let sizeOfArr = rowLength;
          if (i + sizeOfArr > totalNum) {
            sizeOfArr = Math.abs(i - totalNum);
            populatingArrays = false;
          }
          const tempArray: WatchList[] = [];
          for (let k = 0; k < sizeOfArr; k++) {
            tempArray.push(listsData[i + k]);
          }
          listsPageData[j] = tempArray;
          j++;
          i += 4;
        }
        const maxSlideNumber = listsPageData.length;
        return (
          <div className="carousel w-full">
            {listsPageData.map((lists: WatchList[], index: number) => (
              <WatchListPreviewCarouselPage listsData={lists} slideNumber={index+1} maxSlide={maxSlideNumber} key={index} rowLength={rowLength} />
            ))}
          </div>
        );
      } else {
        return (
          <div className="flex flex-row mb-5">
            {listsData.map((list: WatchList, index: number) => (
              <WatchListPreview listData={list} key={index} rowLength={rowLength} />
            ))}
          </div>
        );
      }
    }
  }
};

export default WatchListPreviewCarousel;