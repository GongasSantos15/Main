// Imports
"use client";
import { Team } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

// Função que define o componente `SearchBarForm` que recebe a propriedade teamsData
export default function SearchBarForm({ teamsData }: { teamsData: Team[] }) {
  // Use States para gerir o termo de procura, o índice focado e a visibilidade da caixa de resultados filtrada
  const [searchTerm, setSearchTerm] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [showFilteredBox, setShowFilteredBox] = useState(false);

  // Inicializa o router do Next.JS para navegação entre páginas
  let router = useRouter();

  // Função que filtra as equipas com base no termo de procura
  const filteredTeams = teamsData.filter((team) =>
    team.team.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Função que lida com as mudanças no campo de procura
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setFocusedIndex(-1);
    setShowFilteredBox(true);
  };

  // Função que lida com os eventos do teclado no campo de procura
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();

      // Define o comprimento máximo de itens a serem mostrados na lista
      const length = Math.min(filteredTeams.length, 10);
      // Atualiza o índice focado para navegar para baixo na lista
      setFocusedIndex((prevIndex) =>
        prevIndex < length - 1 ? prevIndex + 1 : prevIndex,
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();

      // Atualiza o índice focado para navegar para cima na lista
      setFocusedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : -1));
    } else if (event.key === "Enter" && focusedIndex !== -1) {
      event.preventDefault();

      // Navega para a página da equipa selecionada ao pressionar Enter
      const teamId = filteredTeams[focusedIndex].team.id;
      router.push(`/team/${teamId}`);
      setSearchTerm("");
    }
  };

  // Função para lidar com os cliques da lista de equipas, coloca o termo de busca vazio
  const handleTeamItemClick = () => {
    setSearchTerm("");
  };

  // Cria uma referência para o elemento da lista de equipas
  const teamListRef = useRef<HTMLDivElement>(null);

  // Função para lidar com os cliques fora da lista de equipas
  const handleOutsideClick = (event: MouseEvent) => {
    if (
      teamListRef.current &&
      !teamListRef.current.contains(event.target as Node)
    ) {
      // Esconde a caixa de resultados filtrados se o clique foi fora
      setShowFilteredBox(false);
    }
  };

  // Event listener para detetar cliques fora da lista de equipas
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    // Remove o event listener quando o componente é desmontado
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // JSX para renderizar a lista de equipas filtradas
  return (
    // Container com largura máximo e com os itens centralizados
    <div className="flex justify-center items-center w-full max-w-lg relative">
      {/* Campo de pesquisa para procurar por equipa */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for a team"
        className="w-full bg-gray-300 text-black p-2 outline-none border-neutral-100/60 border-[2px] rounded-full
      hover:border-green-700 focus:border-green-700"
      />
      {/* Caixa de resultados filtrados que aparece quando há um termo de procura e resultados */}
      {searchTerm && filteredTeams.length > 0 && showFilteredBox ? (
        <div className="absolute top-full w-full max-w-lg bg-black/80 z-20 flex flex-col">
          {/* Mapeia e renderiza os nomes das equipas filtradas, consoante o que o utilizador procurar */}
          {filteredTeams.slice(0, 10).map((standing, i) => (
            <Link
              href={`/team/${standing.team.id}`}
              key={standing.team.id}
              className={`p-2 text-neutral-100 ${i === focusedIndex ? "bg-neutral-100/40" : ""}`}
              onClick={() => handleTeamItemClick()}
            >
              {standing.team.name}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
