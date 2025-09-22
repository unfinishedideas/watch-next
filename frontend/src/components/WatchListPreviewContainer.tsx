import WatchList from "../classes/WatchList.ts";
import WatchListPreview from "./WatchListPreview.tsx";

interface WatchListPreviewContainerProps {
  listsData: WatchList[] | undefined;
}

const WatchListPreviewContainer: React.FC<WatchListPreviewContainerProps> = ({
  listsData,
}: WatchListPreviewContainerProps) => {
  const containerDivClass = ``;
  if (!listsData) {
    return (
      <div className={containerDivClass}>
        <p>You currently have no watch lists.</p>
        <a className="link link-primary">Let's create one and get watching!</a>
      </div>
    );
  } else {
    return (
      <div className={containerDivClass}>
        {listsData.map((list) => (
          <WatchListPreview listData={list} />
        ))}
        <a className="link link-primary">Create New List</a>
      </div>
    );
  }
};

export default WatchListPreviewContainer;
