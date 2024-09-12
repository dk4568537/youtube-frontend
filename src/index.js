import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import Store from "./Store";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Navbar from "./component/navbar";
import Channels from "./component/channels";
import Shorts from "./ShortsVideo/Shorts";
import VideoDetail from "./component/videoDetail";
import Playlist from "./component/Playlist";
import Login from "./component/Login";
import ViewShortsAll from "../src/ShortsVideo/ViewShortsAll";
import Signup from "./component/sign-up";
import History from "./component/History";
import CategoryPage from "./component/CategoryPage/CategoryPage";
import Music from "./component/category/Music";
import Category from "./component/category/category";
import Moviemusicals from "./component/category/moviemusicals";
import MoviemusicalsDetails from "./component/MoviemusicalsDetails";
import Javascript from "./component/category/javascript";
import Mychannel from "./component/Mychannel";
import Studio from "./component/Studio";
import Posts from "./component/posts";
import DetailPosts from "./component/DetailPosts";
import CreatePost from "./component/CreatePost";
import Live from "./component/Live";

function AppRoutes() {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("user"));

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate("/Login", { replace: true });
  //   }
  // }, [navigate, isLoggedIn]);

  return (
    <>
      <Navbar>
        <Routes>
          {/* Public Routes */}
          {!isLoggedIn && (
            <>
              <Route path="/Login" element={<Login />} />
              <Route path="/sign-up" element={<Signup />} />
            </>
          )}

          {/* Protected Routes */}
          {isLoggedIn ? (
            <>
              <Route
                path="/"
                element={
                  <>
                    <Category />
                    <Posts />
                    <Channels />
                    <Shorts />
                    <Moviemusicals />
                    <Shorts />
                    <Javascript />
                  </>
                }
              />
              <Route path="/Shorts" element={<Shorts />} />
              <Route path="/Mychannel" element={<Mychannel />} />
              <Route path="/Studio" element={<Studio />} />
              <Route path="/Live" element={<Live />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/DetailPosts/:id" element={<DetailPosts />} />
              <Route path="/CreatePost/:id" element={<CreatePost />} />
              <Route path="/History" element={<History />} />
              <Route path="/VideoDetail/:id" element={<VideoDetail />} />
              <Route
                path="/moviemusicalsDetails/:id"
                element={<MoviemusicalsDetails />}
              />
              <Route path="/playlist" element={<Playlist />} />
              <Route path="/ViewShortsAll/:id" element={<ViewShortsAll />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/category/music" element={<Music />} />
              <Route
                path="/category/moviemusicals"
                element={<Moviemusicals />}
              />
              <Route path="/category/javascript" element={<Javascript />} />
              <Route path="*" element={<Navigate to="/" />} />{" "}
              {/* Redirect invalid paths */}
            </>
          ) : (
            <>
              <Route path="*" element={<Navigate to="/Login" replace />} />
            </>
          )}
        </Routes>
      </Navbar>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={Store}>
    <ChakraProvider>
      <React.StrictMode>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </React.StrictMode>
    </ChakraProvider>
  </Provider>
);

reportWebVitals();
