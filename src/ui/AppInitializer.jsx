import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import getAllCoursesApi, {
  getSingleCourseApi,
} from "../services/coursesService";
import getAllStudentsWorksApi from "../services/studentsWorksService";
import getAllNewsApi from "../services/newsService";
import getAllReviewsApi from "../services/reviewsService";
import { useToast } from "../context/useToastContext";
import Loading from "./Loading";

function AppInitializer({ children }) {
  const [isReady, setIsReady] = useState(false);
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const { showToast } = useToast();

  useEffect(() => {
    const loadingInitialData = async () => {
      try {
        const tasks = [];

        if (pathname === "/") {
          tasks.push(
            queryClient.prefetchQuery({
              queryKey: ["studentWorks"],
              queryFn: getAllStudentsWorksApi(),
            }),
            queryClient.prefetchQuery({
              queryKey: ["news"],
              queryFn: getAllNewsApi,
            }),
            queryClient.prefetchQuery({
              queryKey: ["courses"],
              queryFn: getAllCoursesApi,
            })
          );
        }
        if (pathname.startsWith("/courses")) {
          const match = pathname.match(/^\/courses\/([^/]+)$/);
          if (match) {
            const courseId = match[1];
            tasks.push(
              queryClient.prefetchQuery({
                queryKey: ["course", courseId],
                queryFn: () => getSingleCourseApi(courseId),
              })
            );
          } else {
            tasks.push(
              queryClient.prefetchQuery({
                queryKey: ["courses"],
                queryFn: getAllCoursesApi,
              })
            );
          }
        }
        if (pathname.startsWith("/news")) {
          tasks.push(
            queryClient.prefetchQuery({
              queryKey: ["news"],
              queryFn: getAllNewsApi,
            })
          );
        }
        if (pathname.startsWith("/reviews")) {
          tasks.push(
            queryClient.prefetchQuery({
              queryKey: ["reviews"],
              queryFn: getAllReviewsApi,
            })
          );
        }
        await Promise.all(tasks);
        setIsReady(true);
      } catch (error) {
        showToast(
          "error",
          error?.response?.data?.message || "اطلاعات یافت نشد"
        );
        setIsReady(true);
      }
    };
    loadingInitialData();
  }, [pathname, queryClient, showToast]);

  if (!isReady)
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-whitesmoke dark:bg-gray-950">
        <Loading />
      </div>
    );

  return children;
}

export default AppInitializer;
