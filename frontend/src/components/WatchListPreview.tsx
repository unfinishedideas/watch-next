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
  const divClass = `relative w-1/${rowLength} flex-col mr-2 min-w-0 line-clamp-2`;
  if (!listData) {
    return (
      <div className={divClass}>
        <img className="flex justify-center mx-auto" src={NoPoster} />
        <p>Create more!</p>
      </div>
    );
  } else {
    return (
      <div className={divClass}>
        <img className="flex justify-center mx-auto" src={NoPoster} />
        <a
          href={`/lists/${listData.id}`}
          className="
          link 
          block 
          whitespace-normal 
          break-keep 
          text-ellipsis 
          overflow-hidden 
          text-center
          "
        >
          {listData.title}
        </a>
      </div>
    );
  }
};

export default WatchListPreview;
