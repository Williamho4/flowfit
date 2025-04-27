/*
  Warnings:

  - You are about to drop the column `reps` on the `WorkoutExercise` table. All the data in the column will be lost.
  - You are about to drop the column `sets` on the `WorkoutExercise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WorkoutExercise" DROP COLUMN "reps",
DROP COLUMN "sets";

-- CreateTable
CREATE TABLE "WorkoutExerciseSet" (
    "id" SERIAL NOT NULL,
    "workoutExerciseId" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,

    CONSTRAINT "WorkoutExerciseSet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkoutExerciseSet" ADD CONSTRAINT "WorkoutExerciseSet_workoutExerciseId_fkey" FOREIGN KEY ("workoutExerciseId") REFERENCES "WorkoutExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
