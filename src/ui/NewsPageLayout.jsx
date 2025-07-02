import { BsPen } from "react-icons/bs";
import useSingleNews from "../hooks/useSingleNews";
import { useParams } from "react-router-dom";

function NewsPageLayout() {
  const { id } = useParams();
  const { news, error, isError, isLoading } = useSingleNews(id);
  return (
    <div className="my-10 mx-4">
      <div
        className="flex items-center gap-x-2"
        data-aos="fade-right"
        data-aos-duration="1000"
      >
        <BsPen className="w-7 h-7" />
        <p className="text-xl">اخبار و رویدادها</p>
      </div>
    </div>
  );
}

export default NewsPageLayout;
