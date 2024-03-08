import axios from 'axios';
import { useState, useEffect } from 'react';

const studentsApi = 'http://localhost:3001/student';

const App = () => {
    const [errorName, setErrorName] = useState('');
    const [errorAddress, setErrorAddress] = useState('');
    const [listStudents, setListStudents] = useState([]);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [error, setError] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        let check = true;
        if (!name) {
            setErrorName('Vui lòng nhập tên');
            check = false;
        }
        if (!address) {
            setErrorAddress('Vui lòng nhập địa chỉ');
            check = false;
        }

        function generateUuid() {
            return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, function (c) {
                let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 || 0x8);
                return v.toString(16);
            });
        }

        if (check) {
            if (isEdit) {
                let inputValue = {
                    id,
                    name,
                    address
                }
                try {
                    await axios({
                        method: "PUT",
                        url: studentsApi + "/" + id,
                        data: inputValue
                    })
                    let newList = [...listStudents];
                    let idx = newList.findIndex(student => student.id === id);
                    newList.splice(idx, 1, inputValue);
                    setListStudents(newList);
                    setId('');
                    setName('');
                    setAddress('');
                    setIsEdit(false);
                } catch (error) {
                    setError('Xảy ra lỗi khi sửa!');
                }
            } else {
                let inputValue = {
                    id: generateUuid(),
                    name,
                    address
                }
                try {
                    await axios({
                        method: "POST",
                        url: studentsApi,
                        data: inputValue
                    })
                    let newList = [
                        ...listStudents,
                        inputValue
                    ]
                    setListStudents(newList);
                    setName('');
                    setAddress('');
                } catch (error) {
                    setError('Xảy ra lỗi khi thêm!');
                }
            }
        }
    }

    const handleBlur = (e) => {
        if (e.target.name === 'name') {
            if (!e.target.value) {
                setErrorName('Vui lòng nhập tên');
            }
        } else if (e.target.name === 'address') {
            if (!e.target.value) {
                setErrorAddress('Vui lòng nhập địa chỉ');
            }
        }
    }

    const handleInput = (e) => {
        if (e.target.name === 'name') {
            setErrorName('');
        } else if (e.target.name === 'address') {
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

    const handleDelete = async (student) => {
        if (window.confirm('Bạn có chắc muốn xóa ?')) {
            try {
                await axios({
                    method: "DELETE",
                    url: studentsApi + '/' + student.id
                })
                // let newList = [...listStudents];
                // let idx = newList.findIndex(st => st.id === student.id);
                // newList.splice(idx, 1);
                let newList = listStudents.filter(std => std.id !== student.id);
                setListStudents(newList);
            } catch (error) {
                setError('Xảy ra lỗi khi xóa!');
            }
        }
    }

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                {isEdit && <input type='hidden' name='id' value={id} />}
                <div>
                    <label>Tên</label>
                    <input type="text" name="name" value={name}
                        onBlur={(e) => handleBlur(e)}
                        onInput={(e) => handleInput(e)}
                        className={errorName && 'invalid'}
                        onChange={(e) => { setName(e.target.value) }}
                    />
                    <span style={{
                        color: 'red',
                        fontStyle: 'italic'
                    }}>{errorName}</span>
                </div>
                <br />
                <div>
                    <label>Địa chỉ</label>
                    <input type="text" name="address" value={address}
                        onBlur={(e) => handleBlur(e)}
                        onInput={(e) => handleInput(e)}
                        className={errorAddress && 'invalid'}
                        onChange={(e) => { setAddress(e.target.value) }}
                    />
                    <span style={{
                        color: 'red',
                        fontStyle: 'italic'
                    }}>{errorAddress}</span>
                </div>
                <div>
                    <button>{isEdit ? 'Sửa' : 'Thêm'}</button>
                </div>
            </form>
            <p style={{
                color: 'red',
                fontStyle: 'italic'
            }}>{error}</p>
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