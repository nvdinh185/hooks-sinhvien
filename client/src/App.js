import axios from 'axios';
import { useEffect, useState } from 'react';
import Student from './components/Student';
import FormInput from './components/FormInput';

const studentsApi = 'http://localhost:3001/students';

const App = () => {

    const [listStudents, setListStudents] = useState([]);
    const [error, setError] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState(
        {
            id: '',
            name: "",
            address: ""
        });

    useEffect(() => {
        async function fetchData() {
            try {
                let result = await axios(studentsApi);
                setListStudents(result.data);
            } catch (err) {
                setError('Xảy ra lỗi khi lấy dữ liệu!');
            }
        }
        fetchData();
    }, []);

    const handleSubmit = async (student) => {
        if (isEdit) {
            try {
                await axios({
                    method: "PUT",
                    url: studentsApi + "/" + student.id,
                    data: student
                })
                let newList = [...listStudents];
                let idx = newList.findIndex(std => std.id == student.id);
                newList.splice(idx, 1, student);
                setListStudents(newList);
            } catch (error) {
                setError('Xảy ra lỗi khi sửa!');
            }
        } else {
            try {
                await axios({
                    method: "POST",
                    url: studentsApi,
                    data: student
                })
                let newList = [
                    ...listStudents,
                    student
                ]
                setListStudents(newList);
            } catch (error) {
                setError('Xảy ra lỗi khi thêm!');
            }
        }
    }

    const handleClickEdit = (student) => {
        setFormData(student);
        setIsEdit(true);
    }

    const handleDelete = async (student) => {
        if (window.confirm('Bạn có chắc muốn xóa ?')) {
            try {
                await axios({
                    method: "DELETE",
                    url: studentsApi + '/' + student.id
                })
                let newList = listStudents.filter(std => std.id !== student.id);
                setListStudents(newList);
            } catch (error) {
                setError('Xảy ra lỗi khi xóa!');
            }
        }
    }

    return (
        <>
            <FormInput
                formData={formData}
                isEdit={isEdit}
                onClickSubmit={(student) => handleSubmit(student)}
            />
            <p style={{
                color: 'red',
                fontStyle: 'italic'
            }}>{error}</p>
            <ul>
                {listStudents.map((student, idx) =>
                    <Student
                        key={idx}
                        name={student.name}
                        address={student.address}
                        onClickEdit={() => handleClickEdit(student)}
                        onClickDelete={() => handleDelete(student)}
                    />
                )}
            </ul>
        </>
    )
}

export default App;