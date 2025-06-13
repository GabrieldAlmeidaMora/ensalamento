import createConnnection from "../connection";

export const getStatusRoom = async (req, res) => {
  try {
    const connection = await createConnnection();
    const [status] = await connection.query('SELECT * FROM status_sala');
    connection.end();
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}