import WatchList from "../classes/WatchList";
import NoPoster from "../assets/NoPoster.png";

interface WatchListPreviewProps {
  listData: WatchList | undefined,
  rowLength: number | undefined,
}

const WatchListPreview: React.FC<WatchListPreviewProps> = ({
  listData,
  rowLength,
}: WatchListPreviewProps) => {
  if (!listData) {
    return (
      <div>
        <p>Unable to load list preview!</p>
      </div>
    );
  } else {
    return (
      <div className={`relative w-1/${rowLength} flex-col mr-2 p-2 bg-secondary`}>
        <img className="flex justify-center mx-auto" src={NoPoster} />
        <a className="link block whitespace-normal break-words">{listData.title}</a>
      </div>
    );
  }
};

export default WatchListPreview;
