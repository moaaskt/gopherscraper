-- CreateTable
CREATE TABLE "Produto" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "precoAlvo" DOUBLE PRECISION NOT NULL,
    "precoAtual" TEXT,
    "titulo" TEXT DEFAULT 'Aguardando o Go buscar...',

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);
