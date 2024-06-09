import { lazy, Suspense } from "react";

const ListPostCardList = lazy(() => import("src/components/ListPostCardList")); // using lazy allows the usage of Suspense

const App = () => {
  return (
    <>
      <Suspense fallback="Loading posts...">
        <ListPostCardList className="gallery" edit={true} />
      </Suspense>
    </>
  );
};

export default App;
