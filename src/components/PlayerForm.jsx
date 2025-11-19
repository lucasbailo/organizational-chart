import { useState } from "react";

export default function PlayerForm({ onAdd }) {
  const [name, setName] = useState("");
  const [skill, setSkill] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !skill) return;

    onAdd(name.trim(), skill);
    setName("");
    setSkill("");
  }

  return (
    <div className="rounded-2xl p-6 shadow-lg mb-6 bg-white">
      <h2 className="text-2xl font-semibold mb-4">Adicionar Jogador</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">Nome do Jogador</label>
          <input
            className="w-full px-4 py-3 rounded-xl border input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite o nome"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Habilidade (1-10)</label>
          <input
            type="number"
            min="1"
            max="10"
            step="0.1"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border input-field"
            placeholder="Digite a nota"
          />
        </div>

        <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold">
          Adicionar Jogador
        </button>
      </form>
    </div>
  );
}
