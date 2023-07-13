import prisma from '../lib/prisma';
import { User } from '../types/model/User';
import { UpdateProfileRequest } from '../types/requests/UpdateProfileRequest';
import { UserRegisterRequest } from '../types/requests/UserRegisterRequest';

const fetchUserById = async (id: number): Promise<User | null> => {
  const user: User | null = await prisma.user.findUnique({ where: { id } });
  return user;
};

const fetchUserByEmail = async (email: string): Promise<User | null> => {
  const user: User | null = await prisma.user.findUnique({ where: { email } });
  return user;
};

const createUser = async (args: UserRegisterRequest): Promise<void> => {
  await prisma.user.create({ data: args });
};

const updateUser = async (args: UpdateProfileRequest): Promise<void> => {
  const { id, name } = args;
  await prisma.user.update({ data: { name }, where: { id } });
};

const deleteUser = async (args: { id: number }): Promise<void> => {
  const { id } = args;
  await prisma.user.delete({ where: { id } });
};

export { fetchUserByEmail, fetchUserById, createUser, updateUser, deleteUser };
