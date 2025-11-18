import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { users, contacts, type User, type InsertUser, type Contact, type InsertContact } from '@shared/schema';
import { eq } from 'drizzle-orm';
import type { IStorage } from './storage';

export class DatabaseStorage implements IStorage {
  private db: ReturnType<typeof drizzle>;

  constructor(databaseUrl: string) {
    const sql = neon(databaseUrl);
    this.db = drizzle(sql);
  }

  async getUser(id: number): Promise<User | undefined> {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);
    
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await this.db
      .insert(users)
      .values(user)
      .returning();

    return result[0];
  }

  // Contact methods
  async createContact(contact: InsertContact): Promise<Contact> {
    const result = await this.db
      .insert(contacts)
      .values(contact)
      .returning();

    return result[0];
  }

  async getAllContacts(): Promise<Contact[]> {
    return await this.db
      .select()
      .from(contacts)
      .orderBy(contacts.createdAt);
  }

  async getContact(id: number): Promise<Contact | undefined> {
    const result = await this.db
      .select()
      .from(contacts)
      .where(eq(contacts.id, id))
      .limit(1);

    return result[0];
  }
}

// Export storage instance based on environment
export const storage = process.env.DATABASE_URL
  ? new DatabaseStorage(process.env.DATABASE_URL)
  : null; // Will use in-memory storage if no DATABASE_URL