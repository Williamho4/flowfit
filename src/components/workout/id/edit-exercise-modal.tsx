'use client'

import { Exercise } from '@/lib/types'
import styles from '@/styles/edit-exercise-modal.module.css'
import Image from 'next/image'
import image from '@/../public/graypic.png'
import { useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { createSet, deleteSet, editSet } from '@/lib/workout-server-utils'
import SetForm from './set-form'

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
  const [selectedSetId, setSelectedSetId] = useState(0)
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
    setEditActive(false)
    setWeight(0)
    setReps(0)
  }

  async function handleAddSet(reps: number, weight: number) {
    if (!checkIfPostiveNumber(reps) || !checkIfPostiveNumber(weight)) {
      return
    }

    try {
      await createSet(
        selectedExercise!.id,
        reps,
        weight,
        selectedExercise!.workoutId
      )
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

  async function handleDeleteSet(setId: number) {
    try {
      await deleteSet(setId, selectedExercise!.workoutId)
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

  async function handleEditSet(reps: number, weight: number, setId: number) {
    if (!checkIfPostiveNumber(reps) || !checkIfPostiveNumber(weight)) {
      return
    }

    try {
      await editSet(setId, reps, weight, selectedExercise!.workoutId)
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

          <div className={styles['stats-list']}>
            {selectedExercise.sets.map((set, index) => (
              <div key={set.id} className={styles['stats-container']}>
                Set {index + 1} <span>Reps:{set.reps}</span>{' '}
                <span>Weight:{set.weight}</span>
                <button
                  className={styles['edit-button']}
                  type="button"
                  onClick={() => {
                    setSelectedSetId(set.id)
                    setReps(set.reps)
                    setWeight(set.weight)
                    setEditActive(true)
                    setAddSetActive(false)
                  }}
                >
                  edit
                </button>
                <button
                  className={styles['delete-button']}
                  type="button"
                  onClick={() => handleDeleteSet(set.id)}
                >
                  <IoIosClose />
                </button>
              </div>
            ))}
          </div>
          {!addSetActive && !editActive && (
            <button
              onClick={() => {
                setAddSetActive(true), setEditActive(false)
              }}
              className={styles['add-button']}
            >
              Add set
            </button>
          )}

          {addSetActive && (
            <SetForm
              handleAddSet={handleAddSet}
              setAddSetActive={setAddSetActive}
            />
          )}

          {editActive && (
            <SetForm
              handleEditSet={handleEditSet}
              setId={selectedSetId}
              setEditActive={setEditActive}
            />
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
