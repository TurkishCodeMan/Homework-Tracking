const { useClient } = require("context/AuthContext");
const { useQuery } = require("react-query");

function useStudents(options = {}) {
    const client = useClient();

    const result = useQuery({
        queryKey: 'students',
        queryFn: () => client('students').then(data => data),

        ...options,
    },

    );

    var studentData;
    if (result.status === 'success')
        studentData = result?.data;

    return { ...result, students: studentData?.students ?? [] }
}





export {
    useStudents,
}