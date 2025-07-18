import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("Acerca", "routes/Acerca.tsx"),
    route("Registro", "routes/Registro.tsx"),
    route("about", "routes/about.tsx"),
    route("posts/:id", "routes/post.tsx"),
    
] satisfies RouteConfig;
