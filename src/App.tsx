import { Characters } from "./components/characters";

export function App() {
  return (
    <div className="flex flex-col w-screen h-screen overflow-x-hidden">
      <h1 className="p-3 text-2xl font-bold text-center font-size">Personagens</h1>
      
      <Characters />
      
      <footer className="p-3 text-base text-center">
        <p>Desenvolvido por 
          <a 
            href="https://github.com/jcaridade/" 
            className="font-bold hover:text-slate-700"> Joyce Caridade
          </a>
        </p>
      </footer>
    </div>
  );
}

