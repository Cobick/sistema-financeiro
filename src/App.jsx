import { useEffect, useState } from 'react'
import MesCard from './components/MesCard'

function App() {

  const meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ]

  const [mesSelecionado, setMesSelecionado] = useState('Janeiro')

  const [transacoes, setTransacoes] = useState(() => {
    const dados = localStorage.getItem('transacoes')
    return dados ? JSON.parse(dados) : []
  })

  useEffect(() => {
    localStorage.setItem('transacoes', JSON.stringify(transacoes))
  }, [transacoes])

  const adicionarTransacao = (transacao) => {
    setTransacoes([...transacoes, transacao])
  }

  const removerTransacao = (id) => {
    const novas = transacoes.filter((t) => t.id !== id)
    setTransacoes(novas)
  }

  const editarTransacao = (transacaoAtualizada) => {

    const novas = transacoes.map((t) =>
      t.id === transacaoAtualizada.id
        ? transacaoAtualizada
        : t
    )

    setTransacoes(novas)
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">

      <div className="max-w-6xl mx-auto p-4 md:p-6">

        {/* HEADER */}

        <div className="mb-4">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-xl md:text-3xl font-black leading-tight">
                💰 Controle de Finanças
              </h1>

            </div>

            <div className="hidden md:flex items-center gap-2">

              <div className="bg-slate-800 border border-slate-700 px-3 py-2 rounded-xl">

                <p className="text-[10px] text-slate-400">
                  Entrada Total
                </p>

                <h3 className="text-green-400 text-sm font-bold">
                  R$ 10000
                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* MESES */}

        <div className="flex gap-2 overflow-x-auto pb-3 mb-4">

          {meses.map((mes) => (

            <button
              key={mes}
              onClick={() => setMesSelecionado(mes)}
              className={`px-4 py-2 text-sm rounded-xl font-semibold whitespace-nowrap transition-all ${
                mesSelecionado === mes
                  ? 'bg-cyan-500 text-black'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {mes}
            </button>

          ))}

        </div>

        {/* CARD */}

        <MesCard
          mes={mesSelecionado}
          transacoes={transacoes.filter(
            (t) => t.mes === mesSelecionado
          )}
          adicionarTransacao={adicionarTransacao}
          removerTransacao={removerTransacao}
          editarTransacao={editarTransacao}
        />

      </div>

    </div>
  )
}

export default App