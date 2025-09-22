import WatchList from "../classes/WatchList.ts";
import WatchListPreview from "./WatchListPreview.tsx";

interface WatchListPreviewContainerProps {
  listsData: WatchList[] | undefined;
}

const WatchListPreviewContainer: React.FC<WatchListPreviewContainerProps> = ({
  listsData,
}: WatchListPreviewContainerProps) => {
  const containerDivClass = `grid grid-cols-3`;
  if (!listsData) {
    return (
      <div className={containerDivClass}>
        <p>You currently have no watch lists.</p>
        <a className="link link-primary">Let's create one and get watching!</a>
      </div>
    );
  } else {
    return (
      <div>
        <a className="link link-primary">Create New List</a>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
          {listsData.map((list) => (
            <WatchListPreview listData={list} />
          ))}
        </div>
      </div>
    );
  }
};

export default WatchListPreviewContainer;
