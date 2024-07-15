interface Route {
  name: string;
  isAuth: boolean;
  path: string;
}

export const routes: Route[] = [
  {
    name: "Repertuar",
    path: "/",
    isAuth: false,
  },
  {
    name: "Wydarzenia",
    path: "/wydarzenia",
    isAuth: false,
  },
  {
    name: "Promocje",
    path: "/promocje",
    isAuth: false,
  },
  {
    name: "News",
    path: "/news",
    isAuth: false,
  },
];
