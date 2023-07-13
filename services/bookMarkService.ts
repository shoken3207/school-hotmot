import prisma from '../lib/prisma';
import { BookMark } from '../types/model/BookMark';

const fetchBookMarkById = async (id: number): Promise<BookMark | null> => {
  const bookMark: BookMark | null = await prisma.bookMark.findUnique({
    where: { id },
  });
  return bookMark;
};

const fetchBookMark = async (args: {
  productId: number;
  userId: number;
}): Promise<BookMark | null> => {
  const { productId, userId } = args;
  const bookMark: BookMark | null = await prisma.bookMark.findFirst({
    where: { productId, userId },
  });
  return bookMark;
};

const fetchBookMarksByUserId = async (userId: number): Promise<BookMark[]> => {
  const bookMarks: BookMark[] = await prisma.bookMark.findMany({
    where: { userId },
  });
  return bookMarks;
};

const fetchCategoryBookMarksByUserId = async (args: {
  userId: number;
  categoryId: number;
}): Promise<BookMark[]> => {
  const { userId, categoryId } = args;
  const bookMarks: BookMark[] = await prisma.bookMark.findMany({
    where: { userId, categoryId },
  });
  return bookMarks;
};

const createBookMark = async (args: {
  userId: number;
  productId: number;
}): Promise<void> => {
  await prisma.bookMark.create({ data: args });
};

const deleteBookMark = async (args: { id: number }): Promise<void> => {
  const { id } = args;
  await prisma.bookMark.delete({ where: { id } });
};

export {
  fetchBookMarksByUserId,
  fetchCategoryBookMarksByUserId,
  fetchBookMark,
  fetchBookMarkById,
  createBookMark,
  deleteBookMark,
};
