import { db } from "../../prisma/db";

export async function createContact(data: {
  name: string;
  secondName?: string;
  lastName?: string;
  categoryTypeId?: number;
  address?: string;
  notes?: string;
}) {
  return await db.orm.Contact.create(data);
}

export async function getAllContacts() {
  return await db.orm.Contact
    .include("category")
    .include("contactMethods", (methods) =>
      methods.include("type")
    )
    .orderBy((contact) => contact.name.asc())
    .all();
}

export async function updateContact(
  id: number,
  data: {
    name?: string;
    secondName?: string;
    lastName?: string;
    categoryTypeId?: number;
    address?: string;
    notes?: string;
  }
) {
  return await db.orm.Contact
    .where({ id })
    .update(data);
}

export async function deleteContact(id: number) {
  return await db.orm.Contact
    .where({ id })
    .delete();
}
