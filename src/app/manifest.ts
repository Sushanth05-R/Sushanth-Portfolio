import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sushanth R — Full-Stack & Mobile Developer",
    short_name: "Sushanth R",
    description:
      "Personal portfolio of Sushanth R, Full-Stack & Mobile Developer (MCA, Udupi, Karnataka).",
    start_url: "/",
    display: "standalone",
    background_color: "#05070d",
    theme_color: "#10b981",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

