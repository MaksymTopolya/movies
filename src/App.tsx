import { lazy, Suspense } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';

const Navigation = lazy(() => import('./Navigation/Navigation'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const DetailsPage = lazy(() => import('./pages/DetailsPage/DetailsPage'));
const ActorPage = lazy(() => import('./pages/ActorPage/ActorPage'));
const TopRatedPage = lazy(() => import('./pages/TopRatedPage/TopRatedPage'));
const UpcomingPage = lazy(() => import('./pages/UpcomingPage/UpcomingPage'));
const SearchPage = lazy(() => import('./pages/SearchPage/SearchPage'));
const TopRatedSerialsPage = lazy(
  () => import('./pages/TopRatedSerialsPage/TopRatedSerialsPage'),
);
const SerialsHomePage = lazy(
  () => import('./pages/SerialsHomePage/SerialsHomePage'),
);
const SerialDetailsPage = lazy(
  () => import('./pages/SerialDetailsPage/SerialDetailsPage'),
);
const FavoritePage = lazy(() => import('./pages/FavoritePage/FavoritePage'));

function App() {
  return (
    <div className="container">
      <Suspense
        fallback={<div className=".loading-container">Is loading...</div>}
      >
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/details/:movieId" element={<DetailsPage />} />
          <Route path="/actor/:actorId" element={<ActorPage />} />
          <Route path="/topRated" element={<TopRatedPage />} />
          <Route path="/upcoming" element={<UpcomingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/serials" element={<SerialsHomePage />} />
          <Route path="/serials/:serialId" element={<SerialDetailsPage />} />
          <Route path="/serials/topRated" element={<TopRatedSerialsPage />} />
          <Route path="/favorite" element={<FavoritePage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
