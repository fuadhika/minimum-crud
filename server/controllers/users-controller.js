import { connection } from "../db.js";

export const getUserProfile = async (req, res) => {
  const id = req.user.id;

  try {
    const [user] = await connection.query(
      "SELECT id, name, birthday, email FROM users WHERE id = ?",
      [id]
    );

    res.status(200).json({ data: user[0] });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const id = req.user.id;
  const { name, birthday, email } = req.body;

  try {
    await connection.query(
      "UPDATE users SET name = ?, birthday = ?, email = ? WHERE id = ?",
      [name, birthday, email, id]
    );

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.user.id;

  try {
    await connection.query("DELETE FROM users WHERE id = ?", [id]);

    res
      .clearCookie("token")
      .status(200)
      .json({ message: "User deleted successfully" });
  } catch (error) {
    res.json({ message: error.message });
  }
};
