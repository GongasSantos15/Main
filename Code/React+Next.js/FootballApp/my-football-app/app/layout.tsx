// Imports
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SearchBar from "./components/searchBar/SearchBar";

// Fonte Usada
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Metadata usada com configurações para os navegadores e motores de busca
export const metadata: Metadata = {
  title: "Footy",
  description: "Football/Soccer Stats, Matches, Team Info App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Define o elemento raiz HTML com o atributo de linguagem definido para inglês
    <html lang="en">
      {/* O corpo do documento HTML com uma classe CSS aplicada */}
      <body className={inter.className}>
        {/* Um container com fundo preto e posicionamento relativo */}
        <div className="relative bg-black">
          {/* Um container posicionado absolutamente que cobre todo o espaço do container pai */}
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Uma imagem de fundo que preenche toda a altura e largura do container */}
            <img
              src="/background.png"
              alt="Background Image" // Texto alternativo para acessibilidade
              className="h-screen w-full object-cover" // Estilos CSS para cobrir toda o ecrã
            />
          </div>
          <div className="absolute top-0 left-0 w-full h-screen bg-black opacity-50" />
          <div className="relative">
            {/* Barra de Pesquisa */}
            <SearchBar />
            {/* Renderiza os componentes filhos dentro do corpo */}
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
