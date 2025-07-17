import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("Acerca", "routes/Acerca.tsx"),
    route("Registro", "routes/Registro.tsx"),
    route("posts/:postId", "routes/post.tsx"),
] satisfies RouteConfig;
