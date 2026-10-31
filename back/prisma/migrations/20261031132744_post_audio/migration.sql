-- CreateEnum
CREATE TYPE "AudioStatus" AS ENUM ('NONE', 'PENDING', 'READY', 'FAILED');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "audioError" TEXT,
ADD COLUMN     "audioHash" TEXT,
ADD COLUMN     "audioStatus" "AudioStatus" NOT NULL DEFAULT 'NONE',
ADD COLUMN     "audioTimeline" JSONB,
ADD COLUMN     "audioUrl" TEXT;
