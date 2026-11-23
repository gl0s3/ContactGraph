#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/90697b338ec81a8d55a5754a2bc0fd2e1a254899bffac58d290b12f749f633db/contract';
import endContract from '../../snapshots/90697b338ec81a8d55a5754a2bc0fd2e1a254899bffac58d290b12f749f633db/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  col,
  fn,
  foreignKey,
  primaryKey,
  sql,
  unique,
} from '@prisma/orm-sqlite/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        table: 'category_types',
        columns: [
          col('id', 'INTEGER PRIMARY KEY AUTOINCREMENT'),
          col('name', 'TEXT', { notNull: true, codecRef: { codecId: 'sqlite/text@1' } }),
        ],
        constraints: [unique(['name'])],
      }),
      this.createTable({
        table: 'contact_method_types',
        columns: [
          col('id', 'INTEGER PRIMARY KEY AUTOINCREMENT'),
          col('name', 'TEXT', { notNull: true, codecRef: { codecId: 'sqlite/text@1' } }),
        ],
        constraints: [unique(['name'])],
      }),
      this.createTable({
        table: 'contact_methods',
        columns: [
          col('contact_id', 'INTEGER', {
            notNull: true,
            codecRef: { codecId: 'sqlite/integer@1' },
          }),
          col('id', 'INTEGER PRIMARY KEY AUTOINCREMENT'),
          col('type_id', 'INTEGER', { notNull: true, codecRef: { codecId: 'sqlite/integer@1' } }),
          col('value', 'TEXT', { notNull: true, codecRef: { codecId: 'sqlite/text@1' } }),
        ],
        constraints: [
          foreignKey(['contact_id'], 'contacts', ['id']),
          foreignKey(['type_id'], 'contact_method_types', ['id']),
        ],
      }),
      this.createTable({
        table: 'contacts',
        columns: [
          col('address', 'TEXT', { codecRef: { codecId: 'sqlite/text@1' } }),
          col('categoryTypeId', 'INTEGER', { codecRef: { codecId: 'sqlite/integer@1' } }),
          col('created_at', 'TEXT', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'sqlite/datetime@1' },
          }),
          col('id', 'INTEGER PRIMARY KEY AUTOINCREMENT'),
          col('last_name', 'TEXT', { codecRef: { codecId: 'sqlite/text@1' } }),
          col('name', 'TEXT', { notNull: true, codecRef: { codecId: 'sqlite/text@1' } }),
          col('notes', 'TEXT', { codecRef: { codecId: 'sqlite/text@1' } }),
          col('second_name', 'TEXT', { codecRef: { codecId: 'sqlite/text@1' } }),
          col('updatedAt', 'TEXT', { notNull: true, codecRef: { codecId: 'sqlite/datetime@1' } }),
        ],
        constraints: [foreignKey(['categoryTypeId'], 'category_types', ['id'])],
      }),
      this.createTable({
        table: 'important_date_types',
        columns: [
          col('id', 'INTEGER PRIMARY KEY AUTOINCREMENT'),
          col('name', 'TEXT', { notNull: true, codecRef: { codecId: 'sqlite/text@1' } }),
        ],
        constraints: [unique(['name'])],
      }),
      this.createTable({
        table: 'important_dates',
        columns: [
          col('contact_id', 'INTEGER', {
            notNull: true,
            codecRef: { codecId: 'sqlite/integer@1' },
          }),
          col('id', 'INTEGER PRIMARY KEY AUTOINCREMENT'),
          col('notes', 'TEXT', { codecRef: { codecId: 'sqlite/text@1' } }),
          col('type_id', 'INTEGER', { notNull: true, codecRef: { codecId: 'sqlite/integer@1' } }),
          col('value', 'TEXT', { notNull: true, codecRef: { codecId: 'sqlite/datetime@1' } }),
        ],
        constraints: [
          foreignKey(['contact_id'], 'contacts', ['id']),
          foreignKey(['type_id'], 'important_date_types', ['id']),
        ],
      }),
      this.createTable({
        table: 'relation_types',
        columns: [
          col('id', 'INTEGER PRIMARY KEY AUTOINCREMENT'),
          col('name', 'TEXT', { notNull: true, codecRef: { codecId: 'sqlite/text@1' } }),
        ],
        constraints: [unique(['name'])],
      }),
      this.createTable({
        table: 'relations',
        columns: [
          col('created_at', 'TEXT', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'sqlite/datetime@1' },
          }),
          col('id1', 'INTEGER', { notNull: true, codecRef: { codecId: 'sqlite/integer@1' } }),
          col('id2', 'INTEGER', { notNull: true, codecRef: { codecId: 'sqlite/integer@1' } }),
          col('type_id', 'INTEGER', { notNull: true, codecRef: { codecId: 'sqlite/integer@1' } }),
          col('updatedAt', 'TEXT', { notNull: true, codecRef: { codecId: 'sqlite/datetime@1' } }),
        ],
        constraints: [
          primaryKey(['id1', 'id2', 'type_id']),
          foreignKey(['id1'], 'contacts', ['id']),
          foreignKey(['id2'], 'contacts', ['id']),
          foreignKey(['type_id'], 'relation_types', ['id']),
        ],
      }),
      this.createIndex({
        table: 'contact_methods',
        index: 'contact_methods_contact_id_idx_f6f6ad79',
        columns: ['contact_id'],
      }),
      this.createIndex({
        table: 'contact_methods',
        index: 'contact_methods_type_id_idx_907568e1',
        columns: ['type_id'],
      }),
      this.createIndex({
        table: 'contacts',
        index: 'contacts_categoryTypeId_idx_ff910a5e',
        columns: ['categoryTypeId'],
      }),
      this.createIndex({
        table: 'important_dates',
        index: 'important_dates_contact_id_idx_f6f6ad79',
        columns: ['contact_id'],
      }),
      this.createIndex({
        table: 'important_dates',
        index: 'important_dates_type_id_idx_907568e1',
        columns: ['type_id'],
      }),
      this.createIndex({
        table: 'relations',
        index: 'relations_id1_idx_fbe90e91',
        columns: ['id1'],
      }),
      this.createIndex({
        table: 'relations',
        index: 'relations_id2_idx_0229a7ab',
        columns: ['id2'],
      }),
      this.createIndex({
        table: 'relations',
        index: 'relations_type_id_idx_907568e1',
        columns: ['type_id'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
