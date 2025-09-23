import WatchList from "../classes/WatchList";
import NoPoster from "../assets/NoPoster.png";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { GetListPreviewContentById } from "../api/WatchListAPI";
import { MediaPreviewData } from "../classes/Media";

interface WatchListPreviewProps {
  listData: WatchList | undefined;
}

const WatchListPreview: React.FC<WatchListPreviewProps> = ({
  listData,
}: WatchListPreviewProps) => {
  const numCards = 4;
  const { isPending, error, data } = useQuery({
    queryKey: [`watch_list_preview`, listData?.id],
    queryFn: () => GetListPreviewContentById(listData!.id, numCards),
    enabled: !!listData,
  });

  const navigate = useNavigate();

  function NavToListView() {
    if (listData === undefined) {
      console.error("Error: cannot navigate, listData undefined");
      return;
    }
    navigate(`/lists/${listData.id}`, { state: listData });
  }
  if (isPending) {
    return (
      <div>
        <p>Loading list preview...</p>
      </div>
    );
  } else if (error) {
    return (
      <div>
        <p>Something went wrong loading your list preview!</p>
      </div>
    );
  } else {
    // Prep poster URLs for preview image
    const posters: MediaPreviewData[] = [];
    if (data.mediaPreviews !== null) {
      let i = 1;
      for (const preview of data.mediaPreviews) {
        if (i > numCards) {
          break;
        }
        posters.push(preview);
        i++;
      }
    }
    while (posters.length < numCards) {
      posters.push(new MediaPreviewData({title: "", thumbnail: "", media_order: 0}));
    }

    return (
      <div className="size-full overflow-hidden self-center justify-self-center my-10 px-10 content-between">
        <div
          className="border-2 border-black rounded-sm items-center justify-center hover:border-indigo-600"
          onClick={NavToListView}
        >
          <div className="flex w-full h-full">
            {posters.map((prev, i) => {
              const zIndex = posters.length - i;
              return (
                <div
                  key={i}
                  className={`flex-1 relative -ml-8 first:ml-0 rounded-sm shadow-lg overflow-hidden`}
                  style={{ zIndex }}
                >
                  <img
                    src={prev.thumbnail || NoPoster}
                    alt={`${prev.title} poster`}
                    className="object-cover w-full h-full"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="overflow-hidden">
          <a onClick={NavToListView} className="italic font-sans text-xl link">
            {listData?.title}
          </a>
        </div>
      </div>
    );
  }
};

export default WatchListPreview;
