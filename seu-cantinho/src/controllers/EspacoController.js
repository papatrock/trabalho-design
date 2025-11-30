const espacoService = require('../services/EspacoService');

class EspacoController {

  async buscarEspacos(req, res) {
      const espacos = await espacoService.buscarTodos();
      return res.json({ espacos });
  }

  async buscarEspacoPorId(req, res) {
      const { id } = req.params;
    const espaco = await espacoService.buscarPorId(id);
    if (!espaco){
        return res.status(404).json({ error: "Espaço não encontrado" });
    }
    return res.json({ espaco });
  }

  async criarEspaco(req, res) {
      try {
          const dadosEspaco = req.body;

          const novoEspaco = await espacoService.criarEspaco(dadosEspaco);

          return res.status(201).json({
              success: true,
              message: "Espaço criado com sucesso!",
              data: novoEspaco
          });

      } catch (error) {
          return res.status(500).json({ error: "Erro interno" });
      }
  }

  async atualizarEspaco(req, res) {
    try {
      const { id } = req.params;
      const dados = req.body;

      const espacoAtualizado = await espacoService.atualizarEspaco(id, dados);

      return res.json({
        success: true,
        message: "Atualizado com sucesso.",
        data: espacoAtualizado
      });

    } catch (error) {
        return res.status(500).json({ error: "Erro interno" });
    }
  }

  async deletarEspaco(req, res) {
    try {
      const { id } = req.params;

      await espacoService.deletarEspaco(id);
      return res.json({ success: true, message: "Espaço deletado com sucesso." });
    } catch (error) {
        return res.status(500).json({ error: "Erro interno" });
    }
}
}

module.exports = new EspacoController();