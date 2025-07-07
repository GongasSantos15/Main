// Imports
import { Team } from "@/types";
import getTeams from "@/app/util/getTeams";
import SearchBarForm from "./SearchBarForm";
import Link from "next/link";

// Função que Efetua a procura das Equipas
export default async function SearchBar() {
  // Procura os dados das equipas usando a função getTeams
  let teamsData: Team[] = await getTeams();

  // JSX para definir o componente de pesquisa
  return (
    // Um container flexivel que centraliza os itens, com largura total e preenchimento interno
    <div className="flex justify-center items-center w-full p-3 bg-black/40 search-bar">
      {/* Container para o Logo e Links de Navegação  */}
      <div className="flex space-x-10 items-center text-neutral-100">
        {/* Um link que ao clicar no logo, redireciona para a página inicial */}
        <Link href={"/"} className="flex justify-center items-center">
          {/* Imagem que representa o logo do site, com altura fixa e bordas arredondadas */}
          <img
            src="/logo.png"
            alt="Logo"
            className="w-10 object-cover rounded-full"
          />
          {/* O nome do site é exibido apenas em ecrãs médios ou maiores, com estilo negrito e cor branca */}
          <div className="px-2 md:block hidden font-bold text-xl text-white">
            Footy
          </div>
        </Link>

        {/* Link para a página das classificações */}
        <Link href={"/standings"} className="font-semibold hover:underline">
          Standings
        </Link>
      </div>
      {/* Um container que ocupa 4/6 da largura total, centralizando os itens */}
      <div className="w-4/6 flex justify-center items-center">
        {/* Renderiza o formulário de pesquisa com os dados das equipas como propriedade */}
        <SearchBarForm teamsData={teamsData} />
      </div>
      {/* Um container vazio que ocupa 1/6 da largura total */}
      <div className="w-1/6"></div>
    </div>
  );
}
