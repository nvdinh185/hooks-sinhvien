const Student = (props) => {

    const handleClickEdit = () => {
        props.onClickEdit();
    }

    const handleDelete = () => {
        props.onClickDelete();
    }

    return (
        <li>
            <h2>Name: {props.name}</h2>
            <p>Address: {props.address}</p>
            <button onClick={() => handleClickEdit()}>Sửa</button>
            <button onClick={() => handleDelete()}>Xóa</button>
        </li>
    )
}

export default Student;