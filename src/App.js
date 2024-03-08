const App = () => {

    return (
        <>
            <form>
                <div>
                    <label>Tên</label>
                    <input />
                </div>
                <br />
                <div>
                    <label>Địa chỉ</label>
                    <input />
                </div>
                <div>
                    <button>Thêm</button>
                </div>
            </form>
            <ul>
                <li>
                    <h2>Name: Định</h2>
                    <p>Address: Huế</p>
                    <button>Sửa</button>
                    <button>Xóa</button>
                </li>
                <li>
                    <h2>Name: Nam</h2>
                    <p>Address: Quảng Nam</p>
                    <button>Sửa</button>
                    <button>Xóa</button>
                </li>
                <li>
                    <h2>Name: Tân</h2>
                    <p>Address: Đà Nẵng</p>
                    <button>Sửa</button>
                    <button>Xóa</button>
                </li>
            </ul>
        </>
    )
}

export default App;