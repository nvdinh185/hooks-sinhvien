import { useState } from 'react';
import Student from './components/Student';
import FormInput from './components/FormInput';

var initialStudents = [
    {
        id: '1',
        name: "Dinh",
        address: "hue"
    },
    {
        id: '2',
        name: "Nam",
        address: "quang nam"
    },
    {
        id: '3',
        name: "Tan",
        address: "da nang"
    },
    {
        id: '4',
        name: "Hung",
        address: "hue"
    },
    {
        id: '5',
        name: "Tri",
        address: "quang tri"
    },
    {
        id: '6',
        name: "Anh",
        address: "hue"
    },
    {
        id: '7',
        name: "Binh",
        address: "da nang"
    }
]

const App = () => {

    const [listStudents, setListStudents] = useState(initialStudents);
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState(
        {
            id: '',
            name: "",
            address: ""
        });

    const handleSubmit = (student) => {
        if (isEdit) {
            let newList = [...listStudents];
            let idx = newList.findIndex(std => std.id == student.id);
            newList.splice(idx, 1, student);
            setListStudents(newList);
        } else {
            let newList = [
                ...listStudents,
                student
            ]
            setListStudents(newList);
        }
    }

    const handleClickEdit = (student) => {
        setFormData(student);
        setIsEdit(true);
    }

    const handleDelete = (student) => {
        if (confirm('Bạn có chắc muốn xóa ?')) {
            let newList = listStudents.filter(std => std.id !== student.id);
            setListStudents(newList);
        }
    }

    return (
        <>
            <FormInput
                formData={formData}
                isEdit={isEdit}
                onClickSubmit={(student) => handleSubmit(student)}
            />
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