import WatchList from "../classes/WatchList";
import NoPoster from "../assets/NoPoster.png";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { GetListPreviewContentById } from "../api/WatchListAPI";

interface WatchListPreviewProps {
  listData: WatchList | undefined;
}

const WatchListPreview: React.FC<WatchListPreviewProps> = ({
  listData,
}: WatchListPreviewProps) => {
  const { isPending, error, data } = useQuery({
    queryKey: [`watch_list_preview`, listData?.id],
    queryFn: () => GetListPreviewContentById(listData!.id),
    enabled: !!listData,
  });

  const navigate = useNavigate();
  const divClass = ``;
  const imgClass = ``;
  const titleDiv = ``;
  const txtClass = ``;
  // const imgClass = `justify-center mx-auto`;
  // const titleDiv = `w-full min-h-20 max-h-20 px-5 overflow-hidden truncate inline-block text-center`;
  // const txtClass = `link min-w-0 break-normal whitespace-normal`;

  function NavToListView() {
    if (listData === undefined) {
      console.error("Error: cannot navigate, listData undefined");
      return;
    }
    navigate(`/lists/${listData.id}`, { state: listData });
  }
  if (isPending) {
    return (
      <div className={divClass}>
        <p>Loading list preview...</p>
      </div>
    );
  } else if (error) {
    return (
      <div className={divClass}>
        <p>Something went wrong loading your list preview!</p>
      </div>
    );
  } else {
    console.log(data)
    return (
      <div className={divClass}>
        <img className={imgClass} src={NoPoster} />
        <div className={titleDiv}>
          <a onClick={NavToListView} className={txtClass}>
            {listData?.title}
          </a>
        </div>
      </div>
    );
  }
};

export default WatchListPreview;
