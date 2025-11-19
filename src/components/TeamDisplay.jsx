export default function TeamDisplay({ teams }) {
    if (!teams)
        return (
            <div className="text-center py-20 rounded-2xl bg-white shadow">
                <div className="text-6xl mb-4">⚽</div>
                <p className="text-xl opacity-60">
                    Adicione jogadores e clique em “Criar Times”
                </p>
            </div>
        );

    const { team1, team2, extras, total1, total2 } = teams;

    const renderTeam = (title, players, total, color) => {
        const avg = players.length ? (total / players.length).toFixed(1) : "0.0";

        return (
            <div className="p-6 rounded-2xl border shadow bg-white">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold" style={{ color }}>
                        {title}
                    </h3>

                    <div className="text-right">
                        <div className="text-sm opacity-60">Habilidade Total</div>
                        <div className="text-2xl font-bold" style={{ color }}>
                            {total.toFixed(1)}
                        </div>
                    </div>
                </div>

                <p className="opacity-70 mb-3 text-sm">
                    {players.length} jogadores • Média: {avg}
                </p>

                <div className="space-y-2">
                    {players.map((p) => (
                        <div
                            key={p.id}
                            className="flex justify-between bg-gray-100 p-3 rounded-lg"
                        >
                            <span>{p.name}</span>
                            <span
                                className="px-3 py-1 text-white font-semibold rounded-full"
                                style={{ backgroundColor: color }}
                            >
                                {p.skill.toFixed(1)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Times principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderTeam("Time 1", team1, total1, "#3b82f6")}
                {renderTeam("Time 2", team2, total2, "#10b981")}
            </div>

            {/* Aba Próximos */}
            {extras && extras.length > 0 && (
                <div>
                    {renderTeam("Próximos", extras, extras.reduce((n, p) => n + p.skill, 0), "#f59e0b")}
                </div>
            )}
        </div>
    );
}
