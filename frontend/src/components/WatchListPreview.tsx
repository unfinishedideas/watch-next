import WatchList from "../classes/WatchList";
import NoPoster from "../assets/NoPoster.png";

interface WatchListPreviewProps {
  listData: WatchList | undefined;
  rowLength: number | undefined;
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
      <div className={`relative w-1/${rowLength} flex-col min-w-0 line-clamp-2`}>
        <img className="flex justify-center mx-auto" src={NoPoster} />
        <a
          href={`/lists/${listData.id}`}
          className="link block whitespace-normal break-all text-ellipsis overflow-hidden text-center line-clamp-2 min-w-0"
        >
          {listData.title}
        </a>
      </div>
    );
  }
};

export default WatchListPreview;
