import { query } from "../../lib/db";

export default async function handler(req, res) {
  const { filter } = req.query;

  let sqlQuery = `SELECT SUM(count_num) as count, name FROM interaction_logs WHERE name IN ('start', 'interaction', 'shop_click') GROUP BY name;
 `;
  if (filter) {
    sqlQuery = `SELECT SUM(count_num) as count,${filter}, name FROM interaction_logs WHERE name IN ('start', 'interaction', 'shop_click') GROUP BY name, ${filter};`;
  }
  try {
    const result = await query(sqlQuery);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Database query error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
