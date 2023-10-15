import { useEffect, useState } from 'react';

const FormInput = (props) => {
    const [errorName, setErrorName] = useState('');
    const [errorAddress, setErrorAddress] = useState('');
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        let student = props.formData;
        setId(student.id);
        setName(student.name);
        setAddress(student.address);

    }, [props.formData])

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
                let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

        if (check) {
            if (props.isEdit) {
                let inputValue = {
                    id,
                    name,
                    address
                }
                props.onClickSubmit(inputValue);
                setId('');
                setName('');
                setAddress('');
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
            {props.isEdit && <input type='hidden' name='id' value={id} />}
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
                <button>{props.isEdit ? 'Sửa' : 'Thêm'}</button>
            </div>
        </form>
    )
}

export default FormInput;