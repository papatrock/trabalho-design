const pagamentoService = require('../services/PagamentoService');

class PagamentoController {

  async processarPagamento(req, res) {
    try {
      return res.status(501).json({ message: "wip" });
    } catch (error) {
      return res.status(500).json({ error: "Erro interno" });
    }
  }

  async buscarPagamentoPorId(req, res) {
    try {
      const {id} = req.params;

      const pagamento = await pagamentoService.buscarPorId(id);

      if(!pagamento){
          return res.status(404).json({error: 'Pagamento não encontrado'});
      }

      return res.json({pagamento});

    } catch (error) {
        return res.status(500).json({ error: "Erro interno" });
    }
  }

  async estornarPagamento(req, res) {
    try {
      return res.status(501).json({ message: "wip" });
    } catch (error) {
      return res.status(500).json({ error: "Erro interno" });
    }
  }
}

module.exports = new PagamentoController();