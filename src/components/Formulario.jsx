import { useState } from 'react'

function Formulario({ adicionarTransacao }) {

  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [tipo, setTipo] = useState('saida')
  const [categoria, setCategoria] = useState('Casa')

  const dataAtual = new Date()

  const mesAtual = dataAtual.toLocaleString('pt-BR', {
    month: 'long',
    year: 'numeric'
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!descricao || !valor) {
      return
    }

    adicionarTransacao({
      id: Date.now(),
      descricao,
      valor,
      tipo,
      categoria,
      mes: mesAtual
    })

    setDescricao('')
    setValor('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-8"
    >

      <h2 className="text-2xl font-bold mb-6">
        Nova Transação
      </h2>

      <div className="grid md:grid-cols-4 gap-4">

        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-2xl p-4 outline-none"
        />

        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-2xl p-4 outline-none"
        />

        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-2xl p-4"
        >
          <option value="entrada">
            Entrada
          </option>

          <option value="saida">
            Gasto
          </option>
        </select>

        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-2xl p-4"
        >
          <option>Casa</option>
          <option>Mercado</option>
          <option>Carro</option>
          <option>Lazer</option>
          <option>Investimento</option>
          <option>Contas</option>
        </select>

      </div>

      <button
        type="submit"
        className="mt-6 bg-cyan-500 hover:bg-cyan-400 transition-all px-8 py-4 rounded-2xl font-semibold"
      >
        Adicionar Transação
      </button>

    </form>
  )
}

export default Formulario