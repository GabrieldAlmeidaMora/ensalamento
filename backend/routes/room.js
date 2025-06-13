import createConnnection from "../connection";

export const getRooms = async (req, res) => {
  try {
    const connection = await createConnnection();
    const [salas] = await connection.query(`
      SELECT s.id, s.nome, s.data_criacao, s.data_atualizacao, 
             st.nome as status, st.descricao as status_descricao
      FROM salas s
      JOIN status_sala st ON s.status_id = st.id
    `);
    connection.end();
    res.json(salas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addRoom = async (req, res) => {
  const { nome, status_id } = req.body;
  try {
    const connection = await createConnnection();
    const [result] = await connection.query(
      'INSERT INTO salas (nome, status_id) VALUES (?, ?)',
      [nome, status_id]
    );
    connection.end();
    res.json({ id: result.insertId, message: 'Sala criada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editRoom = async (req, res) => {
  const { id } = req.params;
  const { nome, status_id } = req.body;
  try {
    const connection = await createConnnection();
    await connection.query(
      'UPDATE salas SET nome = ?, status_id = ? WHERE id = ?',
      [nome, status_id, id]
    );
    connection.end();
    res.json({ message: 'Sala atualizada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await createConnnection();
    await connection.query('DELETE FROM salas WHERE id = ?', [id]);
    connection.end();
    res.json({ message: 'Sala removida com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}