import { useState } from 'react'

function ModalEditar({
  transacao,
  fechar,
  salvar
}) {

  const [descricao, setDescricao] = useState(transacao.descricao)
  const [valor, setValor] = useState(transacao.valor)
  const [periodo, setPeriodo] = useState(transacao.periodo)

  const handleSalvar = () => {

    const transacaoAtualizada = {
      ...transacao,
      descricao,
      valor,
      periodo
    }

    salvar(transacaoAtualizada)

    fechar()
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-2">

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4 md:p-8 w-[95%] md:w-full max-w-2xl shadow-2xl">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-xl md:text-3xl font-bold">
            Editar Transação
          </h2>

          <button
            onClick={fechar}
            className="text-slate-400 hover:text-white text-2xl"
          >
            ✕
          </button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição"
            className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm outline-none"
          />

          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="Valor"
            className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm outline-none"
          />

          <select
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm"
          >

            <option value="05">
              Conta do dia 05
            </option>

            <option value="20">
              Conta do dia 20
            </option>

          </select>

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={fechar}
            className="bg-slate-700 hover:bg-slate-600 transition-all px-4 py-2 rounded-xl text-sm"
          >
            Cancelar
          </button>

          <button
            onClick={handleSalvar}
            className="bg-cyan-500 hover:bg-cyan-400 transition-all px-4 py-2 rounded-xl text-sm font-semibold"
          >
            Salvar
          </button>

        </div>

      </div>

    </div>
  )
}

export default ModalEditar