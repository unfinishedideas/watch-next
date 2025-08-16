import WatchList from "../classes/WatchList";
import WatchListPreview from "./WatchListPreview";

interface WatchListPreviewCarouselPageProps {
  listsData: WatchList[] | undefined;
}

const WatchListPreviewCarouselPage: React.FC<
  WatchListPreviewCarouselPageProps
> = ({ listsData }: WatchListPreviewCarouselPageProps) => {
  if (!listsData) {
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
};

export default WatchListPreviewCarouselPage;
