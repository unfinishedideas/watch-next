import WatchList from "../classes/WatchList";
import NoPoster from "../assets/NoPoster.png";

interface WatchListPreviewProps {
  listData: WatchList | undefined;
  rowLength: number;
}

const WatchListPreview: React.FC<WatchListPreviewProps> = ({
  listData,
  rowLength,
}: WatchListPreviewProps) => {
  const widthPercentage = (1 / rowLength) * 100;
  const divClass = `
    min-w-[${widthPercentage}%]
    max-w-[${widthPercentage}%]
  `;
  const imgClass = `
    justify-center
    mx-auto
  `;
  const titleDiv = `
    w-full
    min-h-20
    max-h-20
    px-5
    overflow-hidden
    truncate
    inline-block
    text-center
  `;
  const txtClass = `
    link
    min-w-0 
    break-normal
    whitespace-normal
  `;
  if (!listData) {
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
          <a href={`/lists/${listData.id}`} className={txtClass}>
            {listData.title}
          </a>
        </div>
      </div>
    );
  }
};

export default WatchListPreview;
