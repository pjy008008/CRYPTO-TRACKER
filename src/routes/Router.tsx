import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "../screen/Home";
import Detail from "../screen/Detail";
import CoinChart from "./CoinChart";
import Price from "./Price";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: ":coinId",
        element: <Detail />,
        children: [
          {
            path: "chart",
            element: <CoinChart />,
          },
          {
            path: "price",
            element: <Price />,
          },
        ],
      },
    ],
  },
]);

export default router;
