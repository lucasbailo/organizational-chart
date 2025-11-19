export default function PlayerList({ players, onDelete }) {
  return (
    <div className="rounded-2xl p-6 shadow-lg bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Jogadores</h2>
        <span className="px-3 py-1 rounded-full bg-blue-600 text-white font-semibold">
          {players.length}
        </span>
      </div>

      {players.length === 0 && (
        <p className="text-center opacity-60 py-6">
          Nenhum jogador adicionado ainda
        </p>
      )}

      <div className="space-y-3">
        {players.map((player) => (
          <div
            key={player.id}
            className="player-card bg-white rounded-xl p-4 flex items-center justify-between border"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                {player.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <div className="font-semibold">{player.name}</div>
                <div className="text-sm opacity-70">
                  Habilidade:{" "}
                  <span className="font-semibold">{player.skill.toFixed(1)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onDelete(player.id)}
              className="px-3 py-2 rounded-lg bg-red-100 text-red-600"
            >
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
