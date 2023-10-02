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
    const [errorName, setErrorName] = useState('');
    const [errorAddress, setErrorAddress] = useState('');
    const [listStudents, setListStudents] = useState(initialStudents);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formValue = {};
        for (const el of e.target) {
            if (el.name) {
                formValue[el.name] = el.value;
            }
        }
        var check = true;
        if (!formValue['name']) {
            setErrorName('Vui lòng nhập tên');
            check = false;
        }
        if (!formValue['address']) {
            setErrorAddress('Vui lòng nhập địa chỉ');
            check = false;
        }

        function generateUuid() {
            return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

        if (check) {
            if (formValue['id']) {
                var edId = formValue['id'];
                var idx = listStudents.findIndex(student => student.id == edId);
                listStudents.splice(idx, 1, formValue);
                setListStudents(listStudents);
                setId('');
                setName('');
                setAddress('');
                setIsEdit(false);
            } else {
                formValue['id'] = generateUuid();
                var newList = [
                    ...listStudents,
                    formValue
                ]
                setListStudents(newList);
                setName('');
                setAddress('');
            }
        }
    }

    const handleBlur = (e) => {
        if (e.target.name == 'name') {
            if (!e.target.value) {
                setErrorName('Vui lòng nhập tên');
            }
        } else if (e.target.name == 'address') {
            if (!e.target.value) {
                setErrorAddress('Vui lòng nhập địa chỉ');
            }
        }
    }

    const handleInput = (e) => {
        if (e.target.name == 'name') {
            setErrorName('');
        } else if (e.target.name == 'address') {
            setErrorAddress('');
        }
    }

    const handleClickEdit = (student) => {
        // console.log(student);
        setId(student.id);
        setName(student.name);
        setAddress(student.address);
        setIsEdit(true);
    }

    const handleDelete = (student) => {
        if (confirm('Bạn có chắc muốn xóa ?')) {
            var idx = listStudents.findIndex(st => st.id == student.id);
            listStudents.splice(idx, 1);
            setListStudents(listStudents);
        }
    }

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type='hidden' name='id' value={id} />
                <div>
                    <label>Tên</label>
                    <input onBlur={(e) => handleBlur(e)} onInput={(e) => handleInput(e)} type="text"
                        name="name" className={errorName && 'invalid'} value={name}
                        onChange={(e) => { setName(e.target.value) }} />
                    <span style={{
                        color: 'red',
                        fontStyle: 'italic'
                    }}>{errorName}</span>
                </div>
                <br />
                <div>
                    <label>Địa chỉ</label>
                    <input onBlur={(e) => handleBlur(e)} onInput={(e) => handleInput(e)} type="text"
                        name="address" className={errorAddress && 'invalid'} value={address}
                        onChange={(e) => { setAddress(e.target.value) }} />
                    <span style={{
                        color: 'red',
                        fontStyle: 'italic'
                    }}>{errorAddress}</span>
                </div>
                <div>
                    <button>{isEdit ? 'Sửa' : 'Thêm'}</button>
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