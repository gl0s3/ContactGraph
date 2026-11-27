import express from "express";
import { createContact, getAllContacts, updateContact, deleteContact } from "./lib/contacts";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/contacts", async (req, res) => {
  try {
    const contacts = await getAllContacts();
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Ошибка при создании контакта:", error); // <-- Added logging
    res.status(500).json({ error: "Ошибка при создании контакта" });
  }
});

app.post("/contacts", async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Вы забыли передать JSON с данными!" });
    }

    const newContact = await createContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    console.error("ДЕТАЛИ ОШИБКИ:", error);
    res.status(500).json({ error: "Ошибка при создании контакта" });
  }
});

app.put("/contacts/:id", async (req, res) => {
  try {
    const id = Number(req.params.id); // Превращаем строку из URL в число
    const updatedContact = await updateContact(id, req.body);
    res.json(updatedContact);
  } catch {
    res.status(500).json({ error: "Ошибка при обновлении контакта" });
  }
});

app.delete("/contacts/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deletedContact = await deleteContact(id);
    res.json({ message: "Контакт удален", contact: deletedContact });
  } catch {
    res.status(500).json({ error: "Ошибка при удалении контакта" });
  }
});

const server = app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

server.on("error", (error) => {
  console.error("ОШИБКА СЕРВЕРА:", error);
});
