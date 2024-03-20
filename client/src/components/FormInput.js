import { useEffect, useState } from 'react';

const FormInput = (props) => {
    const [errorName, setErrorName] = useState('');
    const [errorAddress, setErrorAddress] = useState('');
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [isEdit, setIsEdit] = useState();

    useEffect(() => {
        let student = props.formData;
        setId(student.id);
        setName(student.name);
        setAddress(student.address);
        setIsEdit(props.isEdit);
    }, [props.formData])

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

    const handleSubmit = (e) => {
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
                props.onClickSubmit(inputValue);
                setId('');
                setName('');
                setAddress('');
                setIsEdit(false);
            } else {
                let inputValue = {
                    id: generateUuid(),
                    name,
                    address
                }
                props.onClickSubmit(inputValue);
                setName('');
                setAddress('');
            }
        }
    }

    return (
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
    )
}

export default FormInput;