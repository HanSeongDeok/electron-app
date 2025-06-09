import type { User } from "../model/user.model";

export async function getUser(): Promise<User> {
  return { name: 'Han', role: 'Creater' };
}
