-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BookMark" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "categoryId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "BookMark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BookMark" ("categoryId", "createdAt", "id", "productId", "userId") SELECT "categoryId", "createdAt", "id", "productId", "userId" FROM "BookMark";
DROP TABLE "BookMark";
ALTER TABLE "new_BookMark" RENAME TO "BookMark";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
