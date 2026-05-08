import { useState } from 'react'
import ModalEditar from './ModalEditar'

function MesCard({
  mes,
  transacoes,
  adicionarTransacao,
  removerTransacao,
  editarTransacao
}) {

  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [periodo, setPeriodo] = useState('05')

  const contasDia5 = transacoes.filter(
    (t) => t.periodo === '05'
  )

  const contasDia20 = transacoes.filter(
    (t) => t.periodo === '20'
  )

  const totalDia5 = contasDia5.reduce(
    (acc, item) => acc + Number(item.valor),
    0
  )

  const totalDia20 = contasDia20.reduce(
    (acc, item) => acc + Number(item.valor),
    0
  )

  const saldoDia5 = 5000 - totalDia5
  const saldoDia20 = 5000 - totalDia20

  const adicionar = () => {

    if (!descricao || !valor) return

    adicionarTransacao({
      id: Date.now(),
      descricao,
      valor,
      categoria: 'Conta',
      tipo: 'saida',
      mes,
      periodo
    })

    setDescricao('')
    setValor('')
    setPeriodo('05')
  }

  const [editando, setEditando] = useState(null)

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 md:p-4 shadow-2xl flex flex-col justify-between">

      <div>

        {/* HEADER */}

        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-4">

          <div>

            <h2 className="text-lg md:text-xl font-bold">
              {mes}
            </h2>

            <p className="text-slate-400 text-xs mt-1">
              {transacoes.length} lançamentos
            </p>

          </div>

        </div>

        {/* SALÁRIOS */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">

          <div className="bg-slate-800 rounded-xl p-3 md:p-4 border border-slate-700">

            <p className="text-slate-400 text-xs mb-1">
              💵 Dia 05
            </p>

            <h3 className="text-green-400 text-lg font-bold">
              R$ 5000
            </h3>

            <p
              className={`mt-2 text-sm md:text-base font-black ${
                saldoDia5 >= 0
                  ? 'text-green-400'
                  : 'text-red-400'
              }`}
            >
              {saldoDia5 >= 0 ? '+' : ''}
              R$ {saldoDia5.toFixed(2)}
            </p>

          </div>

          <div className="bg-slate-800 rounded-xl p-3 md:p-4 border border-slate-700">

            <p className="text-slate-400 text-xs mb-1">
              💵 Dia 20
            </p>

            <h3 className="text-green-400 text-lg font-bold">
              R$ 5000
            </h3>

            <p
              className={`mt-2 text-sm md:text-base font-black ${
                saldoDia20 >= 0
                  ? 'text-green-400'
                  : 'text-red-400'
              }`}
            >
              {saldoDia20 >= 0 ? '+' : ''}
              R$ {saldoDia20.toFixed(2)}
            </p>

          </div>

        </div>

        {/* LANÇAMENTOS */}

        <div className="space-y-2 mb-4 max-h-[260px] overflow-auto pr-1">

          {transacoes.map((t) => (

            <div
              key={t.id}
              className="bg-slate-800 rounded-xl p-2 md:p-3 border border-slate-700"
            >

              <div className="flex flex-col md:flex-row justify-between md:items-start gap-3">

                <div className="flex-1">

                  <div className="flex items-center gap-2 flex-wrap">

                    <h3 className="font-semibold text-sm">
                      {t.descricao}
                    </h3>

                    <span className="bg-slate-700 px-2 py-1 rounded-lg text-[10px] text-slate-300">
                      Dia {t.periodo}
                    </span>

                  </div>

                  <p className="text-red-400 mt-1 text-sm font-semibold">
                    R$ {Number(t.valor).toFixed(2)}
                  </p>

                </div>

                <div className="flex gap-1 mt-2 md:mt-0">

                  <button
                    onClick={() => setEditando(t)}
                    className="bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-400 px-2 py-1 rounded-lg text-[11px] md:text-xs transition-all"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => removerTransacao(t.id)}
                    className="bg-red-500/20 hover:bg-red-500/40 text-red-400 px-2 py-1 rounded-lg text-[11px] md:text-xs transition-all"
                  >
                    X
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* FORM */}

      <div>

        <div className="space-y-2 mb-4">

          <input
            type="text"
            placeholder="Nova conta"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm outline-none"
          />

          <input
            type="number"
            placeholder="Valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm outline-none"
          />

          <select
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm outline-none"
          >

            <option value="05">
              Conta do dia 05
            </option>

            <option value="20">
              Conta do dia 20
            </option>

          </select>

          <button
            onClick={adicionar}
            className="w-full bg-cyan-500 hover:bg-cyan-400 transition-all rounded-xl py-3 text-sm font-semibold"
          >
            Adicionar Lançamento
          </button>

        </div>

      </div>

      {editando && (
        <ModalEditar
          transacao={editando}
          fechar={() => setEditando(null)}
          salvar={editarTransacao}
        />
      )}

    </div>
  )
}

export default MesCard