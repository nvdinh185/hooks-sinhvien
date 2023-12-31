import { useState } from 'react';

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

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    const handleClickEdit = (student) => {

    }

    const handleDelete = (student) => {

    }

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Tên</label>
                    <input type="text" name="name" />
                </div>
                <br />
                <div>
                    <label>Địa chỉ</label>
                    <input type="text" name="address" />
                </div>
                <div>
                    <button>Thêm</button>
                </div>
            </form>
            <ul>
                {listStudents.map((student, idx) =>
                    <li key={idx}>
                        <h2>Name: {student.name}</h2>
                        <p>Address: {student.address}</p>
                        <button onClick={() => handleClickEdit(student)}>Sửa</button>
                        <button onClick={() => handleDelete(student)}>Xóa</button>
                    </li>
                )}
            </ul>
        </>
    )
}

export default App;