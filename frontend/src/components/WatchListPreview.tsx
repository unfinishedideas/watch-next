import WatchList from "../classes/WatchList";
import NoPoster from "../assets/NoPoster.png";
import { useNavigate } from "react-router";

interface WatchListPreviewProps {
  listData: WatchList | undefined;
  rowLength: number;
}

const WatchListPreview: React.FC<WatchListPreviewProps> = ({
  listData,
  rowLength,
}: WatchListPreviewProps) => {
  const navigate = useNavigate();
  const widthPercentage = (1 / rowLength) * 100;
  const divClass = `min-w-[${widthPercentage}%] max-w-[${widthPercentage}%]`;
  const imgClass = `justify-center mx-auto`;
  const titleDiv = `w-full min-h-20 max-h-20 px-5 overflow-hidden truncate inline-block text-center`;
  const txtClass = `link min-w-0 break-normal whitespace-normal`;

  function NavToListView()
  {
    if (listData === undefined) {
      console.error("Error: cannot navigate, listData undefined")
      return;
    }
    navigate(`/lists/${listData.id}`, { state: listData })
  }

  if (!listData) {
  // TODO: Make this condition an error instead? This should never happen
    return (
      <div className={divClass}>
        <img className={imgClass} src={NoPoster} />
        <p>Create more!</p>
      </div>
    );
  } else {
    return (
      <div className={divClass}>
        <img className={imgClass} src={NoPoster} />
        <div className={titleDiv}>
          <a onClick={NavToListView} className={txtClass}>
            {listData.title}
          </a>
        </div>
      </div>
    );
  }
};

export default WatchListPreview;
