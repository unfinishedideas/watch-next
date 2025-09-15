import NoPoster from "../assets/NoPoster.png";
import { useNavigate } from "react-router";

interface MoviePosterProps {
    imgUrl: string | undefined;
    destination: string;
    title: string | undefined;
}

const MoviePoster: React.FC<MoviePosterProps> = ({
    imgUrl,
    destination,
    title,
}: MoviePosterProps) => {
    const navigate = useNavigate();
    //const divClass = `min-w-[${widthPercentage}%] max-w-[${widthPercentage}%]`;
    const divClass = ``;
    const imgClass = `justify-center mx-auto`;
    const titleDiv = `w-full min-h-20 max-h-20 px-5 overflow-hidden truncate inline-block text-center`;
    const txtClass = `link min-w-0 break-normal whitespace-normal`;

    function NavToListView() {
        if (destination === undefined) {
            console.error("Error: cannot navigate, destination undefined")
            return;
        }
        navigate(destination)
    }

    return (
        <div className={divClass}>
            {
                imgUrl ?
                    <img className={imgClass} src={imgUrl} />
                    :
                    <img className={imgClass} src={NoPoster} />
            }
            {
                title ??
                <div className={titleDiv}>
                    {destination ??
                        <a onClick={NavToListView} className={txtClass}>
                            {title}
                        </a>
                    }
                </div>
            }
        </div>
    );
}

export default MoviePoster;