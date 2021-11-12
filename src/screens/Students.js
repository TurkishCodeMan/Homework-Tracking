/* eslint-disable no-unused-vars */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from "react"
import { useStudents } from "server-state/Students"
import StudentCard from 'components/StudentCard';

function TeacherScreen() {
    const { students } = useStudents()
    return (

        <>
           

            <ul css={{
                margin:'0px',
                padding:'20px',
                display:'flex',

        }}>
                {
                    students.map((student) => {
                        return (
                           <StudentCard key={student.id} student={student}/>
                        )
                    }

                    )
                }
            </ul>
        </>
    )
}

export default TeacherScreen