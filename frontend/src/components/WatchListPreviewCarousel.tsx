import WatchList from "../classes/WatchList.ts";
import WatchListPreview from "./WatchListPreview.tsx";

interface WatchListPreviewCarouselProps {
  listsData: WatchList[] | undefined;
}

const WatchListPreviewCarousel: React.FC<WatchListPreviewCarouselProps> = ({
  listsData,
}: WatchListPreviewCarouselProps) => {
  if (!listsData) {
    return <p>Unable to load Watch List Preview Carousel!</p>;
  } else {
    const listsCount = listsData.length;
    if (listsCount === 0) {
      return <div className="mb-5" />;
    } else if (listsCount === 1) {
      return (
        <div className="mb-5">
          <WatchListPreview listData={listsData[0]} />
        </div>
      );
    } else {
      const renderCarousel = listsData.length > 4;
      if (renderCarousel) {
        const listsPages: React.ReactNode[][] = [];
        let j = 0;
        for (let i = 0; i < listsData.length; i++) {
          if (i + (1 % 4) === 0) {
            j++;
          }
          //listsPages[j][i] = <WatchListPreview listData={listsData[i]} />;
          console.log(listsData[i])
        }
        console.log(listsPages)
        return <div className="flex flex-row mb-5" />;
      } else {
        return (
          <div className="flex flex-row mb-5">
            {listsData.map((list: WatchList, index: number) => (
              <WatchListPreview listData={list} key={index} />
            ))}
          </div>
        );
      }
    }
  }
};

export default WatchListPreviewCarousel;
