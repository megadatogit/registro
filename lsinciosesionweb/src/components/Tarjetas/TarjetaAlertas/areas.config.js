// areas.config.js
import iconCorazon from "./heart.svg";
import iconMente   from "./mind.svg";
import iconAgenda  from "./agend.svg";
import iconBalance from "./balance.svg";
import iconNota    from "./note.svg";

export const AREAS = {
  a1: {
    id: "a1",
    label: "Área de atención",
    icon: iconCorazon,
    theme: { "--bg": "#ffe1e1", "--btn": "#de5167", "--btn-hover": "#f8a9a9" }
  },
  a2: {
    id: "a2",
    label: "Área de atención",
    icon: iconMente,
    theme: { "--bg": "#e6fff3", "--btn": "#2b9b6f", "--btn-hover": "#6ed0a3" }
  },
  a3: {
    id: "a3",
    label: "Área de atención",
    icon: iconAgenda,
    theme: { "--bg": "#e9eaff", "--btn": "#4c6fff", "--btn-hover": "#8ea2ff" }
  },
  a4: {
    id: "a4",
    label: "Área de atención",
    icon: iconBalance,
    theme: { "--bg": "#ffe3f2", "--btn": "#d43b8f", "--btn-hover": "#f084c0" }
  },
  a5: {
    id: "a5",
    label: "Área de atención",
    icon: iconNota,
    theme: { "--bg": "#ffe7c2", "--btn": "#e49c33", "--btn-hover": "#f2c275" }
  }
};
