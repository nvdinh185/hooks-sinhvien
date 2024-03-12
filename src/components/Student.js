const Student = (props) => {

    const handleClickEdit = () => {
        props.onClickEdit();
    }

    const handleClickDelete = () => {
        props.onClickDelete();
    }

    return (
        <li>
            <h2>Name: {props.name}</h2>
            <p>Address: {props.address}</p>
            <button onClick={() => handleClickEdit()}>Sửa</button>
            <button onClick={() => handleClickDelete()}>Xóa</button>
        </li>
    )
}

export default Student;