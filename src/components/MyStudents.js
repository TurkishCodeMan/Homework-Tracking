/* eslint-disable no-unused-vars */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from "react"
import StudentCard from 'components/StudentCard';
import { Modal, ModalContents, ModalOpenButton, useModal } from 'shared/components/Modal/Modal';
import Calendar from 'react-calendar'
import { Listbox, ListboxOption } from 'shared/components/Dropdown/Dropdown';
import { useHomeworkCreate } from 'server-state/Homeworks'
import { useAuth } from 'context/AuthContext'
import { Spinner } from 'shared/components/lib';
import { useUserStudent } from 'server-state/Teachers';

function MyStudents() {
    const { user } = useAuth()

    const { students, isLoading } = useUserStudent({ userId: user.id })

    const [value, onChange] = React.useState(new Date());
    const [student, setStudent] = React.useState(null);

    const { mutateAsync: addHomework, isLoading: isLoadingAdd } = useHomeworkCreate(user.id)

    function handleSubmit(event) {
        event.preventDefault()
        const { subject } = event.target.elements
        console.log(student)
        addHomework({
            subject: subject.value,
            studentId: student,
            teacherId: user.id,
            completed: false,
            deadLine: value
        })
    }
    return (
        <div css={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
                <h2>My Students</h2>

                <ul css={{ display: 'flex' }}>

                    {isLoading
                        ? <Spinner />
                        : students.map((student) => {
                            return (
                                <StudentCard key={student.id} student={student} />
                            )
                        })
                    }
                </ul>
                {
                    students.length === 0 && 'Not Found Homeworks'
                }
            </div>

            <div>
                <Modal>
                    <ModalOpenButton>
                        <button css={{
                            padding: '12px',
                            background: 'var(--colors-item)',
                            borderRadius: '20px',
                            color: 'var(--colors-text)'

                        }} >Add Homework</button>
                    </ModalOpenButton>
                    <ModalContents title="Add Homework" aria-label="deneme">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="subject">
                                    <div>Subject</div>
                                    <input id="subject" />
                                </label>
                            </div>
                            <div>
                                <label htmlFor="calendar">
                                    <div>Deadline</div>
                                    <Calendar id="calendar"
                                        onChange={onChange}
                                        value={value} />
                                </label>
                            </div>
                            <div>
                                <Listbox
                                    onChange={setStudent}
                                    name="profiles"
                                    defaultValue="" arrow={<h1 css={{ padding: '0px' }}>Select Students ▼</h1>}
                                    css={{
                                        color: 'black',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                    aria-labelledby="my-detail">
                                    {
                                        students.map((student) => {
                                            return (
                                                <ListboxOption key={student.id} value={student.id}>
                                                    {student.name}
                                                </ListboxOption>
                                            )
                                        })
                                    }

                                </Listbox>
                            </div>

                            <button css={{ marginTop: '20px' }} type="submit">
                                {
                                    isLoadingAdd ? <Spinner /> : <span>Submit</span>
                                }

                            </button>
                        </form>
                    </ModalContents>
                </Modal>
            </div>
        </div>


    )
}

export default MyStudents