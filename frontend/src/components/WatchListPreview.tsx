import WatchList from "../classes/WatchList";
import NoPoster from "../assets/NoPoster.png";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { GetListPreviewContentById } from "../api/WatchListAPI";
import type { MediaPreviewData } from "../classes/Media";

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
  const divClass = `border-4 border-indigo-600 my-10 w-1/4`;
  const posterDivClass = `flex`;
  const imgClass = `-mr-25 object-contain h-68`;
  const titleDiv = ``;
  const txtClass = ``;
  const numCards = 4;
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
    // Prep poster URLs for preview image
    let z = numCards;
    const posters: string[] = [];
    data.mediaPreviews?.forEach((preview: MediaPreviewData) => {
      if (preview.thumbnail !== null) {
        posters.push(preview.thumbnail);
      } else {
        posters.push("");
      }
    });
    while (posters.length < numCards) {
      posters.push("");
    }
    return (
      <div className={divClass}>
        <div className={posterDivClass}>
          {posters.map((url) => {
            z++;
            let posterCardClass = "";
            if (z === numCards + 1) {
              posterCardClass = `${imgClass} z-${z}`;
            } else {
              posterCardClass = `${imgClass} z-${z} border-l-1`;
            }

            if (url !== "") {
              return <img className={posterCardClass} src={url} />;
            } else {
              return <img className={posterCardClass} src={NoPoster} />;
            }
          })}
        </div>
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
