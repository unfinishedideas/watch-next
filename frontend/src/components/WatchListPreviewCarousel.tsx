import { useQuery } from "@tanstack/react-query";
import WatchList from "../classes/WatchList.ts";

interface WatchListPreviewCarouselProps {
  listsData: WatchList[];
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
    return (
      <div>
        {listsData.map((list: WatchList, index: number) => (
            <p key={index}>{list.id}</p>
        ))}
      </div>
    );
  }
};

export default WatchListPreviewCarousel;
