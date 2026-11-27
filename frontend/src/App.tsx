import { useEffect, useState, type FormEvent } from "react";
import "./App.css";

interface Contact {
  id: number;
  name: string;
  lastName?: string | null;
  address?: string | null;
  notes?: string | null;
}

interface ContactForm {
  name: string;
  lastName: string;
  address: string;
  notes: string;
}

const emptyForm: ContactForm = {
  name: "",
  lastName: "",
  address: "",
  notes: "",
};

export default function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [form, setForm] = useState<ContactForm>({ ...emptyForm });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // GET — получить все контакты
  function loadContacts() {
    return fetch("/contacts")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data: Contact[] = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Сервер вернул неверный формат данных");
        }

        setContacts(data);
        setError("");
      })
      .catch((err) => {
        console.error("Ошибка загрузки:", err);
        setError("Не удалось загрузить контакты");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // Загрузка при открытии страницы
  useEffect(() => {
    void loadContacts();
  }, []);

  // POST / PUT — добавить или изменить контакт
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim()) return;

    const isEditing = editingId !== null;

    const url = isEditing ? `/contacts/${editingId}` : "/contacts";

    setSaving(true);

    try {
      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          lastName: form.lastName.trim(),
          address: form.address.trim(),
          notes: form.notes.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      cancel();
      setLoading(true);
      await loadContacts();
    } catch (err) {
      console.error("Ошибка сохранения:", err);
      setError("Не удалось сохранить контакт");
    } finally {
      setSaving(false);
    }
  }

  // Заполнить форму для редактирования
  function edit(contact: Contact) {
    setEditingId(contact.id);

    setForm({
      name: contact.name,
      lastName: contact.lastName ?? "",
      address: contact.address ?? "",
      notes: contact.notes ?? "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Очистить форму
  function cancel() {
    setEditingId(null);
    setForm({ ...emptyForm });
  }

  // DELETE — удалить контакт
  async function remove(id: number) {
    if (!window.confirm("Удалить контакт?")) return;

    try {
      const response = await fetch(`/contacts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      if (editingId === id) cancel();

      setLoading(true);
      await loadContacts();
    } catch (err) {
      console.error("Ошибка удаления:", err);
      setError("Не удалось удалить контакт");
    }
  }

  return (
    <main className="container">
      <header>
        <h1>ContactGraph</h1>
        <p>Управление контактами</p>
      </header>

      <section>
        <h2>{editingId === null ? "Добавить контакт" : "Редактировать контакт"}</h2>

        <form onSubmit={save}>
          <div className="fields">
            <input
              placeholder="Имя *"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              placeholder="Фамилия"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            />

            <input
              placeholder="Адрес"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />

            <input
              placeholder="Заметки"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>

          <div className="buttons">
            <button type="submit" disabled={saving}>
              {saving ? "Сохранение..." : editingId === null ? "Добавить" : "Сохранить"}
            </button>

            {editingId !== null && (
              <button type="button" onClick={cancel}>
                Отмена
              </button>
            )}
          </div>
        </form>
      </section>

      <section>
        <h2>Контакты ({contacts.length})</h2>

        {error && (
          <p
            role="alert"
            style={{
              color: "red",
              marginBottom: 16,
            }}
          >
            {error}
          </p>
        )}

        <div style={{ marginBottom: 16 }}>
          <button type="button" onClick={() => void loadContacts()} disabled={loading}>
            Обновить список
          </button>
        </div>

        {loading ? (
          <p>Загрузка контактов...</p>
        ) : contacts.length === 0 ? (
          <p>Контактов пока нет.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Имя</th>
                <th>Адрес</th>
                <th>Заметки</th>
                <th>Действия</th>
              </tr>
            </thead>

            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.id}</td>

                  <td>
                    {contact.name} {contact.lastName ?? ""}
                  </td>

                  <td>{contact.address || "—"}</td>
                  <td>{contact.notes || "—"}</td>

                  <td className="actions">
                    <button type="button" title="Редактировать" onClick={() => edit(contact)}>
                      ✎
                    </button>

                    <button type="button" title="Удалить" onClick={() => void remove(contact.id)}>
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}
