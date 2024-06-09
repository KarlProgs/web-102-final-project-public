import { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";

const PostCardInfo = lazy(() => import("src/components/PostCardInfo"));

const PostCardInfoSuspenseWrapper = () => {
  const { id } = useParams();

  return (
    <Suspense fallback="Loading edit view...">
      <PostCardInfo id={id} />
    </Suspense>
  );
};

export default PostCardInfoSuspenseWrapper;
