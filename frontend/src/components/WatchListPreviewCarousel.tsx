//import { useQuery } from "@tanstack/react-query";
import WatchList from "../classes/WatchList.ts";
import WatchListPreview from "./WatchListPreview.tsx";

interface WatchListPreviewCarouselProps {
  listsData: WatchList[] | undefined;
}

const WatchListPreviewCarousel: React.FC<WatchListPreviewCarouselProps> = ({
  listsData,
}: WatchListPreviewCarouselProps) => {
  if (!listsData) {
    return (
      <div>
        <p>Unable to load Watch List Preview!</p>
      </div>
    );
  } else {
    const listsCount = listsData.length;
    if (listsCount === 0) {
      return <div />;
    } else if (listsCount === 1) {
      return (
        <div>
          <p>{listsData[0].title}</p>
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
          listsPages[j][i] = <WatchListPreview listData={listsData[i]} />;
        }
        return <div />;
      } else {
        return (
          <div className="flex flex-row">
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
