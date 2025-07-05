// Definir o tipo PageProps
type PageProps = {
  params: {
    id: string;
  };
};

// Função que define e exporta um componente TeamPage que recebe as propriedades conforme definido em PageProps
export default function TeamPage({ params }: PageProps) {
  return (
    // Container flexivel para centralizar o conteúdo
    <div className="flex justify-center items-center text-neutral-100">
      {/* Exibe o valor do parâmetro `id` recebido nas propriedades */}
      {params.id}
    </div>
  );
}
