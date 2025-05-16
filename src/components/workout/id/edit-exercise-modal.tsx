'use client'

import { Exercise } from '@/lib/types'
import styles from '@/styles/edit-exercise-modal.module.css'
import Image from 'next/image'
import image from '@/../public/graypic.png'
import { useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { createSet, deleteSet, editSet } from '@/lib/workout-server-utils'

type ModalProps = {
  onClose: () => void
  selectedExercise: Exercise | null
}

export default function EditExerciseModal({
  onClose,
  selectedExercise,
}: ModalProps) {
  const [addSetActive, setAddSetActive] = useState(false)
  const [editActive, setEditActive] = useState(false)
  const [setId, setSetId] = useState(0)
  const [reps, setReps] = useState(0)
  const [weight, setWeight] = useState(0)
  const [error, setError] = useState<string | null>(null)

  function checkIfPostiveNumber(number: number) {
    if (number < 0) {
      setError('Must be positive number')
      return false
    }

    return true
  }

  function resetForms() {
    setError(null)
    setAddSetActive(false)
    setWeight(0)
    setReps(0)
  }

  async function handleAddSet(
    reps: number,
    weight: number,
    exerciseId: number,
    workoutId: number
  ) {
    if (!checkIfPostiveNumber(reps) || !checkIfPostiveNumber(weight)) {
      return
    }

    try {
      await createSet(exerciseId, reps, weight, workoutId)
      onClose()
      return resetForms()
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Something went wrong')
      }
    }
  }

  async function handleDeleteSet(setId: number, workoutId: number) {
    if (!confirm('Are you sure')) {
      return
    }

    try {
      await deleteSet(setId, workoutId)
      onClose()
      return resetForms()
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Something went wrong')
      }
    }
  }

  async function handleEditSet(
    setId: number,
    reps: number,
    weight: number,
    workoutId: number
  ) {
    if (!checkIfPostiveNumber(reps) || !checkIfPostiveNumber(weight)) {
      return
    }

    try {
      await editSet(setId, reps, weight, workoutId)
      onClose()
      setEditActive(false)
      return resetForms()
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Something went wrong')
      }
    }
  }

  return (
    <div
      className={`${styles.modal} ${
        selectedExercise ? styles['display-block'] : styles['display-none']
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
          resetForms()
        }
      }}
    >
      {selectedExercise && (
        <div className={styles.main}>
          <div className={styles.head}>
            <h1>{selectedExercise?.baseExercise.name}</h1>
          </div>
          <Image
            src={
              selectedExercise.baseExercise.imgUrl
                ? selectedExercise.baseExercise.imgUrl
                : image
            }
            width={200}
            height={200}
            alt="Exercise-Image"
          />

          <div>
            {selectedExercise.sets.map((set, index) => (
              <div key={set.id}>
                Set {index + 1} <span>Reps:{set.reps}</span>{' '}
                <span>Weight:{set.weight}</span>
                <button
                  type="button"
                  onClick={() =>
                    handleDeleteSet(set.id, selectedExercise.workoutId)
                  }
                >
                  <IoIosClose />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSetId(set.id)
                    setReps(set.reps)
                    setWeight(set.weight)
                    setEditActive(true)
                  }}
                >
                  edit
                </button>
              </div>
            ))}
          </div>
          {!addSetActive && (
            <button onClick={() => setAddSetActive(true)}>Add set</button>
          )}

          {addSetActive && (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleAddSet(
                  reps,
                  weight,
                  selectedExercise.id,
                  selectedExercise.workoutId
                )
              }}
            >
              <label>reps</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={reps}
                onChange={(e) => setReps(Number(e.target.value))}
              />
              <label>weight</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
              />
              <button type="submit">Add</button>
            </form>
          )}

          {editActive && (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleEditSet(setId, reps, weight, selectedExercise.workoutId)
              }}
            >
              <label>reps</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={reps}
                onChange={(e) => setReps(Number(e.target.value))}
              />
              <label>weight</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
              />
              <button type="submit">Confirm</button>
              <button type="button" onClick={() => setEditActive(false)}>
                <IoIosClose />
              </button>
            </form>
          )}

          {error && <p>{error}</p>}
          <button
            type="button"
            className={styles['close-button']}
            onClick={onClose}
          >
            <IoIosClose />
          </button>
        </div>
      )}
    </div>
  )
}
