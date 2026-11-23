import sqlite from "@prisma/orm-sqlite/runtime";
import type { Contract } from "../../prisma/contract.d";
import contractJson from "../../prisma/contract.json" with {
  type: "json",
};

export const db = sqlite<Contract>({
  contractJson,
  path: "./contacts.db",
});
