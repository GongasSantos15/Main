"use client";

import { GridLoader } from "react-spinners";

// Componente para quando a página está a carregar
export default function LoadingComponent({ color }: { color: string }) {
  return (
    <div>
      <GridLoader color={color} size={30} />
    </div>
  );
}
