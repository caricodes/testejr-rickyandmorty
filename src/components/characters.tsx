import { useEffect, useState } from "react";

interface Character {
  id: number;
  name: string;
  image: string;
  episode: string[];
  location: { name: string };
  status: "Alive" | "Dead" | "unknown";
  gender: "Male" | "Female" | "unknown";
}

export function Characters() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/characters.json");
        const result: Character[] = await res.json();
        setCharacters(result);
      } catch (error) {
        console.log("Erro ao consumir a API:", error);
      }
    };
    fetchData();
  }, []);

  const totalApperances = (character: Character): number => {
    const appearances = character.episode;
    return appearances.length;
  };

  const totalApperancesSeason1 = (character: Character): number => {
    const appearances = character.episode;
    const season1Appearances = appearances.filter((_, i) => i < 11);
    return season1Appearances.length;
  };

  const totalApperancesSeason2 = (character: Character): number => {
    const appearances = character.episode;
    const season2Appearances = appearances.filter((_, i) => i >= 10 && i < 20);
    return season2Appearances.length;
  };

    const totalApperancesSeason3 = (character: Character): number => {
      const appearances = character.episode;
      const season3Appearances = appearances.filter((_, i) => i >= 21);
      return season3Appearances.length;
  };
    
  const sortedCharacters = characters.sort((a, b) => {
    const totalAppearancesA = totalApperances(a);
    const totalAppearancesB = totalApperances(b);

    if (totalAppearancesA !== totalAppearancesB) {
        return totalAppearancesB - totalAppearancesA;
    } else {
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <main className="grid grid-cols-1 gap-2 m-auto mb-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-[70%]">
      {sortedCharacters.map((character) => (
        <div 
          key={character.id}
          className="p-2 rounded-sm shadow-md"
        >
          <img src={character.image} alt={character.name} className="w-full" />

          <h3 className="py-1 text-lg font-bold">{character.name}</h3>

          <ul className="flex flex-col gap-1">
            <li>
              <span className="font-bold">Visto por último em: </span>
              {character.location.name}
            </li>

            <li>
              <span className="font-bold">Genêro: </span>
              {
                character.gender === "Male"
								? "Masculino"
								: character.gender === "Female"
								? "Feminino"
								: character.gender === "unknown"
								? "Desconhecido" 
                : null
              }
            </li>

            <li>
							<span className="font-bold">Status: </span>
							{
                character.status === "Alive"
								? "Vivo"
								: character.status === "Dead"
								? "Morto"
								: character.status === "unknown"
								? "Desconhecido"
								: null
              }
						</li>

            <li>
              <span className="font-bold">Total de aparições: </span>
							{totalApperances(character)}
            </li>

            <li>
							<span className="font-bold">Aparições na primeira temporada: </span>
							{totalApperancesSeason1(character)}
						</li>

            <li>
							<span className="font-bold">Aparições na segunda temporada: </span>
							{totalApperancesSeason2(character)}
						</li>

            <li>
							<span className="font-bold">Aparições na terceira temporada: </span>
              {totalApperancesSeason3(character)}
						</li>
          </ul>
        </div>
      ))}
    </main>
  );
}
