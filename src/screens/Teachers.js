/* eslint-disable no-unused-vars */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from "react"
import { useTeachers } from "server-state/Teachers"
import TeacherCard from 'components/TeacherCard';
function TeacherScreen() {
    const { teachers } = useTeachers()
    return (

        <>
         

            <ul css={{
                margin:'0px',
                padding:'20px',
                display:'flex',

        }}>
                {
                    teachers.map((teacher) => {
                        return (
                         <TeacherCard key={teacher.id} teacher={teacher}/>
                        )
                    }

                    )
                }
            </ul>
        </>
    )
}

export default TeacherScreen