// Marcar o componente como cliente
"use client";

// Imports
import { Team } from "@/types";
import SearchBarForm from "./SearchBarForm";
import Link from "next/link";
import { usePathname } from "next/navigation";
import StandingsDropdown from "../standings/StandingsDropdown";

// Componente da Barra de Pesquisa
// Agora, SearchBar recebe teamsData como propriedade
export default function SearchBar({ teamsData = [] }: { teamsData?: Team[] }) {
  // Obter o caminho atual da URL
  const pathname = usePathname();

  // Função para determinar as classes CSS dos links
  const getLinkClasses = (href: string) => {
    const baseClasses = "font-semibold transition-colors duration-200";
    // Verifica se o link é o caminho raiz e se o caminho atual é exatamente o caminho raiz
    if (href === "/" && pathname === "/") {
      return `${baseClasses} text-green-500 font-bold`;
    }
    // Para outros links, verifica se o caminho atual começa com o href do link
    // Isso permite que "/standings/details" ainda destaque "/standings"
    if (href !== "/" && pathname.startsWith(href)) {
      return `${baseClasses} text-green-500 font-bold`;
    }
    // Retorna classes para links não ativos
    return `${baseClasses} text-neutral-100 hover:text-green-500`;
  };

  return (
    // Container principal com colunas flexíveis para responsividade
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-center w-full p-3 bg-black/40 search-bar px-4 md:px-8 lg:px-20 rounded-lg gap-3">
      {/* Logo e Links de Navegação (alinhado à esquerda, empilhados em ecrãs pequenos) */}
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-10 items-center text-neutral-100 flex-shrink-0">
        {/* Link para a página principal quando clicar no logo */}
        <Link
          href={"/"}
          className={`flex justify-center items-center ${getLinkClasses("/")}`}
        >
          {/* Imagem Logo */}
          <img
            src="logo.png"
            alt="Logo"
            className="w-10 object-cover rounded-full"
          />
          {/* Nome do Site (visivel apenas em ecrãs médios ou largos) */}
          <div className="px-2 hidden md:block font-bold text-xl text-white">
            Footy
          </div>
        </Link>

        {/* Dropdown para classificação Nacional ou UEFA */}
        <div className="flex space-x-10">
          <StandingsDropdown getLinkClasses={getLinkClasses} />
        </div>
      </div>

      {/* Barra de Pesquisa */}
      <div className="w-full max-w-md mx-auto md:justify-self-center">
        <SearchBarForm teamsData={teamsData} />
      </div>

      {/* Div vazia */}
      <div className="hidden md:block flex-shrink-0 w-[150px] lg:w-[250px]"></div>
    </div>
  );
}
