import WatchList from "../classes/WatchList";
import NoPoster from "../assets/NoPoster.png";

interface WatchListPreviewProps {
  listData: WatchList | undefined;
}

const WatchListPreview: React.FC<WatchListPreviewProps> = ({
  listData,
}: WatchListPreviewProps) => {
  if (!listData) {
    return (
      <div>
        <p>Unable to load list preview!</p>
      </div>
    );
  } else {
    return (
      <div className="relative w-56 flex-col mr-2 p-2 bg-secondary">
        {/* TODO: CENTER THIS CONTENT! */}
        <img className="flex justify-center" src={NoPoster} />
        <a className="link">{listData.title}</a>
      </div>
    );
  }
};

export default WatchListPreview;
