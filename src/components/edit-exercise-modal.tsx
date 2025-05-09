'use client'

import { Exercise, InputSet } from '@/lib/types'
import styles from '@/styles/edit-exercise-modal.module.css'
import Image from 'next/image'
import image from '@/../public/graypic.png'
import MultiSteps from './multi-steps'
import { useEffect, useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { createSet } from '@/lib/server-utils'

type ModalProps = {
  onClose: () => void
  selectedExercise: Exercise | null
}

export default function EditExerciseModal({
  onClose,
  selectedExercise,
}: ModalProps) {
  const [step, setStep] = useState(1)
  const [totalSets, setTotalSets] = useState<InputSet[] | []>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (selectedExercise?.sets?.length ?? 0 >= 0) {
      setStep(0)
    } else {
      setStep(1)
    }
  }, [selectedExercise])

  const handleChange = (
    index: number,
    field: 'reps' | 'weight',
    value: number
  ) => {
    const newSets = [...totalSets]
    totalSets[index][field] = value
    setTotalSets(newSets)
  }

  const confirmSets = async () => {
    if (!selectedExercise) {
      return
    }

    totalSets.map((set) => {
      createSet(
        selectedExercise.id,
        set.reps,
        set.weight,
        selectedExercise.workoutId
      )
    })

    setTotalSets([])
    onClose()
  }

  return (
    <div
      className={`${styles.modal} ${
        selectedExercise ? styles['display-block'] : styles['display-none']
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
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
          {step === 0 && (
            <>
              {selectedExercise.sets?.map((set, index) => (
                <div key={set.id} className={styles.sets}>
                  {`Set ${index + 1}`}
                  <p>Reps {set.reps}</p>
                  <p>Weight {set.weight}</p>
                </div>
              ))}
            </>
          )}
          {step === 1 && (
            <>
              <label>How many sets</label>
              <input
                min="1"
                max="5"
                type="number"
                onChange={(e) => {
                  const count = Math.min(Number(e.target.value || '0'), 5)
                  const newSets = Array.from({ length: count }, () => ({
                    reps: 0,
                    weight: 0,
                  }))
                  setTotalSets(newSets)
                }}
              />
            </>
          )}
          {step === 2 && (
            <>
              {totalSets.map((set, index) => (
                <div className={styles.set__container} key={index}>
                  <label>Set {index + 1}</label>
                  <form className={styles.sets}>
                    <label>Reps</label>
                    <input
                      min="0"
                      type="number"
                      name="reps"
                      value={set.reps}
                      onChange={(e) =>
                        handleChange(index, 'reps', Number(e.target.value))
                      }
                    />
                    <label>Weight</label>
                    <input
                      min="0"
                      type="number"
                      name="weight"
                      value={set.weight}
                      onChange={(e) =>
                        handleChange(index, 'weight', Number(e.target.value))
                      }
                    />
                  </form>
                </div>
              ))}
              <button onClick={confirmSets}>Confirm Sets</button>
            </>
          )}
          <MultiSteps
            step={step}
            setStep={setStep}
            setError={setError}
            totalSets={totalSets}
          />
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
