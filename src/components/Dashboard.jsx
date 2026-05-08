function Dashboard({ transacoes }) {

  const entradas = transacoes
    .filter((t) => t.tipo === 'entrada')
    .reduce((acc, item) => acc + Number(item.valor), 0)

  const saidas = transacoes
    .filter((t) => t.tipo === 'saida')
    .reduce((acc, item) => acc + Number(item.valor), 0)

  const saldo = entradas - saidas

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">

        <p className="text-slate-400 mb-2">
          Entradas
        </p>

        <h2 className="text-4xl font-bold text-green-400">
          R$ {entradas.toFixed(2)}
        </h2>

      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">

        <p className="text-slate-400 mb-2">
          Gastos
        </p>

        <h2 className="text-4xl font-bold text-red-400">
          R$ {saidas.toFixed(2)}
        </h2>

      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">

        <p className="text-slate-400 mb-2">
          Saldo Atual
        </p>

        <h2 className={`text-4xl font-bold ${saldo >= 0 ? 'text-cyan-400' : 'text-red-400'}`}>
          R$ {saldo.toFixed(2)}
        </h2>

      </div>

    </div>
  )
}

export default Dashboard