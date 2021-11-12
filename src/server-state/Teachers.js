const { useClient } = require("context/AuthContext");
const { useQuery } = require("react-query");

function useTeachers(options = {}) {
    const client = useClient();

    const result = useQuery({
        queryKey: 'teachers',
        queryFn: () => client('teachers').then(data => data),
     
        ...options,
    },

    );

    var teacherData;
    if (result.status === 'success')
        teacherData = result?.data;

    return { ...result, teachers: teacherData?.teachers ?? [] }
}

function useUserStudent({options={},userId}){
    const client = useClient();

    const result = useQuery({
        queryKey: [`userStudents`,userId],
        queryFn: () => client(`teachers-users/${userId}`).then(data => data),

        ...options,
    },

    );

    var studentData;
    if (result.status === 'success')
    studentData = result?.data;


    return { ...result, students: studentData?.students ?? [] }
}

export {
    useTeachers,
    useUserStudent
}