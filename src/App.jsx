import { useState } from "react";
import PlayerForm from "./components/PlayerForm";
import PlayerList from "./components/PlayerList";
import TeamDisplay from "./components/TeamDisplay";
import Toast from "./components/Toast";
import './index.css'

export default function App() {
  const [players, setPlayers] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [teams, setTeams] = useState(null);

  function showToast(message, type = "success") {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type }), 3000);
  }

  function addPlayer(name, skill) {
    if (players.length >= 999) {
      showToast("Limite máximo de 999 jogadores atingido", "error");
      return;
    }

    const newPlayer = {
      id: crypto.randomUUID(),
      name,
      skill: parseFloat(skill),
      createdAt: new Date().toISOString(),
    };

    setPlayers((p) => [...p, newPlayer]);
    showToast("Jogador adicionado com sucesso!");
  }

  function removePlayer(id) {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
    showToast("Jogador removido com sucesso!");
  }

  function createTeams() {
    if (players.length < 2) return;

    // Ordena por habilidade (maior → menor)
    const sortedPlayers = [...players].sort((a, b) => b.skill - a.skill);

    let extras = [];

    // Se for ímpar, remove o último (menor habilidade)
    if (sortedPlayers.length % 2 !== 0) {
      const removed = sortedPlayers.pop(); // remove o mais fraco
      extras.push(removed);
    }

    const team1 = [];
    const team2 = [];

    sortedPlayers.forEach((player, index) => {
      if (index % 2 === 0) team1.push(player);
      else team2.push(player);
    });

    const calc = (team) => team.reduce((sum, p) => sum + p.skill, 0);

    setTeams({
      team1,
      team2,
      extras,
      total1: calc(team1),
      total2: calc(team2),
    });
  }

  return (
    <div className="min-h-screen p-6 md:p-10">
      {toast.show && <Toast message={toast.message} type={toast.type} />}

      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Criador de Times Balanceados
          </h1>
          <p className="text-lg opacity-80">
            Distribua jogadores em equipes com base em notas de habilidade
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT: Input + players */}
          <div>
            <PlayerForm onAdd={addPlayer} />

            <PlayerList players={players} onDelete={removePlayer} />
          </div>

          {/* RIGHT: Teams */}
          <div>
            <button
              onClick={createTeams}
              disabled={players.length < 2}
              className="w-full py-4 rounded-xl font-bold text-lg mb-6 bg-green-600 text-white shadow-md
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Criar Times
            </button>

            <TeamDisplay teams={teams} />
          </div>
        </div>
      </div>
    </div>
  );
}
